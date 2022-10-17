const GAME_SETTINGS = {
  canvas: {
    width: 400,
    height: 600,
  },
  ship: {
    width: 32,
    height: 30,
  },
  enemy: {
    width: 76,
    height: 90,
    speed: 0.5,
  },
  enemyBullet: {
    width: 6,
    height: 18,
    speed: 3,
    interval: 1000,
  },
  shipBullet: {
    width: 6,
    height: 18,
    speed: 3,
    interval: 700,
  },
  cleanerInterval: 10000,
};

export default GAME_SETTINGS;
