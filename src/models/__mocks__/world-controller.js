export default class MockWorldController {
  constructor(dtMax) {
    this.on = jest.fn();
    this.dtMax = dtMax;
    this.timeScale = 1.0;
    this.isPaused = true;
    this.handleUserCodeError = jest.fn();
    this.start = jest.fn();
    this.handleUserCodeError = jest.fn();
    this.setPaused = jest.fn();
    this.setTimeScale = jest.fn();
  }
}
