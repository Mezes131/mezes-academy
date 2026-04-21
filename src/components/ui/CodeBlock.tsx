interface CodeBlockProps {
  label: string;
  html: string;
}

/**
 * Renders a styled code block with syntax highlighting via CSS classes.
 * HTML is preformatted in content files (kw/fn/str/... classes)
 * and rendered directly via dangerouslySetInnerHTML.
 */
export function CodeBlock({ label, html }: CodeBlockProps) {
  return (
    <div className="relative my-4 rounded-lg border-base bg-[#0d0d14] dark:bg-[#0d0d14] p-5 overflow-x-auto">
      <span className="absolute top-2.5 right-3 font-mono text-[10px] tracking-[0.08em] text-fg-3">
        {label}
      </span>
      <pre
        className="font-mono text-[12.5px] leading-[1.75] text-[#cdd6f4] whitespace-pre"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
