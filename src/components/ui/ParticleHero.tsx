import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  accent: boolean;
  phase: number;
}

interface BackgroundParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
}

const DENSITY = 0.00012;
const BG_DENSITY = 0.00004;
const MOUSE_RADIUS = 190;
const RETURN_SPEED = 0.045;
const DAMPING = 0.93;
const REPULSION = 0.85;
const MOUSE_LERP = 0.14;

const COLOR_ACCENT = "rgba(124,112,245,";
const COLOR_FG = "rgba(220,220,240,";

const rng = (min: number, max: number) => Math.random() * (max - min) + min;

/**
 * Interactive particle field for the About hero.
 * Runs unless the user prefers reduced motion.
 */
export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const bgRef = useRef<BackgroundParticle[]>([]);
  const mouseRef = useRef({ x: -2000, y: -2000, tx: -2000, ty: -2000, active: false });
  const frameRef = useRef(0);
  const reduceRef = useRef(false);

  const init = useCallback((w: number, h: number) => {
    const count = Math.floor(w * h * DENSITY);
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        size: rng(0.9, 2.2),
        accent: Math.random() > 0.88,
        phase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;

    const bgCount = Math.floor(w * h * BG_DENSITY);
    const bg: BackgroundParticle[] = [];
    for (let i = 0; i < bgCount; i++) {
      bg.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        size: rng(0.4, 1.3),
        alpha: rng(0.08, 0.32),
        phase: Math.random() * Math.PI * 2,
      });
    }
    bgRef.current = bg;
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

    ctx.clearRect(0, 0, W, H);

    const pulse = Math.sin(time * 0.00055) * 0.028 + 0.07;
    const grad = ctx.createRadialGradient(
      W / 2,
      H / 2,
      0,
      W / 2,
      H / 2,
      Math.max(W, H) * 0.65,
    );
    grad.addColorStop(0, `rgba(124,112,245,${pulse})`);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    const bgP = bgRef.current;
    for (let i = 0; i < bgP.length; i++) {
      const p = bgP[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      const twinkle = Math.sin(time * 0.0014 + p.phase) * 0.5 + 0.5;
      ctx.globalAlpha = p.alpha * (0.25 + 0.75 * twinkle);
      ctx.fillStyle = COLOR_FG + "1)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    const ps = particlesRef.current;
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (mouse.active && dist < MOUSE_RADIUS && dist > 0.01) {
        const f = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * REPULSION;
        p.vx -= (dx / dist) * f * 4;
        p.vy -= (dy / dist) * f * 4;
      }

      p.vx += (p.originX - p.x) * RETURN_SPEED;
      p.vy += (p.originY - p.y) * RETURN_SPEED;
      p.vx *= DAMPING;
      p.vy *= DAMPING;
      p.x += p.vx;
      p.y += p.vy;

      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const opacity = Math.min(0.28 + speed * 0.12, 1);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.accent
        ? COLOR_ACCENT + `${Math.min(opacity + 0.2, 1)})`
        : COLOR_FG + `${opacity})`;
      ctx.fill();
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
