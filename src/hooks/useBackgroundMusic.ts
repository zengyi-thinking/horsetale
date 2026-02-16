import { useCallback, useRef, useEffect, useState } from "react";

export type MusicTheme = "welcome" | "route-select" | "career" | "love" | "self" | "blessing" | "none";

interface MusicState {
  isPlaying: boolean;
  volume: number;
  theme: MusicTheme;
}

// 增强版音乐生成器 - 包含和弦、旋律、贝斯
class EnhancedMusicGenerator {
  private audioCtx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private currentTheme: MusicTheme = "none";
  private volume: number = 0.25;
  private intervals: number[] = [];

  // 各主题的音乐配置
  private themes: Record<MusicTheme, {
    tempo: number; // BPM
    rootNote: number; // 根音频率
    scale: number[]; // 音阶
    melody: number[]; // 主旋律
    chordProgression: number[][]; // 和弦进行
    bassLine: number[]; // 贝斯线
    instrument: OscillatorType;
    description: string;
  }> = {
    welcome: {
      tempo: 60,
      rootNote: 261.63, // C4
      scale: [0, 2, 4, 7, 9], // 大调五声音阶
      melody: [0, 4, 7, 9, 11, 9, 7, 4],
      chordProgression: [
        [0, 4, 7], // C
        [0, 4, 7], // C
        [5, 9, 12], // F
        [7, 11, 14], // G
      ],
      bassLine: [0, 0, 5, 5, 7, 7, 4, 4],
      instrument: "sine",
      description: "神秘空灵",
    },
    "route-select": {
      tempo: 72,
      rootNote: 293.66, // D4
      scale: [0, 2, 4, 7, 9], // 大调五声音阶
      melody: [0, 2, 4, 5, 7, 9, 7, 5, 4, 2, 0],
      chordProgression: [
        [0, 4, 7], // D
        [5, 9, 12], // G
        [0, 4, 7], // D
        [7, 11, 14], // A
      ],
      bassLine: [0, 2, 5, 7, 9, 7, 5, 2],
      instrument: "sine",
      description: "轻柔希望",
    },
    career: {
      tempo: 90,
      rootNote: 261.63, // C4
      scale: [0, 2, 4, 5, 7, 9, 11], // 大调音阶
      melody: [0, 4, 7, 12, 14, 12, 11, 9, 7, 5, 4, 2, 0],
      chordProgression: [
        [0, 4, 7], // C
        [5, 9, 12], // F
        [7, 11, 14], // G
        [0, 4, 7], // C
      ],
      bassLine: [0, 0, 5, 5, 7, 7, 4, 4, 0, 0, 5, 5, 7, 7, 4, 4],
      instrument: "triangle",
      description: "大气激昂",
    },
    love: {
      tempo: 66,
      rootNote: 293.66, // D4
      scale: [0, 2, 4, 7, 9], // 大调五声音阶，浪漫
      melody: [0, 2, 4, 7, 9, 11, 9, 7, 4, 2, 0, 2, 4, 2, 0],
      chordProgression: [
        [0, 4, 7], // D
        [3, 7, 10], // Em
        [5, 9, 12], // G
        [7, 11, 14], // A
      ],
      bassLine: [0, 0, 2, 2, 5, 5, 7, 7, 9, 9, 7, 7, 5, 5, 2, 2],
      instrument: "sine",
      description: "浪漫抒情",
    },
    self: {
      tempo: 54,
      rootNote: 246.94, // B3
      scale: [0, 2, 3, 5, 7, 10], // 小调六声音阶，宁静
      melody: [0, 3, 5, 7, 5, 3, 0, -2, 0, 3, 5, 7, 5, 3, 0],
      chordProgression: [
        [0, 3, 7], // Bm
        [5, 9, 12], // G
        [0, 3, 7], // Bm
        [2, 5, 9], // D
      ],
      bassLine: [-1, -1, 5, 5, 7, 7, 2, 2, -1, -1, 5, 5, 7, 7, 2, 2],
      instrument: "sine",
      description: "宁静治愈",
    },
    blessing: {
      tempo: 120,
      rootNote: 329.63, // E4
      scale: [0, 2, 4, 5, 7, 9, 11], // 大调音阶，喜庆
      melody: [0, 4, 7, 12, 14, 16, 19, 16, 14, 12, 11, 9, 7, 5, 4, 2, 0],
      chordProgression: [
        [0, 4, 7], // E
        [0, 4, 7], // E
        [5, 9, 12], // A
        [7, 11, 14], // B
      ],
      bassLine: [0, 2, 4, 5, 7, 9, 11, 12, 11, 9, 7, 5, 4, 2, 0, -1],
      instrument: "triangle",
      description: "喜庆热闹",
    },
    none: {
      tempo: 60,
      rootNote: 261.63,
      scale: [],
      melody: [],
      chordProgression: [],
      bassLine: [],
      instrument: "sine",
      description: "",
    },
  };

  private init() {
    if (!this.audioCtx) {
      this.audioCtx = new AudioContext();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.value = this.volume;
      this.masterGain.connect(this.audioCtx.destination);
    }
    return this.audioCtx;
  }

  setVolume(value: number) {
    this.volume = Math.max(0, Math.min(1, value));
    if (this.masterGain) {
      this.masterGain.gain.value = this.volume;
    }
  }

  // 播放一个音符
  private playNote(frequency: number, duration: number, type: OscillatorType, gainValue: number, detune = 0) {
    const ctx = this.audioCtx;
    if (!ctx || !this.masterGain) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.value = frequency;
    osc.detune.value = detune;

    osc.connect(gain);
    gain.connect(this.masterGain);

    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(gainValue, now + 0.05);
    gain.gain.setValueAtTime(gainValue, now + duration - 0.1);
    gain.gain.linearRampToValueAtTime(0, now + duration);

    osc.start(now);
    osc.stop(now + duration);
  }

  // 播放和弦
  private playChord(notes: number[], duration: number, type: OscillatorType) {
    notes.forEach((note, i) => {
      this.playNote(note, duration, type, 0.08, i * 3); // 轻微 detune 制造合唱效果
    });
  }

  // 播放旋律
  private playMelodyLine(theme: typeof this.themes["welcome"], beatDuration: number) {
    theme.melody.forEach((noteIndex, i) => {
      if (noteIndex < 0) return;
      const freq = theme.rootNote * Math.pow(2, noteIndex / 12);
      this.playNote(freq, beatDuration * 0.8, theme.instrument, 0.15);
    });
  }

  // 播放贝斯线
  private playBassLine(theme: typeof this.themes["welcome"], beatDuration: number) {
    theme.bassLine.forEach((noteIndex, i) => {
      const freq = (theme.rootNote / 4) * Math.pow(2, noteIndex / 12);
      this.playNote(freq, beatDuration * 1.5, "sine", 0.2);
    });
  }

  // 播放环境音（持续的 pads）
  private playPad(theme: typeof this.themes["welcome"], duration: number) {
    const ctx = this.audioCtx;
    if (!ctx || !this.masterGain) return;

    // 创建两个错开的 pad 音符制造环绕感
    [0, 7].forEach((offset, i) => {
      const freq = theme.rootNote * Math.pow(2, offset / 12);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;

      osc.connect(gain);
      gain.connect(this.masterGain);

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 2);
      gain.gain.setValueAtTime(0.06, now + duration - 2);
      gain.gain.linearRampToValueAtTime(0, now + duration);

      osc.start(now);
      osc.stop(now + duration);
    });
  }

  play(theme: MusicTheme) {
    if (theme === "none") {
      this.stop();
      return;
    }

    if (this.currentTheme === theme && this.isPlaying) {
      return;
    }

    this.stop();
    this.currentTheme = theme;
    this.isPlaying = true;

    const ctx = this.init();
    if (!ctx) return;

    const config = this.themes[theme];
    const beatDuration = 60 / config.tempo; // 每拍的时长（秒）
    const barDuration = beatDuration * 4; // 一小节的时长

    // 立即开始播放
    this.playPad(config, barDuration * 4);
    this.playBassLine(config, beatDuration);
    this.playMelodyLine(config, beatDuration);

    // 设置循环
    const melodyInterval = window.setInterval(() => {
      if (!this.isPlaying) return;
      this.playMelodyLine(config, beatDuration);
    }, barDuration * 1000);

    const bassInterval = window.setInterval(() => {
      if (!this.isPlaying) return;
      this.playBassLine(config, beatDuration);
    }, barDuration * 1000);

    const padInterval = window.setInterval(() => {
      if (!this.isPlaying) return;
      this.playPad(config, barDuration * 4);
    }, barDuration * 4000);

    // 和弦每两拍变化一次
    const chordInterval = window.setInterval(() => {
      if (!this.isPlaying) return;
      const chordIndex = Math.floor((Date.now() / (beatDuration * 2000)) % config.chordProgression.length);
      const chordNotes = config.chordProgression[chordIndex].map(
        note => config.rootNote * Math.pow(2, note / 12)
      );
      this.playChord(chordNotes, beatDuration * 2, config.instrument);
    }, beatDuration * 2000);

    this.intervals = [melodyInterval, bassInterval, padInterval, chordInterval];
  }

  stop() {
    this.isPlaying = false;
    this.intervals.forEach(id => clearInterval(id));
    this.intervals = [];
    this.currentTheme = "none";
  }

  resume() {
    if (this.audioCtx?.state === "suspended") {
      this.audioCtx.resume();
    }
  }
}

// 单例
const musicGenerator = new EnhancedMusicGenerator();

export function useBackgroundMusic() {
  const [state, setState] = useState<MusicState>({
    isPlaying: false,
    volume: 0.25,
    theme: "none",
  });

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
