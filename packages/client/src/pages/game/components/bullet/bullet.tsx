import React from 'react';

import { useCanvas } from '../../hooks';
import BulletObject from '../../engine/bullet';
import GAME_SETTINGS from '../../game-settings';

type Props = {
  bullet: BulletObject;
  type: 'enemy' | 'ship';
  imageRef: React.RefObject<CanvasImageSource>;
};

function Bullet({ bullet, type, imageRef }: Props) {
  const context = useCanvas();

  bullet.setCoord(
    bullet.x,
    bullet.y +
      (type === 'enemy'
        ? GAME_SETTINGS.enemyBullet.speed
        : -GAME_SETTINGS.shipBullet.speed)
  );

  if (context !== null && bullet.isAlive && imageRef.current !== null) {
    context.drawImage(
      imageRef.current,
      bullet.x,
      bullet.y,
      bullet.width,
      bullet.height
    );
  }

  return null;
}

export default Bullet;
