import GameObject from '../game-object'
import checkObjectsIntersect from './check-objects-intersect'

export default function checkCollision(objects1: GameObject[], objects2: GameObject[]) {
  for (let i = 0; i < objects1.length; i += 1) {
    for (let j = 0; j < objects2.length; j += 1) {
      if (
        objects1[i].isAlive &&
        objects2[j].isAlive &&
        checkObjectsIntersect(objects1[i], objects2[j])
      ) {
        return true;
      }
    }
  }

  return false;
}
