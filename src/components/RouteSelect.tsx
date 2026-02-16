import { StoryRoute } from "@/data/storyData";
import { storyRoutes } from "@/data/storyData";

interface Props {
  onSelect: (route: StoryRoute) => void;
  isTransitioning: boolean;
}

const RouteSelect = ({ onSelect, isTransitioning }: Props) => {
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-6 transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="max-w-3xl w-full text-center animate-fade-in-up">
        <div className="text-5xl mb-4">🐴</div>
        <h2 className="font-display text-gold-gradient text-3xl md:text-4xl font-bold mb-3">
          选择你的旅途
        </h2>
        <p className="text-foreground/60 text-base mb-10 max-w-md mx-auto">
          三条不同的道路，三种不同的人生体验。选择一条最吸引你的路线，开始你的马年冒险。
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {storyRoutes.map((route, index) => (
            <button
              key={route.id}
              onClick={() => !isTransitioning && onSelect(route)}
              className={`animate-card-flip stagger-${index + 1} group p-8 rounded-2xl border border-border bg-card card-hover-glow text-left transition-all duration-300 hover:border-primary/50`}
              style={{ opacity: 0, animationFillMode: "forwards" }}
            >
              <div className="text-5xl mb-4">{route.emoji}</div>
              <h3 className="font-display text-primary text-xl font-semibold mb-2">
                {route.title}
              </h3>
              <p className="text-card-foreground/60 text-sm leading-relaxed">
                {route.description}
              </p>
              <div className="mt-4 text-sm text-primary/40 group-hover:text-primary/80 transition-colors font-display">
                踏上旅程 →
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RouteSelect;
