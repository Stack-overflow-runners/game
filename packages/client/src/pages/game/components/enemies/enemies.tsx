import React from 'react';
import { useCanvas } from '../../hooks';
import game from '../../engine/game-engine';
import Enemy from '../enemy';

function Enemies() {
  useCanvas();

  return (
    <>
      {game.gameState.enemies.map(enemy => (
        <Enemy key={enemy.id} enemy={enemy} initialXPosition={enemy.x} />
      ))}
    </>
  );
}

export default Enemies;
