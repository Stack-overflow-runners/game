import React, { useEffect, useRef, useState } from 'react';

import { Button } from 'antd';
import Canvas from './components/canvas';
import Enemies from './components/enemies';
import Ship from './components/ship';
import ShipBullets from './components/ship-bullets';
import game from './engine/game-engine';
import CollisionChecker from './components/collision-checker';
import EnemiesBullets from './components/enemies-bullets';
import Images from './components/images';
import GAME_SETTINGS from './game-settings';
import createCn from '../../utils/create-cn';
import usePreloadedImagesRefs from './hooks/use-preloaded-images-refs';
import Background from './components/background/background';
import StartScreen from './components/start-screen';
import Layout from '../../components/layout';
import toggleFullscreen, {
  checkFullscreenOpened,
} from '../../utils/fullscreen-toggle';
import Score from './components/score';
import GameOverScreen from './components/game-over-screen';
import { useAppDispatch } from '../../hooks/store';
import { useAuth } from '../../hooks/auth';
import { addLeader } from '../../store/action-creators/leaders';

import './game.css';

const cn = createCn('game');
const { canvas } = GAME_SETTINGS;

function Game() {
  const refs = usePreloadedImagesRefs();
  const gameRef = useRef<HTMLDivElement>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isNewGame, setIsNewGame] = useState<boolean>(true);
  const [isFullScreen, setIsFullscreen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const handleStopGame = () => {
    setIsStarted(false);
    game.stop();
    dispatch(
      addLeader({
        displayName: user?.second_name || 'Новый игрок',
        score: game.gameState.score,
      })
    );
  };

  const handleRestartGame = () => {
    setIsStarted(true);
    game.restart();
  };

  const handleStartGame = () => {
    setIsStarted(true);
    setIsNewGame(false);
    game.start();
  };

  const handleClickFullScreenBtn = () => {
    toggleFullscreen(gameRef.current);
  };

  const handleFullcreenChange = () => {
    const isFullscreenOpened = checkFullscreenOpened()

    setIsFullscreen(isFullscreenOpened);
  };

  useEffect(() => {
    document.documentElement.addEventListener(
      'fullscreenchange',
      handleFullcreenChange
    );

    return () => {
      document.documentElement.removeEventListener(
        'fullscreenchange',
        handleFullcreenChange
      );
    };
  }, []);

  return (
    <Layout>
      <div className={cn()} ref={gameRef}>
        <div className={cn('game-container')}>
          <Button
            className={cn('fullscreen-btn')}
            type="primary"
            onClick={handleClickFullScreenBtn}>
            {isFullScreen ? 'Обычный экран' : 'Полный экран'}
          </Button>
          {isNewGame && <StartScreen onStart={handleStartGame} />}
          {!isStarted && !isNewGame && (
            <GameOverScreen onGameOver={handleRestartGame} />
          )}
          <Images refs={refs} />
          {isStarted && (
            <Canvas
              width={canvas.width}
              height={canvas.height}
              isAnimating={isStarted}
              className={cn('canvas')}>
              <Score />
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
    </Layout>
  );
}

export default Game;
