import { v4 as makeUUID } from 'uuid';

class GameObject {
  x: number;

  y: number;

  width: number;

  height: number;

  id: string;

  isAlive: boolean;

  constructor(initX: number, initY: number, width: number, height: number) {
    this.x = initX;
    this.y = initY;
    this.width = width;
    this.height = height;
    this.id = makeUUID();
    this.isAlive = true;
  }

  setCoord(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getRect() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }
}

export default GameObject;
