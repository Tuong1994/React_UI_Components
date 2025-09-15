import { ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
import { ParticlesOptionParams } from "../../type";

const bubbleOptions = (params?: ParticlesOptionParams): ISourceOptions => {
  return {
    fullScreen: params?.fullScreen ?? true,
    background: { color: { value: params?.backgroundColor ?? "#fff" } },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "bubble", // Đổi từ "repulse" sang "bubble"
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        bubble: {
          distance: 200, // Khoảng cách phát hiện hover
          duration: 2, // Thời gian hiệu ứng tồn tại
          size: 10, // Kích thước particles sẽ nở ra
          opacity: 1, // Độ trong suốt khi bubble
        },
      },
    },
    particles: {
      color: {
        value: params?.color ?? "#222",
      },
      links: {
        enable: false, // Tắt hiệu ứng nối lines
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.out,
        },
        random: false,
        speed: 6,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 150,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  };
};

export default bubbleOptions;
