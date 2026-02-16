interface Props {
  onStart: () => void;
}

const Lantern = ({ className }: { className?: string }) => (
  <div className={`text-4xl md:text-6xl lantern-float ${className || ""}`}>🏮</div>
);

const WelcomeScreen = ({ onStart }: Props) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative lanterns */}
      <div className="absolute top-8 left-8 opacity-60"><Lantern /></div>
      <div className="absolute top-12 right-12 opacity-40"><Lantern className="stagger-2" /></div>
      <div className="absolute bottom-20 left-16 opacity-30"><Lantern className="stagger-3" /></div>

      {/* Sparkles */}
      <div className="absolute top-1/4 left-1/3 text-2xl sparkle">✨</div>
      <div className="absolute top-1/3 right-1/4 text-xl sparkle stagger-2">✨</div>
      <div className="absolute bottom-1/3 left-1/4 text-lg sparkle stagger-3">✨</div>

      <div className="text-center animate-fade-in-up">
        <div className="text-7xl md:text-9xl mb-6">🐴</div>
        <h1 className="font-display text-gold-gradient text-4xl md:text-6xl font-bold mb-4">
          马年奇妙冒险
        </h1>
        <p className="text-foreground/70 text-lg md:text-xl mb-2 max-w-md mx-auto">
          踏上一段神奇旅程
        </p>
        <p className="text-foreground/50 text-base mb-10 max-w-sm mx-auto">
          点击卡片，收集你的专属新年祝福
        </p>

        <button
          onClick={onStart}
          className="group relative px-10 py-4 bg-primary text-primary-foreground font-display text-xl rounded-xl card-hover-glow card-glow overflow-hidden"
        >
          <span className="relative z-10">开启旅程 →</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-gold to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" />
    </div>
  );
};

export default WelcomeScreen;
