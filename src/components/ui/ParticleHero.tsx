import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  accent: boolean;
  phase: number;
  depth: number;
}

interface Streak {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
}

const DENSITY = 0.00011;
const BG_DENSITY = 0.00007;
const MOUSE_RADIUS = 190;
const DAMPING = 0.986;
const REPULSION = 0.72;
const MOUSE_LERP = 0.14;
const DRIFT = 0.62;

const COLOR_ACCENT = "rgba(124,112,245,";
const COLOR_FG = "rgba(220,220,240,";

const rng = (min: number, max: number) => Math.random() * (max - min) + min;

function wrap(v: number, max: number) {
  if (v < 0) return v + max;
  if (v > max) return v - max;
  return v;
}

function spawnStreak(w: number, h: number, angle: number): Streak {
  const speed = rng(4.2, 7.4);
  return {
    x: rng(-w * 0.1, w * 0.9),
    y: rng(0, h),
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed * 0.45,
    len: rng(28, 64),
    life: rng(28, 56),
  };
}

/**
 * Particle field for the About hero: drifting starfield plus mouse repulsion.
 */
export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const streaksRef = useRef<Streak[]>([]);
  const mouseRef = useRef({ x: -2000, y: -2000, tx: -2000, ty: -2000, active: false });
  const frameRef = useRef(0);
  const reduceRef = useRef(false);

  const init = useCallback((w: number, h: number) => {
    const count = Math.floor(w * h * DENSITY);
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const depth = rng(0.28, 1.35);
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        size: rng(0.45, 2.1) * (0.55 + depth * 0.45),
        accent: Math.random() > 0.9,
        phase: Math.random() * Math.PI * 2,
        depth,
      });
    }
    const bgCount = Math.floor(w * h * BG_DENSITY);
    for (let i = 0; i < bgCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0,
        vy: 0,
        size: rng(0.35, 0.9),
        accent: false,
        phase: Math.random() * Math.PI * 2,
        depth: rng(0.18, 0.4),
      });
    }
    particlesRef.current = particles;

    const heading = -0.38;
    streaksRef.current = [
      spawnStreak(w, h, heading),
      spawnStreak(w, h, heading),
    ];
  }, []);

  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      frameRef.current = requestAnimationFrame(animate);
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      frameRef.current = requestAnimationFrame(animate);
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    const mouse = mouseRef.current;

    mouse.x += (mouse.tx - mouse.x) * MOUSE_LERP;
    mouse.y += (mouse.ty - mouse.y) * MOUSE_LERP;

    const t = time * 0.001;
    const heading = -0.32 + Math.sin(t * 0.045) * 0.18;
    const flow = DRIFT * (1 + Math.sin(t * 0.07) * 0.12);
    const cosmosX = Math.cos(heading) * flow;
    const cosmosY = Math.sin(heading) * flow * 0.55;

    ctx.clearRect(0, 0, W, H);

    const pulse = Math.sin(time * 0.0004) * 0.028 + 0.07;
    const gx = W * (0.42 + Math.sin(t * 0.06) * 0.08);
    const gy = H * (0.38 + Math.cos(t * 0.05) * 0.07);
    const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(W, H) * 0.7);
    grad.addColorStop(0, `rgba(124,112,245,${pulse})`);
    grad.addColorStop(1, "rgba(14,15,22,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    const ps = particlesRef.current;
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (mouse.active && dist < MOUSE_RADIUS && dist > 0.01) {
        const f = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * REPULSION * p.depth;
        p.vx -= (dx / dist) * f * 3.2;
        p.vy -= (dy / dist) * f * 3.2;
      }

      p.vx += cosmosX * p.depth * 0.08;
      p.vy += cosmosY * p.depth * 0.08;
      p.vx += Math.sin(t * 0.35 + p.phase) * 0.004 * p.depth;
      p.vy += Math.cos(t * 0.28 + p.phase) * 0.003 * p.depth;
      p.vx *= DAMPING;
      p.vy *= DAMPING;
      p.x += p.vx + cosmosX * p.depth;
      p.y += p.vy + cosmosY * p.depth;
      p.x = wrap(p.x, W);
      p.y = wrap(p.y, H);

      const twinkle = Math.sin(t * (0.9 + p.depth) + p.phase) * 0.5 + 0.5;
      const opacity = Math.min(0.12 + p.depth * 0.42 + twinkle * 0.18, 0.95);
      const radius = p.size * (0.86 + twinkle * 0.22);

      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = p.accent
        ? COLOR_ACCENT + `${Math.min(opacity + 0.18, 1)})`
        : COLOR_FG + `${opacity})`;
      ctx.fill();
    }

    const streaks = streaksRef.current;
    ctx.lineCap = "round";
    for (let i = 0; i < streaks.length; i++) {
      const s = streaks[i];
      s.x += s.vx + cosmosX * 1.8;
      s.y += s.vy + cosmosY * 1.8;
      s.life -= 1;
      const fade = Math.max(s.life / 48, 0);
      ctx.strokeStyle = COLOR_FG + `${0.18 * fade})`;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.vx * (s.len / 6), s.y - s.vy * (s.len / 6));
      ctx.stroke();
      if (s.life <= 0 || s.x > W + 80 || s.y < -80 || s.y > H + 80) {
        streaks[i] = spawnStreak(W, H, heading);
      }
    }

    frameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    reduceRef.current = reduce && !desktop;
    const onChange = () => {
      const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const d = window.matchMedia("(min-width: 768px)").matches;
      reduceRef.current = r && !d;
    };
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqDesk = window.matchMedia("(min-width: 768px)");
    mqReduce.addEventListener("change", onChange);
    mqDesk.addEventListener("change", onChange);

    const resize = () => {
      const el = containerRef.current;
      const cv = canvasRef.current;
      if (!el || !cv) return;
      const { width, height } = el.getBoundingClientRect();
      if (width < 2 || height < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = width * dpr;
      cv.height = height * dpr;
      cv.style.width = `${width}px`;
      cv.style.height = `${height}px`;
      const ctx = cv.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init(width, height);
    };

    window.addEventListener("resize", resize);
    resize();

    if (!reduceRef.current) {
      frameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      mqReduce.removeEventListener("change", onChange);
      mqDesk.removeEventListener("change", onChange);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [animate, init]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    mouseRef.current.tx = e.clientX - r.left;
    mouseRef.current.ty = e.clientY - r.top;
    mouseRef.current.active = true;
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden"
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        mouseRef.current.active = false;
      }}
      aria-hidden
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
