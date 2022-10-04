import GameObject from '../game-object';

export default function checkObjectsIntersect(
  obj1: GameObject,
  obj2: GameObject
) {
  const { x: x1, y: y1, width: width1, height: height1 } = obj1.getRect();
  const { x: x2, y: y2, width: width2, height: height2 } = obj2.getRect();
  return (
    (x1 >= x2 && x1 <= x2 + width2 && y1 >= y2 && y1 <= y2 + height2) ||
    (x1 >= x2 &&
      x1 <= x2 + width2 &&
      y1 + height1 >= y2 &&
      y1 + height1 <= y2 + height2) ||
    (x1 + width1 >= x2 &&
      x1 + width1 <= x2 + width2 &&
      y1 >= y2 &&
      y1 <= y2 + height2) ||
    (x1 + width1 >= x2 &&
      x1 + width1 <= x2 + width2 &&
      y1 + height1 >= y2 &&
      y1 + height1 <= y2 + height2)
  );
}
