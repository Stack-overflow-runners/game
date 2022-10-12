import React from 'react';
import { useCanvas } from '../../hooks';
import game from '../../engine/game-engine';
import Bullet from '../bullet';
import usePreloadedImagesRefs from '../../hooks/use-preloaded-images-refs';

type Props = {
  refs: ReturnType<typeof usePreloadedImagesRefs>;
};

function ShipBullets({ refs }: Props) {
  useCanvas();

  return (
    <>
      {game.gameState.shipBullets.map(bullet => (
        <Bullet
          key={bullet.id}
          type="ship"
          bullet={bullet}
          imageRef={refs.shipRocketRef}
        />
      ))}
    </>
  );
}

export default ShipBullets;
