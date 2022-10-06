import Ship from './ship';
import Enemy from './enemy';
import Bullet from './bullet';
import getRandomArbitrary from '../../../utils/get-random-arbitrary';
import { IntervalId } from '../../../types/interval-id';
import checkObjectsIntersect from './utils/check-objects-intersect';
import GAME_SETTINGS from '../game-settings';

type GameState = {
  ship: Ship;
  enemies: Enemy[];
  enemiesBullets: Bullet[];
  shipBullets: Bullet[];
};

const {ship, enemy, enemyBullet, shipBullet, canvas, cleanerInterval} = GAME_SETTINGS;

class GameEngine {
  private shipBulletsIntervalId: IntervalId | undefined;

  private enemiesBulletsIntervalId: IntervalId | undefined;

  private enemiesIntervalId: IntervalId | undefined;

  private objectsCleanerIntervalId: IntervalId | undefined;

  gameState: GameState = {
    ship: new Ship(canvas.width / 2 - ship.width / 2, canvas.height - ship.height, ship.width, ship.height),
    enemies: [],
    enemiesBullets: [],
    shipBullets: [],
  };

  objectsCleaner() {
    this.objectsCleanerIntervalId = setInterval(() => {
      const { enemies, enemiesBullets, shipBullets } = this.gameState;

      this.gameState.enemies = enemies.filter(
        ({ isAlive, y }) => isAlive && y <= canvas.height
      );
      this.gameState.enemiesBullets = enemiesBullets.filter(
        ({ isAlive, y }) => isAlive && y <= canvas.height
      );
      this.gameState.shipBullets = shipBullets.filter(
        ({ isAlive, y }) => isAlive && y >= -shipBullet.height
      );
    }, cleanerInterval);
  }

  generateEnemies() {
    this.enemiesIntervalId = setInterval(() => {
      this.gameState.enemies.push(
        new Enemy(getRandomArbitrary(0, canvas.width - enemy.width), -enemy.height, enemy.width, enemy.height)
      );
    }, 2000);
  }

  generateEnemiesBullets() {
    this.enemiesBulletsIntervalId = setInterval(() => {
      const { enemies, enemiesBullets } = this.gameState;
      enemies.forEach(enm => {
        if (!enm.isAlive) {
          return;
        }
        enemiesBullets.push(
          new Bullet(
            Math.floor(enm.x + enm.width / 2) - enemyBullet.width / 2,
            enm.y + enm.height,
            enemyBullet.width,
            enemyBullet.height,
          )
        );
      });
    }, enemyBullet.interval);
  }

  generateShipBullets() {
    this.shipBulletsIntervalId = setInterval(() => {
      const { ship: gameShip, shipBullets } = this.gameState;
      shipBullets.push(
        new Bullet(
          Math.floor(gameShip.x + gameShip.width / 2) - shipBullet.width / 2,
          gameShip.y - 20,
          shipBullet.width,
          shipBullet.height,
        )
      );
    }, shipBullet.interval);
  }

  start() {
    this.objectsCleaner();
    this.generateEnemies();
    this.generateShipBullets();
    this.generateEnemiesBullets();
  }

  stop() {
    clearInterval(this.objectsCleanerIntervalId);
    clearInterval(this.enemiesIntervalId);
    clearInterval(this.shipBulletsIntervalId);
    clearInterval(this.enemiesBulletsIntervalId);
  }

  checkEnemyShipBulletsCollision() {
    const { enemies, shipBullets } = this.gameState;
    for (let i = 0; i < enemies.length; i += 1) {
      for (let j = 0; j < shipBullets.length; j += 1) {
        if (
          enemies[i].isAlive &&
          shipBullets[j].isAlive &&
          checkObjectsIntersect(shipBullets[j], enemies[i])
        ) {
          enemies[i].isAlive = false;
          shipBullets[j].isAlive = false;
        }
      }
    }
  }
}

export default new GameEngine();
