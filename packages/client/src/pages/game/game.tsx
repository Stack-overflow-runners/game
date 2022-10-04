import React, { useEffect, useState } from 'react';
import Canvas from './components/canvas';
import Enemies from './components/enemies';
import Ship from './components/ship';
import ShipBullets from './components/ship-bullets';

import game from './engine/game-engine';
import CollisionChecker from './components/collision-checker';
import EnemiesBullets from './components/enemies-bullets';

function Game() {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const handleToggleGameRun = () => {
    setIsStarted(prevState => !prevState);
  };

  const handleStopGame = () => {
    setIsStarted(false);
  };

  useEffect(() => {
    if (isStarted) {
      game.start();
    } else {
      game.stop();
    }
  }, [isStarted]);

  return (
    <div>
      <button type="button" onClick={handleToggleGameRun}>
        {isStarted ? 'stop' : 'start'}
      </button>
      {isStarted.toString()}
      <Canvas width={600} height={800} isAnimating={isStarted}>
        <Enemies />
        <EnemiesBullets />
        <ShipBullets />
        <Ship
          initialXPosition={game.gameState.ship.x}
          isAnimating={isStarted}
        />
        <CollisionChecker handleStopGame={handleStopGame} />
      </Canvas>
    </div>
  );
}

export default Game;
