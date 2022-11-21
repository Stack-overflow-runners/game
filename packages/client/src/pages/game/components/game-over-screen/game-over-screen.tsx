import React, { useCallback } from 'react';

import gameCoverImg from '../../../../assets/background-game-over.png';
import restartButtonImg from '../../../../assets/game-restart-button.png';

import createCn from '../../../../utils/create-cn';
import game from '../../engine/game-engine';

import './game-over-screen.css';

const cn = createCn('game-over-screen');

type Props = {
  onGameOver: () => void;
};

function GameOverScreen({ onGameOver }: Props) {
  const handleGameOver = useCallback(() => {
    onGameOver();
  }, [onGameOver]);

  return (
    <div className={cn()}>
      <img className={cn('image')} src={gameCoverImg} alt="game over" width={400} height={600} />
      <span className={cn('score-title')}>Ваш счет</span>
      <span className={cn('score')}>{game.gameState.score}</span>
      <button
        className={cn('restart')}
        data-testid="restartGame"
        type="button"
        onClick={handleGameOver}>
        <img src={restartButtonImg} alt="start" width={220} height={71} />
      </button>
    </div>
  );
}

export default GameOverScreen;
