import { createContext } from 'react';

export const CanvasContext = createContext<CanvasRenderingContext2D | null>(
  null
);
export const FrameContext = createContext<number>(0);
