import { useCanvas } from '../../hooks';
import BulletObject from '../../engine/bullet';
import GAME_SETTINGS from '../../game-settings';

type Props = {
  bullet: BulletObject;
  type: 'enemy' | 'ship';
};

function Bullet({ bullet, type }: Props) {
  const context = useCanvas();

  bullet.setCoord(
    bullet.x,
    bullet.y +
      (type === 'enemy'
        ? GAME_SETTINGS.enemyBullet.speed
        : -GAME_SETTINGS.shipBullet.speed)
  );

  if (context !== null && bullet.isAlive) {
    context.fillStyle = 'black';
    context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  }

  return null;
}

export default Bullet;
