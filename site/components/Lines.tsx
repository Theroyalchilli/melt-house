/** Heading lines where *word* becomes the italic serif accent. */
export default function Lines({ lines, className = "", as: Tag = "h2" }: { lines: string[]; className?: string; as?: "h1" | "h2" | "h3" }) {
  return (
    <Tag className={`font-display ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line.split(/(\*[^*]+\*)/).map((part, k) =>
            part.startsWith("*") ? (
              <span key={k} className="it">
                {part.slice(1, -1)}
              </span>
            ) : (
              part
            ),
          )}
        </span>
      ))}
    </Tag>
  );
}
