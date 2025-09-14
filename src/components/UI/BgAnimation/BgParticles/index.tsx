import { CSSProperties, forwardRef, ForwardRefRenderFunction, HTMLAttributes, useMemo } from "react";
import type { ISourceOptions } from "@tsparticles/engine";
import Particles from "@tsparticles/react";
import linksOptions from "./sourceOptions/linksOptions";
import useParticles from "./useParticles";
import utils from "@/utils";

interface BgParticlesProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  rootClassName?: string;
  options?: ISourceOptions;
  layoutColor?: boolean;
  fullScreen?: boolean;
  zIndex?: number;
}

const BgParticles: ForwardRefRenderFunction<HTMLDivElement, BgParticlesProps> = (
  {
    rootClassName = "",
    id = "tsparticles",
    zIndex = 0,
    fullScreen = true,
    layoutColor,
    options,
    style,
    ...restProps
  },
  ref
) => {
  const { init, particlesTheme } = useParticles(layoutColor);

  const particlesOptions: ISourceOptions = useMemo(() => {
    if (options) return options;
    return linksOptions({
      backgroundColor: particlesTheme.background,
      color: particlesTheme.particlesColor,
      fullScreen,
    });
  }, [particlesTheme.background, particlesTheme.particlesColor, particlesTheme.linkColor, fullScreen]);

  const rootStyle = useMemo<CSSProperties>(
    () => ({
      ...style,
      zIndex,
    }),
    [style, zIndex]
  );

  const className = utils.formatClassName("bg-particles", rootClassName);

  if (init) {
    return (
      <div ref={ref} {...restProps} style={rootStyle} className={className}>
        <Particles
          id={id}
          className="bg-particles-view"
          key={JSON.stringify(particlesTheme)}
          options={particlesOptions}
        />
      </div>
    );
  }

  return <></>;
};

export default forwardRef(BgParticles);
