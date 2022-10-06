import { useEffect, useRef } from 'react';
import { useCanvas, useAnimation } from '../../hooks';
import game from '../../engine/game-engine';

type Props = {
  initialXPosition: number;
  isAnimating: boolean;
};

function Ship({ initialXPosition, isAnimating }: Props) {
  const context = useCanvas();
  const isControl = useRef<boolean>(false);
  const initialXClick = useRef<number | null>(null);
  const delta = useRef<number>(0);

  const animatedXPosition = useAnimation(
    0,
    () => initialXPosition - delta.current
  );

  const handleMouseDown = (event: MouseEvent) => {
    isControl.current = true;
    initialXClick.current = event.clientX;
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isControl.current && isAnimating && initialXClick.current) {
      delta.current = initialXClick.current - event.clientX;
      game.gameState.ship.setCoord(
        initialXPosition - delta.current,
        game.gameState.ship.y
      );
    }
  };

  const handleMouseUp = () => {
    isControl.current = false;
    initialXClick.current = null;
  };
  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isAnimating]);

  if (context !== null) {
    context.fillStyle = 'red';
    context.fillRect(
      animatedXPosition,
      game.gameState.ship.y,
      game.gameState.ship.width,
      game.gameState.ship.height
    );
  }

  return null;
}

export default Ship;
