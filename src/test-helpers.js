export const timeForwarder = function (dt, stepSize, fn) {
  let accumulated = 0.0;

  while (accumulated < dt) {
    accumulated += stepSize;
    fn(stepSize);
  }
};
