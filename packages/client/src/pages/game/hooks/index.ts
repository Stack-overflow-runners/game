import { useContext, useRef } from 'react';

import { FrameContext, CanvasContext } from '../contexts';

export const useCanvas = () => {
  useContext(FrameContext);
  const renderingContext = useContext(CanvasContext);
  return renderingContext;
};

export const useAnimation = (
  initialValue: number,
  valueUpdater: (value: number) => number
) => {
  const animatedValue = useRef(initialValue);
  animatedValue.current = valueUpdater(animatedValue.current);
  return animatedValue.current;
};
