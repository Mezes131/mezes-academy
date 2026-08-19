import { Facebook, Instagram, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "https://www.facebook.com/mezes35", label: "Facebook", icon: "facebook" },
  { href: "https://www.instagram.com/mezes131", label: "Instagram", icon: "instagram" },
  { href: "https://www.tiktok.com/@mezes131", label: "TikTok", icon: "tiktok" },
  { href: "https://www.linkedin.com/company/mezes-corporation/", label: "LinkedIn", icon: "linkedin" },
] as const;

/**
 * Brand social row. Same destinations as the landing footer.
 */
export function SocialLinks({
  className,
  iconSize = 16,
}: {
  className?: string;
  iconSize?: number;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {LINKS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
          className="flex size-11 items-center justify-center rounded-lg border-base text-fg-2 transition-[background-color,color,transform] duration-150 ease-out hover:bg-bg-3 hover:text-fg active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          <SocialGlyph name={item.icon} size={iconSize} />
        </a>
      ))}
    </div>
  );
}

function SocialGlyph({
  name,
  size,
}: {
  name: (typeof LINKS)[number]["icon"];
  size: number;
}) {
  if (name === "facebook") return <Facebook size={size} aria-hidden="true" />;
  if (name === "instagram") return <Instagram size={size} aria-hidden="true" />;
  if (name === "linkedin") return <Linkedin size={size} aria-hidden="true" />;
  return <TikTokGlyph size={size} />;
}

/** Lucide has no TikTok in this version; stroke matches the other marks. */
function TikTokGlyph({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}
