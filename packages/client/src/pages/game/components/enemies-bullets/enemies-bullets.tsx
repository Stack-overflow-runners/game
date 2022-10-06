import React from 'react';
import { useCanvas } from '../../hooks';
import game from '../../engine/game-engine';
import Bullet from '../bullet';

function EnemiesBullets() {
  useCanvas();

  return (
    <>
      {game.gameState.enemiesBullets.map(bullet => (
        <Bullet key={bullet.id} type="enemy" bullet={bullet} />
      ))}
    </>
  );
}

export default EnemiesBullets;
