export default class MockWorldController {
  constructor() {
    this.on = jest.fn();
    this.dtMax = 100;
    this.timeScale = 1.0;
    this.isPaused = true;
    this.handleUserCodeError = jest.fn();
    this.start = jest.fn();
    this.handleUserCodeError = jest.fn();
    this.setPaused = jest.fn();
    this.setTimeScale = jest.fn();
  }
}
