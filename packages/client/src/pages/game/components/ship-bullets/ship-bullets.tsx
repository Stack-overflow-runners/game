import React from 'react';
import { useCanvas } from '../../hooks';
import game from '../../engine/game-engine';
import Bullet from '../bullet';

function ShipBullets() {
  useCanvas();

  return (
    <>
      {game.gameState.shipBullets.map(bullet => (
        <Bullet key={bullet.id} type="ship" bullet={bullet} />
      ))}
    </>
  );
}

export default ShipBullets;
