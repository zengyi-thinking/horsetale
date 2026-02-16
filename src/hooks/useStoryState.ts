import { useState, useCallback } from "react";
import { StoryChoice } from "@/data/storyData";

export function useStoryState() {
  const [currentStage, setCurrentStage] = useState(-1); // -1 = welcome
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const selectChoice = useCallback((choice: StoryChoice) => {
    setIsTransitioning(true);
    setSelectedTags((prev) => [...prev, choice.tag]);
    
    setTimeout(() => {
      setCurrentStage((prev) => prev + 1);
      setIsTransitioning(false);
    }, 500);
  }, []);

  const start = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStage(0);
      setIsTransitioning(false);
    }, 500);
  }, []);

  const restart = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStage(-1);
      setSelectedTags([]);
      setIsTransitioning(false);
    }, 500);
  }, []);

  return { currentStage, selectedTags, isTransitioning, selectChoice, start, restart };
}
