import React, { useEffect, useRef } from 'react';

import { useCanvas, useAnimation } from '../../hooks';
import game from '../../engine/game-engine';
import GAME_SETTINGS from '../../game-settings';

type Props = {
  isAnimating: boolean;
  mainShipFullHealthRef: React.RefObject<CanvasImageSource>;
};

function Ship({ isAnimating, mainShipFullHealthRef }: Props) {
  const context = useCanvas();
  const isControl = useRef<boolean>(false);
  const initialXClick = useRef<number | null>(null);
  const delta = useRef<number>(0);
  const initialXPosition = useRef<number>(game.gameState.ship.x);

  const animatedXPosition = useAnimation(
    0,
    () => initialXPosition.current - delta.current
  );

  const handleMouseDown = (event: MouseEvent) => {
    isControl.current = true;
    initialXClick.current = event.clientX;
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isControl.current && isAnimating && initialXClick.current) {
      delta.current = initialXClick.current - event.clientX;
      game.gameState.ship.setCoord(
        initialXPosition.current - delta.current,
        game.gameState.ship.y
      );
    }
  };

  const handleMouseUp = () => {
    isControl.current = false;
    initialXClick.current = null;
  };

  const handlePointerMove = (e: MouseEvent) => {
    const { canvas } = GAME_SETTINGS;
    const CENTER_POSITION_OF_CANVAS = canvas.width / 2;

    delta.current += e.movementX;

    if (delta.current > CENTER_POSITION_OF_CANVAS) {
      delta.current = -CENTER_POSITION_OF_CANVAS;
    } else if (delta.current < -CENTER_POSITION_OF_CANVAS) {
      delta.current = CENTER_POSITION_OF_CANVAS;
    }

    game.gameState.ship.setCoord(
      initialXPosition.current - delta.current,
      game.gameState.ship.y
    );
  };

  const handlePointerLock = () => {
    if (document.pointerLockElement) {
      window.addEventListener('mousemove', handlePointerMove);
    } else {
      window.removeEventListener('mousemove', handlePointerMove);
    }
  };

  useEffect(() => {
    document.addEventListener('pointerlockchange', handlePointerLock);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLock);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isAnimating]);

  if (context !== null && mainShipFullHealthRef.current !== null) {
    context.fillStyle = 'red';
    context.drawImage(
      mainShipFullHealthRef.current,
      animatedXPosition,
      game.gameState.ship.y,
      game.gameState.ship.width,
      game.gameState.ship.height
    );
  }

  return null;
}

export default Ship;
