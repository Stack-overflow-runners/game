import React from 'react';

import createCn from '../../../../utils/create-cn';

import gameCoverImg from '../../../../assets/game-cover.png';
import startButtonImg from '../../../../assets/game-start-button.png';

import './start-screen.css';

const cn = createCn('start-screen');

type Props = {
  onStart: () => void;
};

function StartScreen({ onStart }: Props) {
  const handleStart = () => {
    onStart();
  };

  return (
    <div className={cn()}>
      <img className={cn("image")} src={gameCoverImg} alt="space runner" width={400} height={600} />
      <button
        className={cn('start')}
        data-testid="startGame"
        type="button"
        onClick={handleStart}>
        <img src={startButtonImg} alt="start" width={200} height={82} />
      </button>
    </div>
  );
}

export default StartScreen;
