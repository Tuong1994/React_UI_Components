import useLayoutStore from "./LayoutStore";

const useLayout = () => {
  const [layoutTheme, layoutColor, shrinked, show, resizeContent] = useLayoutStore((state) => [
    state.layoutTheme,
    state.layoutColor,
    state.shrinked,
    state.show,
    state.resizeContent,
  ]);
  const [onShrinked, onResizeContent, onShowSide, onHideSide, onSwitchTheme, onSwitchColor] = useLayoutStore(
    (state) => [
      state.onShrinked,
      state.onResizeContent,
      state.onShowSide,
      state.onHideSide,
      state.onSwitchTheme,
      state.onSwitchColor,
    ]
  );
  const layoutValue = { layoutTheme, layoutColor, shrinked, show, resizeContent };
  const layoutApi = { onShrinked, onResizeContent, onShowSide, onHideSide, onSwitchTheme, onSwitchColor };
  return { layoutValue, layoutApi };
};

export default useLayout;
