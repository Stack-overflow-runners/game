import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { random } from 'lodash';

import { FrameContext, CanvasContext } from '../../contexts';

type Props = {
  height: number;
  width: number;
  isAnimating: boolean;
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
};

function Canvas({ height, width, isAnimating, children }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // the canvas' context is stored once it's created
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    if (canvasRef.current !== null) {
      const canvasContext = canvasRef.current.getContext('2d');
      if (canvasContext !== null) {
        canvasContext.globalCompositeOperation = 'soft-light';
        setContext(canvasContext);
      }
    }
  }, []);

  // making the component and the context re-render at every frame
  const [frameCount, setFrameCount] = useState(0);
  useEffect(() => {
    let frameId: number;
    if (isAnimating) {
      frameId = requestAnimationFrame(() => {
        setFrameCount(frameCount + 1);
      });
    }
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isAnimating, frameCount, setFrameCount]);

  // whenever the canvas' dimensions change, it's automatically cleared
  // we need to re-draw all its children in this case */
  useLayoutEffect(() => {
    setFrameCount(random(1, true));
  }, [width, height]);

  // we need to clear the whole canvas before drawing the children
  if (context !== null) {
    context.clearRect(0, 0, width, height);
  }

  return (
    <CanvasContext.Provider value={context}>
      <FrameContext.Provider value={frameCount}>
        <canvas
          ref={canvasRef}
          height={height}
          width={width}
          style={{ width, height, border: '1px solid black' }}
        />
        {children}
      </FrameContext.Provider>
    </CanvasContext.Provider>
  );
}

export default Canvas;
