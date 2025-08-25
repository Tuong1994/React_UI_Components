import { ISourceOptions } from "@tsparticles/engine";
import { ParticlesOptionParams } from "../../type";

const collideOptions = (params?: ParticlesOptionParams): ISourceOptions => {
  return {
    fullScreen: params?.fullScreen ?? true,
    background: { color: { value: params?.backgroundColor ?? "#222" } },
    particles: {
      number: { value: 50 },
      color: { value: params?.color ?? "#fff" },
      shape: { type: "circle" },
      size: { value: { min: 5, max: 15 } },
      move: { enable: true, speed: 3 },
      collisions: { enable: true },
    },
    detectRetina: true,
  };
};

export default collideOptions;
