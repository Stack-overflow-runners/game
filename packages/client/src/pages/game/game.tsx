import React, { useEffect, useState } from 'react';

import Canvas from './components/canvas';
import Enemies from './components/enemies';
import Ship from './components/ship';
import ShipBullets from './components/ship-bullets';
import game from './engine/game-engine';
import CollisionChecker from './components/collision-checker';
import EnemiesBullets from './components/enemies-bullets';
import Images from './components/images';
import GAME_SETTINGS from './game-settings';
import createCn from '../../utils/bemClassName';
import usePreloadedImagesRefs from './hooks/use-preloaded-images-refs';
import Background from './components/background/background';
import StartScreen from './components/start-screen';

import './game.css';
import GameOverScreen from './components/game-over-screen';

const cn = createCn('game');
const { canvas } = GAME_SETTINGS;

function Game() {
  const refs = usePreloadedImagesRefs();
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isNewGame, setIsNewGame] = useState<boolean>(true);
  const handleToggleGameRun = () => {
    setIsStarted(prevState => !prevState);
  };

  const handleStopGame = () => {
    setIsStarted(false);
  };

  useEffect(() => {
    if (isNewGame && isStarted) {
      setIsNewGame(false);
    }
  }, [isNewGame, isStarted]);

  useEffect(() => {
    if (isNewGame && isStarted) {
      setIsNewGame(false);
    }

    if (isStarted) {
      if (isNewGame) {
        game.start();
      } else {
        game.restart();
      }
    } else {
      game.stop();
    }
  }, [isStarted]);

  return (
    <div className={cn()}>
      <div className={cn('game-container')}>
        {isNewGame && <StartScreen onStart={handleToggleGameRun} />}
        {!isStarted && !isNewGame && (
          <GameOverScreen onGameOver={handleToggleGameRun} />
        )}
        <Images refs={refs} />
        {isStarted && (
          <Canvas
            width={canvas.width}
            height={canvas.height}
            isAnimating={isStarted}
            className={cn('canvas')}>
            <Enemies refs={refs} />
            <EnemiesBullets refs={refs} />
            <ShipBullets refs={refs} />
            <Ship
              isAnimating={isStarted}
              mainShipFullHealthRef={refs.mainShipFullHealthRef}
            />
            <Background refs={refs} />
            <CollisionChecker handleStopGame={handleStopGame} />
          </Canvas>
        )}
      </div>
    </div>
  );
}

export default Game;
