import React, { useCallback } from 'react'
import { Button } from 'antd';

import createCn from '../../../../utils/create-cn'

import './game-over-screen.css';

const cn = createCn('game-over-screen');

type Props = {
  onGameOver: () => void;
}

function GameOverScreen({ onGameOver}: Props) {
  const handleGameOver = useCallback(() => {
    onGameOver()
  }, [onGameOver]);

  return (
    <div className={cn()}>
      <Button onClick={handleGameOver} className={cn('button')}>
        restart
      </Button>
    </div>
  )
}

export default GameOverScreen;
