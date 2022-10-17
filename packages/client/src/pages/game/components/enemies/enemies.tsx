import React from 'react';
import { useCanvas } from '../../hooks';
import game from '../../engine/game-engine';
import Enemy from '../enemy';
import usePreloadedImagesRefs from '../../hooks/use-preloaded-images-refs';

type Props = {
  refs: ReturnType<typeof usePreloadedImagesRefs>;
};

function Enemies({ refs }: Props) {
  useCanvas();

  return (
    <>
      {game.gameState.enemies.map(enemy => (
        <Enemy
          key={enemy.id}
          enemy={enemy}
          initialXPosition={enemy.x}
          enemyImageRef={refs.enemyBattlecruiserBaseRef}
          enemyDestructionRef={refs.enemyBattlecruiserDestructionRef}
        />
      ))}
    </>
  );
}

export default Enemies;
