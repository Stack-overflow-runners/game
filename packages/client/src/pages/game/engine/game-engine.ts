import Ship from './ship';
import Enemy from './enemy';
import Bullet from './bullet';
import getRandomArbitrary from '../../../utils/get-random-arbitrary';
import { IntervalId } from '../../../types/interval-id';
import checkObjectsIntersect from './utils/check-objects-intersect';

type GameState = {
  ship: Ship;
  enemies: Enemy[];
  enemiesBullets: Bullet[];
  shipBullets: Bullet[];
};

class GameEngine {
  private shipBulletsIntervalId: IntervalId | undefined;

  private enemiesBulletsIntervalId: IntervalId | undefined;

  private enemiesIntervalId: IntervalId | undefined;

  private objectsCleanerIntervalId: IntervalId | undefined;

  gameState: GameState = {
    ship: new Ship(300, 750, 50, 100),
    enemies: [],
    enemiesBullets: [],
    shipBullets: [],
  };

  objectsCleaner() {
    this.objectsCleanerIntervalId = setInterval(() => {
      const { enemies, enemiesBullets, shipBullets } = this.gameState;

      this.gameState.enemies = enemies.filter(
        ({ isAlive, y }) => isAlive && y <= 800
      );
      this.gameState.enemiesBullets = enemiesBullets.filter(
        ({ isAlive, y }) => isAlive && y <= 800
      );
      this.gameState.shipBullets = shipBullets.filter(
        ({ isAlive, y }) => isAlive && y >= -20
      );
    }, 10000);
  }

  generateEnemies() {
    this.enemiesIntervalId = setInterval(() => {
      this.gameState.enemies.push(
        new Enemy(getRandomArbitrary(0, 500), -100, 100, 100)
      );
    }, 2000);
  }

  generateEnemiesBullets() {
    this.enemiesBulletsIntervalId = setInterval(() => {
      const { enemies, enemiesBullets } = this.gameState;
      enemies.forEach(enemy => {
        if (!enemy.isAlive) {
          return;
        }
        enemiesBullets.push(
          new Bullet(
            Math.floor(enemy.x + enemy.width / 2) - 10,
            enemy.y + enemy.height,
            20,
            20
          )
        );
      });
    }, 1000);
  }

  generateShipBullets() {
    this.shipBulletsIntervalId = setInterval(() => {
      const { ship, shipBullets } = this.gameState;
      shipBullets.push(
        new Bullet(
          Math.floor(ship.x + ship.width / 2) - 10,
          ship.y - 20,
          20,
          20
        )
      );
    }, 500);
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
