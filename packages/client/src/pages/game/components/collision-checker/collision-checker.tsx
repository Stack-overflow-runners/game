import { useEffect } from 'react';

import { useCanvas } from '../../hooks';
import game from '../../engine/game-engine';
import checkCollision from '../../engine/utils/check-collision';

type Props = {
  handleStopGame: () => void;
};

function CollisionChecker({ handleStopGame }: Props) {
  useCanvas();
  const isShipEnemyCollision = checkCollision(
    [game.gameState.ship],
    game.gameState.enemies
  );
  const isShipEnemyBulletCollision = checkCollision(
    game.gameState.enemiesBullets,
    [game.gameState.ship]
  );
  game.checkEnemyShipBulletsCollision();

  useEffect(() => {
    if (isShipEnemyCollision || isShipEnemyBulletCollision) {
      handleStopGame();
    }
  }, [isShipEnemyCollision, isShipEnemyBulletCollision]);

  return null;
}

export default CollisionChecker;
