/* Tiny WebAudio synth — all sound is generated, no assets. */

export type SfxName =
  | "catch"
  | "slice"
  | "hurt"
  | "shake"
  | "power"
  | "level"
  | "full"
  | "over"
  | "ui"
  | "miss"
  | "start";

class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private musicBus: GainNode | null = null;
  private noiseBuf: AudioBuffer | null = null;
  private timer: number | null = null;
  private nextNote = 0;
  private step = 0;
  private tempo = 0.46;

  muted = false;

  /** Must be called from a user gesture. */
  unlock() {
    if (!this.ctx) {
      const AC: typeof AudioContext =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.85;
      this.master.connect(this.ctx.destination);
      this.musicBus = this.ctx.createGain();
      this.musicBus.gain.value = 0.5;
      this.musicBus.connect(this.master);

      const len = Math.floor(this.ctx.sampleRate * 0.6);
      const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      this.noiseBuf = buf;
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
  }

  setMuted(m: boolean) {
    this.muted = m;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(m ? 0 : 0.85, this.ctx.currentTime, 0.05);
    }
  }

  private now() {
    return this.ctx ? this.ctx.currentTime : 0;
  }

  private tone(opts: {
    freq: number;
    to?: number;
    dur?: number;
    type?: OscillatorType;
    gain?: number;
    delay?: number;
    bus?: GainNode | null;
    detune?: number;
  }) {
    if (!this.ctx || !this.master) return;
    const t0 = this.now() + (opts.delay ?? 0);
    const dur = opts.dur ?? 0.16;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = opts.type ?? "sine";
    osc.frequency.setValueAtTime(Math.max(20, opts.freq), t0);
    if (opts.to) osc.frequency.exponentialRampToValueAtTime(Math.max(20, opts.to), t0 + dur);
    if (opts.detune) osc.detune.setValueAtTime(opts.detune, t0);
    const peak = opts.gain ?? 0.22;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + Math.min(0.02, dur * 0.3));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(opts.bus ?? this.master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  private noise(opts: { dur?: number; gain?: number; freq?: number; q?: number; type?: BiquadFilterType; delay?: number }) {
    if (!this.ctx || !this.master || !this.noiseBuf) return;
    const t0 = this.now() + (opts.delay ?? 0);
    const dur = opts.dur ?? 0.18;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    const filt = this.ctx.createBiquadFilter();
    filt.type = opts.type ?? "bandpass";
    filt.frequency.setValueAtTime(opts.freq ?? 1200, t0);
    filt.frequency.exponentialRampToValueAtTime(Math.max(80, (opts.freq ?? 1200) * 0.35), t0 + dur);
    filt.Q.value = opts.q ?? 1.1;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(opts.gain ?? 0.2, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(filt);
    filt.connect(g);
    g.connect(this.master);
    src.start(t0);
    src.stop(t0 + dur + 0.05);
  }

  play(name: SfxName, variant = 0) {
    if (!this.ctx || this.muted) return;
    switch (name) {
      case "catch": {
        const scale = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24];
        const semi = scale[Math.min(scale.length - 1, variant)];
        const f = 440 * Math.pow(2, semi / 12);
        this.tone({ freq: f, to: f * 1.5, dur: 0.13, type: "triangle", gain: 0.2 });
        this.tone({ freq: f * 2, dur: 0.07, type: "sine", gain: 0.09 });
        this.noise({ dur: 0.07, gain: 0.07, freq: 2600, type: "highpass" });
        break;
      }
      case "slice":
        this.noise({ dur: 0.16, gain: 0.24, freq: 3200, q: 0.7, type: "bandpass" });
        this.tone({ freq: 900, to: 220, dur: 0.14, type: "sawtooth", gain: 0.1 });
        break;
      case "hurt":
        this.tone({ freq: 190, to: 62, dur: 0.36, type: "square", gain: 0.24 });
        this.noise({ dur: 0.32, gain: 0.28, freq: 780, q: 0.6 });
        this.tone({ freq: 1200, to: 300, dur: 0.12, type: "triangle", gain: 0.1, delay: 0.02 });
        break;
      case "shake":
        this.tone({ freq: 130, to: 46, dur: 0.5, type: "sine", gain: 0.34 });
        this.noise({ dur: 0.4, gain: 0.24, freq: 500, q: 0.5 });
        this.tone({ freq: 660, to: 330, dur: 0.2, type: "triangle", gain: 0.12, delay: 0.03 });
        break;
      case "power": {
        const notes = [523, 659, 784, 1046, 1318];
        notes.forEach((f, i) => this.tone({ freq: f, dur: 0.2, type: "triangle", gain: 0.16, delay: i * 0.05 }));
        break;
      }
      case "level": {
        const notes = [392, 523, 659, 880];
        notes.forEach((f, i) => this.tone({ freq: f, dur: 0.26, type: "square", gain: 0.1, delay: i * 0.07 }));
        this.noise({ dur: 0.3, gain: 0.1, freq: 4000, type: "highpass" });
        break;
      }
      case "full": {
        const notes = [523, 659, 784, 1046, 1318, 1568];
        notes.forEach((f, i) =>
          this.tone({ freq: f, dur: 0.34, type: "triangle", gain: 0.14, delay: i * 0.045 }),
        );
        break;
      }
      case "over": {
        const notes = [440, 392, 330, 262, 196];
        notes.forEach((f, i) => this.tone({ freq: f, dur: 0.42, type: "sawtooth", gain: 0.13, delay: i * 0.13 }));
        this.noise({ dur: 0.7, gain: 0.2, freq: 420, q: 0.4 });
        break;
      }
      case "ui":
        this.tone({ freq: 620, to: 900, dur: 0.07, type: "square", gain: 0.09 });
        break;
      case "miss":
        this.tone({ freq: 240, to: 150, dur: 0.12, type: "sine", gain: 0.08 });
        break;
      case "start":
        this.tone({ freq: 330, to: 660, dur: 0.22, type: "triangle", gain: 0.2 });
        this.noise({ dur: 0.24, gain: 0.1, freq: 1800, type: "highpass" });
        break;
    }
  }

  /** Sparse pentatonic bed, scheduled with a lookahead loop. */
  startMusic() {
    if (!this.ctx || this.timer !== null) return;
    this.nextNote = this.now() + 0.1;
    const tick = () => {
      if (!this.ctx || !this.musicBus) return;
      while (this.nextNote < this.now() + 0.25) {
        this.scheduleStep(this.step, this.nextNote);
        this.step = (this.step + 1) % 16;
        this.nextNote += this.tempo;
      }
      this.timer = window.setTimeout(tick, 60);
    };
    tick();
  }

  stopMusic() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  setIntensity(level: number) {
    this.tempo = Math.max(0.26, 0.46 - level * 0.012);
  }

  private scheduleStep(s: number, t: number) {
    if (!this.ctx || !this.musicBus) return;
    const delay = Math.max(0, t - this.now());
    const root = [196, 220, 174.6][Math.floor(s / 8) % 3];
    const penta = [0, 3, 5, 7, 10];
    if (s % 4 === 0) {
      this.tone({ freq: root / 2, to: root / 2, dur: 0.34, type: "sine", gain: 0.16, delay, bus: this.musicBus });
    }
    if (s === 4 || s === 12) {
      this.noise({ dur: 0.14, gain: 0.05, freq: 200, q: 0.8, delay });
    }
    if (s % 2 === 1 && Math.random() < 0.55) {
      const n = root * Math.pow(2, penta[Math.floor(Math.random() * penta.length)] / 12);
      this.tone({ freq: n * 2, dur: 0.5, type: "triangle", gain: 0.045, delay, bus: this.musicBus });
    }
  }
}

export const audio = new AudioEngine();
