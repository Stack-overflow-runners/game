import { useRef } from 'react';

import { useAnimation, useCanvas } from '../../hooks';
import usePreloadedImagesRefs from '../../hooks/use-preloaded-images-refs';

type Props = {
  refs: ReturnType<typeof usePreloadedImagesRefs>;
};

function Background({ refs }: Props) {
  const context = useCanvas();
  const value = useRef<number>(0);

  const animatedXPosition = useAnimation(0, () => {
    if (value.current === 0) {
      value.current = -360;
    }
    value.current += 1;
    return value.current;
  });

  if (
    context !== null &&
    refs.backgroundVoidRef.current !== null &&
    refs.backgroundStarsRef.current !== null
  ) {
    for (let i = 0; i < 5; i += 1) {
      context.drawImage(
        refs.backgroundStarsRef.current,
        0,
        animatedXPosition + 360 * i,
        400,
        360
      );
      context.drawImage(
        refs.backgroundVoidRef.current,
        0,
        animatedXPosition + 360 * i,
        400,
        360
      );
    }
  }

  return null;
}

export default Background;
