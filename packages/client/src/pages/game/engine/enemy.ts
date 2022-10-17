import GameObject from './game-object';

class Enemy extends GameObject {
  public isExploded: boolean = false;

  set exploded(state: boolean) {
    if (state === true) {
      this.isExploded = true;
      setTimeout(() => {
        this.isAlive = false;
      }, 500)
    }
  }
}

export default Enemy;
