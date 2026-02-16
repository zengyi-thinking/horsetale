import WelcomeScreen from "@/components/WelcomeScreen";
import RouteSelect from "@/components/RouteSelect";
import StoryCard from "@/components/StoryCard";
import BlessingScreen from "@/components/BlessingScreen";
import { ParticleEffect } from "@/components/ParticleEffect";
import { useStoryState } from "@/hooks/useStoryState";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useBackgroundMusic, MusicTheme } from "@/hooks/useBackgroundMusic";
import { StoryChoice, StoryRoute } from "@/data/storyData";
import { useCallback, useEffect, useMemo } from "react";

const Index = () => {
  const {
    phase, selectedRoute, currentStage, currentStageIndex, totalStages,
    selectedTags, isTransitioning,
    start, selectRoute, selectChoice, restart,
  } = useStoryState();
  const sfx = useSoundEffects();
  const music = useBackgroundMusic();

  // 根据阶段获取粒子效果类型
  const particleType = useMemo(() => {
    switch (phase) {
      case "welcome": return "stars";
      case "route-select": return "fireflies";
      case "story":
        if (selectedRoute?.id === "career") return "confetti";
        if (selectedRoute?.id === "love") return "fireflies";
        return "stars";
      case "blessing": return "confetti";
      default: return "stars";
    }
  }, [phase, selectedRoute]);

  // 粒子强度
  const particleIntensity = phase === "blessing" ? 50 : 30;

  // 根据当前阶段动态切换音乐
  useEffect(() => {
    let theme: MusicTheme = "none";

    switch (phase) {
      case "welcome":
        theme = "welcome";
        break;
      case "route-select":
        theme = "route-select";
        break;
      case "story":
        if (selectedRoute) {
          if (selectedRoute.id === "career") theme = "career";
          else if (selectedRoute.id === "love") theme = "love";
          else if (selectedRoute.id === "self") theme = "self";
        }
        break;
      case "blessing":
        theme = "blessing";
        break;
    }

    music.play(theme);
  }, [phase, selectedRoute, music]);

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

  // 渲染带粒子效果的页面
  const renderWithParticles = (content: React.ReactNode) => (
    <>
      <ParticleEffect type={particleType as any} intensity={particleIntensity} />
      {content}
    </>
  );

  if (phase === "welcome") {
    return renderWithParticles(
      <div className={`transition-opacity duration-500 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        <WelcomeScreen onStart={handleStart} />
      </div>
    );
  }

  if (phase === "route-select") {
    return renderWithParticles(
      <RouteSelect onSelect={handleSelectRoute} isTransitioning={isTransitioning} />
    );
  }

  if (phase === "blessing") {
    return renderWithParticles(
      <BlessingScreen tags={selectedTags} onRestart={handleRestart} onFanfare={sfx.playFanfare} />
    );
  }

  if (currentStage) {
    return renderWithParticles(
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
