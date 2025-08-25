import { ISourceOptions } from "@tsparticles/engine";
import { ParticlesOptionParams } from "../../type";

const twinkleOptions = (params?: ParticlesOptionParams): ISourceOptions => {
  return {
    fullScreen: params?.fullScreen ?? true,
    background: { color: { value: params?.backgroundColor ?? "#222" } },
    particles: {
      number: { value: 120 },
      color: { value: params?.color ?? "#fff" },
      shape: { type: "star" },
      size: { value: { min: 1, max: 4 } },
      move: { enable: true, speed: 0.5 },
      twinkle: { particles: { enable: true, color: "#ffff66", frequency: 0.05 } },
    },
    detectRetina: true,
  };
};

export default twinkleOptions;
