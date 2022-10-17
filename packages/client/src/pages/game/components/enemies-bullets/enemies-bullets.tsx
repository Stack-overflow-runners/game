import React from 'react';
import { useCanvas } from '../../hooks';
import game from '../../engine/game-engine';
import Bullet from '../bullet';
import usePreloadedImagesRefs from '../../hooks/use-preloaded-images-refs';

type Props = {
  refs: ReturnType<typeof usePreloadedImagesRefs>;
};

function EnemiesBullets({ refs }: Props) {
  useCanvas();

  return (
    <>
      {game.gameState.enemiesBullets.map(bullet => (
        <Bullet
          key={bullet.id}
          type="enemy"
          bullet={bullet}
          imageRef={refs.enemyRocketRef}
        />
      ))}
    </>
  );
}

export default EnemiesBullets;
