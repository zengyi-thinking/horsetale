import WelcomeScreen from "@/components/WelcomeScreen";
import StoryCard from "@/components/StoryCard";
import BlessingScreen from "@/components/BlessingScreen";
import { useStoryState } from "@/hooks/useStoryState";
import { storyStages } from "@/data/storyData";

const Index = () => {
  const { currentStage, selectedTags, isTransitioning, selectChoice, start, restart } = useStoryState();

  // Welcome screen
  if (currentStage === -1) {
    return (
      <div className={`transition-opacity duration-500 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        <WelcomeScreen onStart={start} />
      </div>
    );
  }

  // Blessing screen (after all stages)
  if (currentStage >= storyStages.length) {
    return <BlessingScreen tags={selectedTags} onRestart={restart} />;
  }

  // Story stage
  return (
    <StoryCard
      stage={storyStages[currentStage]}
      onSelect={selectChoice}
      isTransitioning={isTransitioning}
      stageIndex={currentStage}
      totalStages={storyStages.length}
    />
  );
};

export default Index;
