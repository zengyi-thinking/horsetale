import { useCallback, useRef, useEffect, useState } from "react";

export type MusicTheme = "welcome" | "route-select" | "career" | "love" | "self" | "blessing" | "none";

interface MusicState {
  isPlaying: boolean;
  volume: number;
  theme: MusicTheme;
}

// 音乐生成器 - 使用 Web Audio API 创建程序化音乐
class MusicGenerator {
  private audioCtx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private intervalId: number | null = null;
  private currentTheme: MusicTheme = "none";
  private volume: number = 0.3;

  // 不同主题的音阶和节奏
  private themes: Record<MusicTheme, { notes: number[]; interval: number; type: OscillatorType }> = {
    welcome: {
      notes: [261.63, 293.66, 329.63, 349.23, 392.00, 329.63, 293.66, 261.63], // C大调琶音，神秘空灵
      interval: 800,
      type: "sine",
    },
    "route-select": {
      notes: [392.00, 440.00, 493.88, 523.25, 587.33, 523.25], // G大调上行，轻柔希望
      interval: 600,
      type: "sine",
    },
    career: {
      notes: [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 523.25], // C大调上行，大气激昂
      interval: 400,
      type: "triangle",
    },
    love: {
      notes: [293.66, 349.23, 392.00, 440.00, 392.00, 349.23, 293.66], // D大调，浪漫抒情
      interval: 700,
      type: "sine",
    },
    self: {
      notes: [261.63, 293.66, 329.63, 293.66, 261.63, 246.94, 293.66], // C小调，宁静治愈
      interval: 900,
      type: "sine",
    },
    blessing: {
      notes: [523.25, 659.25, 783.99, 1046.50, 783.99, 659.25, 523.25], // C大调高音，喜庆热闹
      interval: 250,
      type: "triangle",
    },
    none: {
      notes: [],
      interval: 0,
      type: "sine",
    },
  };

  private init() {
    if (!this.audioCtx) {
      this.audioCtx = new AudioContext();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.connect(this.audioCtx.destination);
      this.masterGain.gain.value = this.volume;
    }
    return this.audioCtx;
  }

  setVolume(value: number) {
    this.volume = Math.max(0, Math.min(1, value));
    if (this.masterGain) {
      this.masterGain.gain.value = this.volume;
    }
  }

  play(theme: MusicTheme) {
    if (theme === "none") {
      this.stop();
      return;
    }

    // 如果是同一主题，不重新播放
    if (this.currentTheme === theme && this.oscillators.length > 0) {
      return;
    }

    this.stop();
    this.currentTheme = theme;

    const ctx = this.init();
    if (!ctx || !this.masterGain) return;

    const themeData = this.themes[theme];
    if (!themeData.notes.length) return;

    let noteIndex = 0;

    // 创建持续的环境音效
    const playNote = () => {
      if (!ctx || !this.masterGain) return;

      const note = themeData.notes[noteIndex % themeData.notes.length];

      // 主音
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // 添加轻微的泛音
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc2.connect(gain2);
      gain2.connect(this.masterGain!);

      osc.type = themeData.type;
      osc2.type = "sine";

      osc.frequency.value = note;
      osc2.frequency.value = note * 2; // 泛音高八度

      // 淡入淡出效果
      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.1);
      gain.gain.linearRampToValueAtTime(0.1, now + themeData.interval / 1000 * 0.8);
      gain.gain.linearRampToValueAtTime(0, now + themeData.interval / 1000);

      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.05, now + 0.1);
      gain2.gain.linearRampToValueAtTime(0.02, now + themeData.interval / 1000 * 0.8);
      gain2.gain.linearRampToValueAtTime(0, now + themeData.interval / 1000);

      osc.start(now);
      osc.stop(now + themeData.interval / 1000);
      osc2.start(now);
      osc2.stop(now + themeData.interval / 1000);

      this.oscillators.push(osc, osc2);

      noteIndex++;
    };

    // 立即播放第一个音符，然后设置间隔
    playNote();
    this.intervalId = window.setInterval(playNote, themeData.interval);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    // 渐出现有音符
    this.oscillators.forEach((osc) => {
      try {
        osc.stop();
      } catch {
        // 忽略已停止的振荡器
      }
    });

    this.oscillators = [];
    this.currentTheme = "none";
  }

  resume() {
    if (this.audioCtx?.state === "suspended") {
      this.audioCtx.resume();
    }
  }
}

// 创建单例
const musicGenerator = new MusicGenerator();

export function useBackgroundMusic() {
  const [state, setState] = useState<MusicState>({
    isPlaying: false,
    volume: 0.3,
    theme: "none",
  });

  // 初始化音频上下文（需要用户交互）
  useEffect(() => {
    const initAudio = () => {
      musicGenerator.resume();
      document.removeEventListener("click", initAudio);
      document.removeEventListener("keydown", initAudio);
    };

    document.addEventListener("click", initAudio);
    document.addEventListener("keydown", initAudio);

    return () => {
      document.removeEventListener("click", initAudio);
      document.removeEventListener("keydown", initAudio);
    };
  }, []);

  const play = useCallback((theme: MusicTheme) => {
    musicGenerator.play(theme);
    setState((prev) => ({ ...prev, isPlaying: true, theme }));
  }, []);

  const stop = useCallback(() => {
    musicGenerator.stop();
    setState((prev) => ({ ...prev, isPlaying: false, theme: "none" }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    musicGenerator.setVolume(volume);
    setState((prev) => ({ ...prev, volume }));
  }, []);

  const toggle = useCallback(() => {
    if (state.isPlaying) {
      stop();
    } else {
      play(state.theme || "welcome");
    }
  }, [state.isPlaying, state.theme, play, stop]);

  return { ...state, play, stop, setVolume, toggle };
}
