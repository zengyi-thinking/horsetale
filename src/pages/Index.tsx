import WelcomeScreen from "@/components/WelcomeScreen";
import RouteSelect from "@/components/RouteSelect";
import StoryCard from "@/components/StoryCard";
import BlessingScreen from "@/components/BlessingScreen";
import { useStoryState } from "@/hooks/useStoryState";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { StoryChoice, StoryRoute } from "@/data/storyData";
import { useCallback } from "react";

const Index = () => {
  const {
    phase, currentStage, currentStageIndex, totalStages,
    selectedTags, isTransitioning,
    start, selectRoute, selectChoice, restart,
  } = useStoryState();
  const sfx = useSoundEffects();

  const handleStart = useCallback(() => {
    sfx.playStart();
    start();
  }, [sfx, start]);

  const handleSelectRoute = useCallback((route: StoryRoute) => {
    sfx.playTransition();
    selectRoute(route);
  }, [sfx, selectRoute]);

  const handleSelectChoice = useCallback((choice: StoryChoice) => {
    sfx.playSelect();
    selectChoice(choice);
  }, [sfx, selectChoice]);

  const handleRestart = useCallback(() => {
    sfx.playTransition();
    restart();
  }, [sfx, restart]);

  if (phase === "welcome") {
    return (
      <div className={`transition-opacity duration-500 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        <WelcomeScreen onStart={handleStart} />
      </div>
    );
  }

  if (phase === "route-select") {
    return <RouteSelect onSelect={handleSelectRoute} isTransitioning={isTransitioning} />;
  }

  if (phase === "blessing") {
    return <BlessingScreen tags={selectedTags} onRestart={handleRestart} onFanfare={sfx.playFanfare} />;
  }

  if (currentStage) {
    return (
      <StoryCard
        stage={currentStage}
        onSelect={handleSelectChoice}
        isTransitioning={isTransitioning}
        stageIndex={currentStageIndex}
        totalStages={totalStages}
        collectedTags={selectedTags}
      />
    );
  }

  return null;
};

export default Index;
