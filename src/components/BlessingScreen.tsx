import { generateBlessing } from "@/data/storyData";

interface Props {
  tags: string[];
  onRestart: () => void;
}

const BlessingScreen = ({ tags, onRestart }: Props) => {
  const blessing = generateBlessing(tags);
  const lines = blessing.split("\n");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background sparkles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-xl sparkle"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          ✨
        </div>
      ))}

      <div className="max-w-lg w-full animate-blessing-reveal" style={{ opacity: 0, animationFillMode: "forwards" }}>
        {/* Blessing card */}
        <div className="relative rounded-2xl border-2 border-primary/30 bg-card p-8 md:p-10 card-glow text-center">
          {/* Corner decorations */}
          <div className="absolute top-3 left-3 text-lg opacity-60">🏮</div>
          <div className="absolute top-3 right-3 text-lg opacity-60">🏮</div>
          <div className="absolute bottom-3 left-3 text-lg opacity-60">🧧</div>
          <div className="absolute bottom-3 right-3 text-lg opacity-60">🧧</div>

          {/* Tags collected */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs bg-secondary text-secondary-foreground border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Blessing text */}
          <div className="space-y-1">
            {lines.map((line, i) => (
              <p
                key={i}
                className={`${
                  line.startsWith("🐴")
                    ? "font-display text-gold-gradient text-2xl md:text-3xl font-bold"
                    : line.startsWith("✨")
                    ? "text-primary text-lg font-semibold py-1"
                    : line.startsWith("🧧")
                    ? "text-accent font-display text-lg mt-4 pt-2"
                    : "text-foreground/70 text-sm"
                }`}
              >
                {line || <br />}
              </p>
            ))}
          </div>
        </div>

        {/* Restart button */}
        <div className="text-center mt-8">
          <button
            onClick={onRestart}
            className="px-8 py-3 border border-primary/30 text-primary rounded-xl card-hover-glow text-sm hover:bg-primary/10 transition-colors"
          >
            再来一次 ✨
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlessingScreen;
