import { useEffect, useMemo, useState } from "react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { ETheme } from "@/components/UI/Layout/Context";
import linksConfig from "./sourceOptions/linksOptions";
import bubbleConfig from "./sourceOptions/bubbleOptions";
import grabsConfig from "./sourceOptions/grabsOptions";
import collideConfig from "./sourceOptions/collideOptions";
import twinkleConfig from "./sourceOptions/twinkleOptions";
import useLayout from "@/components/UI/Layout/useLayout";
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

type ParticlesTheme = {
  background: string;
  particlesColor: string;
  linkColor: string;
};

const colorWhite = "#fff";
const colorBlack = "#222";
const colorBlue = "#0ea5e9";
const colorRed = "#f43f5e";
const colorGreen = "#10b981";
const colorOrange = "#f5a316";
const colorYellow = "#ffe601";
const colorPurple = "#6366f1";
const colorPink = "#ec4899";

const useParticles = (bgColor?: boolean) => {
  const [init, setInit] = useState<boolean>(false);

  const [particlesTheme, setParticlesTheme] = useState<ParticlesTheme>({
    background: colorWhite,
    particlesColor: colorBlack,
    linkColor: colorBlack,
  });

  const { layoutValue } = useLayout();

  const { layoutTheme, layoutColor } = layoutValue;

  const bgColors: Record<string, string> = {
    blue: colorBlue,
    green: colorGreen,
    red: colorRed,
    orange: colorOrange,
    yellow: colorYellow,
    purple: colorPurple,
    pink: colorPink,
  };

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      //await loadBasic(engine);
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Set dark/light mode -> work when don't apply color theme
  useEffect(() => {
    if (bgColor) return;
    if (layoutTheme === ETheme.LIGHT) {
      setParticlesTheme((prev) => ({
        ...prev,
        background: colorWhite,
        particlesColor: colorBlack,
        linkColor: colorBlack,
      }));
    } else {
      setParticlesTheme((prev) => ({
        ...prev,
        background: colorBlack,
        particlesColor: colorWhite,
        linkColor: colorWhite,
      }));
    }
  }, [layoutTheme, bgColor]);

  // Set theme -> disabled dark/light mode
  useEffect(() => {
    if (!bgColor) return;
    const background = bgColors[layoutColor];
    setParticlesTheme((prev) => ({
      ...prev,
      background,
      particlesColor: colorWhite,
      linkColor: colorWhite,
    }));
  }, [layoutColor, bgColor]);

  const optionsParams = useMemo(() => {
    if (!bgColor) return undefined;
    return { backgroundColor: particlesTheme.background, color: particlesTheme.particlesColor };
  }, [particlesTheme.background, particlesTheme.particlesColor, bgColor]);

  const linksOptions = useMemo(() => linksConfig(optionsParams), [optionsParams]);

  const bubbleOptions = useMemo(() => bubbleConfig(optionsParams), [optionsParams]);

  const grabsOptions = useMemo(() => grabsConfig(optionsParams), [optionsParams]);

  const collideOptions = useMemo(() => collideConfig(optionsParams), [optionsParams]);

  const twinkleOptions = useMemo(() => twinkleConfig(optionsParams), [optionsParams]);

  return { init, particlesTheme, linksOptions, bubbleOptions, grabsOptions, collideOptions, twinkleOptions };
};

export default useParticles;
