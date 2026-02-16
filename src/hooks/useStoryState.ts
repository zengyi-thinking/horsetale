import { useState, useCallback } from "react";
import { StoryChoice, StoryRoute } from "@/data/storyData";

export type GamePhase = "welcome" | "route-select" | "story" | "blessing";

export function useStoryState() {
  const [phase, setPhase] = useState<GamePhase>("welcome");
  const [selectedRoute, setSelectedRoute] = useState<StoryRoute | null>(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transition = useCallback((fn: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      fn();
      setIsTransitioning(false);
    }, 500);
  }, []);

  const start = useCallback(() => {
    transition(() => setPhase("route-select"));
  }, [transition]);

  const selectRoute = useCallback((route: StoryRoute) => {
    transition(() => {
      setSelectedRoute(route);
      setCurrentStageIndex(0);
      setPhase("story");
    });
  }, [transition]);

  const selectChoice = useCallback((choice: StoryChoice) => {
    setIsTransitioning(true);
    setSelectedTags((prev) => [...prev, choice.tag]);

    setTimeout(() => {
      if (selectedRoute && currentStageIndex >= selectedRoute.stages.length - 1) {
        setPhase("blessing");
      } else {
        setCurrentStageIndex((prev) => prev + 1);
      }
      setIsTransitioning(false);
    }, 500);
  }, [selectedRoute, currentStageIndex]);

  const restart = useCallback(() => {
    transition(() => {
      setPhase("welcome");
      setSelectedRoute(null);
      setCurrentStageIndex(0);
      setSelectedTags([]);
    });
  }, [transition]);

  const currentStage = selectedRoute?.stages[currentStageIndex] ?? null;
  const totalStages = selectedRoute?.stages.length ?? 0;

  return {
    phase,
    selectedRoute,
    currentStage,
    currentStageIndex,
    totalStages,
    selectedTags,
    isTransitioning,
    start,
    selectRoute,
    selectChoice,
    restart,
  };
}
