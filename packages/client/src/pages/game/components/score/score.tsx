import { useCanvas } from '../../hooks';
import game from '../../engine/game-engine';

function Score() {
  const context = useCanvas();

  if (context) {
    context.font = '16px serif';
    context.fillText(game.gameState.score.toString(), 20, 20);
  }

  return null;
}

export default Score;
