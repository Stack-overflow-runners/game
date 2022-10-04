import { useCanvas } from '../../hooks';
import EnemyObject from '../../engine/enemy';
import GAME_SETTINGS from '../../game-settings'

type Props = {
  initialXPosition: number;
  enemy: EnemyObject;
};

function Enemy({ initialXPosition, enemy }: Props) {
  const context = useCanvas();

  enemy.setCoord(initialXPosition, enemy.y + GAME_SETTINGS.enemy.speed);

  if (context !== null && enemy.isAlive) {
    context.fillStyle = 'green';
    context.fillRect(initialXPosition, enemy.y, enemy.width, enemy.height);
  }

  return null;
}

export default Enemy;
