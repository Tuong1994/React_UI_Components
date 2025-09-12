import { ComponentShape } from "@/common/type";

export type BgFloatingShape = Exclude<ComponentShape, 'circle'>

export type ParticlesOptionParams = {
  backgroundColor?: string;
  color?: string;
  fullScreen?: boolean;
};
