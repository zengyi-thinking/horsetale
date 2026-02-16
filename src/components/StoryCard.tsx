import { StoryStage, StoryChoice } from "@/data/storyData";

interface Props {
  stage: StoryStage;
  onSelect: (choice: StoryChoice) => void;
  isTransitioning: boolean;
  stageIndex: number;
  totalStages: number;
}

const StoryCard = ({ stage, onSelect, isTransitioning, stageIndex, totalStages }: Props) => {
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-6 transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Progress indicator */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {Array.from({ length: totalStages }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i <= stageIndex
                ? "w-8 bg-primary"
                : "w-4 bg-muted"
            }`}
          />
        ))}
      </div>

      <div className="max-w-2xl w-full text-center animate-fade-in-up">
        {/* Stage title */}
        <div className="mb-2">
          <span className="text-primary/60 text-sm font-display">
            第{["一", "二", "三", "四"][stageIndex]}章
          </span>
        </div>
        <h2 className="font-display text-gold-gradient text-3xl md:text-4xl font-bold mb-6">
          {stage.title}
        </h2>
        <p className="text-foreground/70 text-base md:text-lg mb-10 leading-relaxed max-w-lg mx-auto">
          {stage.narrative}
        </p>

        {/* Choice cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {stage.choices.map((choice, index) => (
            <button
              key={choice.id}
              onClick={() => !isTransitioning && onSelect(choice)}
              className={`animate-card-flip stagger-${index + 1} group p-6 rounded-xl border border-border bg-card card-hover-glow text-left transition-all duration-300 hover:border-primary/50`}
              style={{ opacity: 0, animationFillMode: "forwards" }}
            >
              <div className="text-4xl mb-3">{choice.emoji}</div>
              <h3 className="font-display text-primary text-lg font-semibold mb-2">
                {choice.title}
              </h3>
              <p className="text-card-foreground/60 text-sm">
                {choice.description}
              </p>
              <div className="mt-4 text-xs text-primary/40 group-hover:text-primary/80 transition-colors">
                点击选择 →
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
