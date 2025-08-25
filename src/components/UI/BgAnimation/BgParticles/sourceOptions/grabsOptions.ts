import { ISourceOptions } from "@tsparticles/engine";
import { ParticlesOptionParams } from "../../type";

const grabsOptions = (params?: ParticlesOptionParams): ISourceOptions => {
  return {
    fullScreen: params?.fullScreen ?? true,
    background: { color: { value: params?.backgroundColor ?? "#222" } },
    particles: {
      number: { value: 80 },
      color: { value: params?.color ?? "#fff" },
      links: { enable: false },
      move: { enable: true, speed: 1.5 },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.6 } },
      },
    },
    detectRetina: true,
  };
};

export default grabsOptions;
