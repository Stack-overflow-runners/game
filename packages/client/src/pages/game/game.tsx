import { useEffect, useRef, useState } from 'react';

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
import clipboardAPI from '../../web-api/clipboard-api';
import fullscreenAPI from '../../web-api/fullscreen-api';
import Score from './components/score';
import GameOverScreen from './components/game-over-screen';
import { useAppDispatch } from '../../hooks/store';
import { useAuth } from '../../hooks/auth';
import { addLeader } from '../../store/action-creators/leaders';
import withAuth from '../../hoc/withAuth';

import './game.css';

const cn = createCn('game');
const { canvas } = GAME_SETTINGS;

function Game() {
  const refs = usePreloadedImagesRefs();
  const gameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
        displayName: user?.displayName || 'Новый игрок',
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

  const handleLinkCopy = () => {
    clipboardAPI.copy('ссылка на игру для товарища');
  };

  const handleFullscreenButtonToggle = () => {
    fullscreenAPI.toggle(gameRef.current);
  };

  const handleFullcreenChange = () => {
    setIsFullscreen(fullscreenAPI.isOpened);
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
          <div className={cn('buttons')}>
            <Button type="primary" onClick={handleLinkCopy}>
              Копировать ссылку на игру
            </Button>
            <Button type="primary" onClick={handleFullscreenButtonToggle}>
              {isFullScreen ? 'Обычный экран' : 'Полный экран'}
            </Button>
          </div>
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
              ref={canvasRef}
              className={cn('canvas')}>
              <Score />
              <Enemies refs={refs} />
              <EnemiesBullets refs={refs} />
              <ShipBullets refs={refs} />
              <Ship
                isAnimating={isStarted}
                canvasRef={canvasRef}
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

export default withAuth(Game);
