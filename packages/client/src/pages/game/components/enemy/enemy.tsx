import React, {useRef} from 'react';

import { useCanvas, useAnimation } from '../../hooks';
import EnemyObject from '../../engine/enemy';
import GAME_SETTINGS from '../../game-settings';

type Props = {
  initialXPosition: number;
  enemy: EnemyObject;
  enemyImageRef: React.RefObject<CanvasImageSource>;
  enemyDestructionRef: React.RefObject<CanvasImageSource>;
};

function Enemy({
  initialXPosition,
  enemy,
  enemyImageRef,
  enemyDestructionRef,
}: Props) {
  const context = useCanvas();
  const explodedTimer = useRef(0);

  useAnimation(0, value => {
    if (enemy.isExploded && value % 2000 === 0) {
      explodedTimer.current += 1;
    }
    return value;
  });

  enemy.setCoord(initialXPosition, enemy.y + GAME_SETTINGS.enemy.speed);

  if (context !== null && enemy.isAlive && enemyImageRef.current !== null) {
    if (enemy.isExploded && enemyDestructionRef.current) {
        context.drawImage(
          enemyDestructionRef.current,
          1690 - 128 * explodedTimer.current,
          25,
          enemy.width,
          enemy.height,
          initialXPosition,
          enemy.y,
          enemy.width,
          enemy.height
        );
    } else {
      context.drawImage(
        enemyImageRef.current,
        initialXPosition,
        enemy.y,
        enemy.width,
        enemy.height
      );
    }
  }

  return null;
}

export default Enemy;
