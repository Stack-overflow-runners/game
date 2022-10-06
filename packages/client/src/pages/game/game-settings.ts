const GAME_SETTINGS = {
  canvas: {
    width: 600,
    height: 800,
  },
  ship: {
    width: 50,
    height: 50,
  },
  enemy: {
    width: 100,
    height: 100,
    speed: 0.5,
  },
  enemyBullet: {
    width: 20,
    height: 20,
    speed: 3,
    interval: 1000,
  },
  shipBullet: {
    width: 20,
    height: 20,
    speed: 3,
    interval: 500,
  },
  cleanerInterval: 10000,
};

export default GAME_SETTINGS;
