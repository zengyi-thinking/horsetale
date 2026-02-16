import { useRef, useState, useEffect } from "react";
import { StoryStage, StoryChoice } from "@/data/storyData";

interface Props {
  stage: StoryStage;
  onSelect: (choice: StoryChoice) => void;
  isTransitioning: boolean;
  stageIndex: number;
  totalStages: number;
  collectedTags: string[];
}

const StoryCard = ({ stage, onSelect, isTransitioning, stageIndex, totalStages, collectedTags }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showChoices, setShowChoices] = useState(false);

  // Reset showChoices when stage changes
  useEffect(() => {
    setShowChoices(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stage.id]);

  // Observe when user scrolls to bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowChoices(true);
        }
      },
      { threshold: 0.5 }
    );
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [stage.id]);

  return (
    <div
      className={`min-h-screen transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Progress indicator */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {Array.from({ length: totalStages }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i <= stageIndex ? "w-8 bg-primary" : "w-4 bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Collected tags */}
      {collectedTags.length > 0 && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 flex-wrap justify-center max-w-xs">
          {collectedTags.map((tag, i) => (
            <span key={i} className="px-2 py-0.5 rounded-full text-[10px] bg-secondary/80 text-secondary-foreground border border-primary/20">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Scrollable narrative */}
      <div className="flex flex-col items-center px-6 pt-24 pb-16">
        <div className="max-w-2xl w-full">
          {/* Chapter header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="text-primary/60 text-sm font-display">
              第{["一", "二", "三", "四", "五", "六", "七", "八"][stageIndex]}章
            </span>
            <h2 className="font-display text-gold-gradient text-3xl md:text-4xl font-bold mt-2">
              {stage.title}
            </h2>
          </div>

          {/* Story paragraphs */}
          <div className="space-y-8 mb-16">
            {stage.narrative.map((para, i) => (
              <p
                key={i}
                className="text-foreground/80 text-base md:text-lg leading-loose animate-fade-in-up"
                style={{ animationDelay: `${0.2 + i * 0.15}s`, opacity: 0, animationFillMode: "forwards" }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Scroll sentinel */}
          <div ref={bottomRef} className="h-4" />

          {/* Choice cards - appear after scroll */}
          <div
            className={`transition-all duration-700 ${
              showChoices ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
            }`}
          >
            <p className="text-center text-primary/60 text-sm font-display mb-6">
              ✨ 做出你的选择 ✨
            </p>
            <div className="grid gap-4 md:grid-cols-3 pb-12">
              {stage.choices.map((choice, index) => (
                <button
                  key={choice.id}
                  onClick={() => !isTransitioning && showChoices && onSelect(choice)}
                  className={`group p-6 rounded-xl border border-border bg-card card-hover-glow text-left transition-all duration-300 hover:border-primary/50 ${
                    showChoices ? `animate-card-flip stagger-${index + 1}` : ""
                  }`}
                  style={{ opacity: showChoices ? undefined : 0, animationFillMode: "forwards" }}
                >
                  <div className="text-4xl mb-3">{choice.emoji}</div>
                  <h3 className="font-display text-primary text-lg font-semibold mb-2">
                    {choice.title}
                  </h3>
                  <p className="text-card-foreground/60 text-sm">
                    {choice.description}
                  </p>
                  <div className="mt-4 text-xs text-primary/40 group-hover:text-primary/80 transition-colors">
                    收集卡片 →
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
