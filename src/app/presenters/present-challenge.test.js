import render from '@riotjs/ssr';
import { presentChallenge } from './present-challenge';

jest.mock('@riotjs/ssr', () => ({
  __esModule: true,
  default: jest.fn((templ, data) => templ),
}));

describe('presentChallenge', () => {
  let $parent, challenge, app, world, worldController, challengeNum, challengeTempl;

  beforeEach(() => {
    $parent = $('<div></div>');
    challenge = { foo: 'bar' };
    app = { startStopOrRestart: jest.fn() };
    world = { challengeEnded: false };
    worldController = {
      timeScale: 2,
      isPaused: false,
      setTimeScale: jest.fn(),
    };
    challengeNum = 1;
    challengeTempl = '<div></div>';

    // Mock render to return expected HTML for tests
    render.mockImplementation(
      () =>
        `<div>
        <div class="startstop"></div>
        <div class="timescale_increase"></div>
        <div class="timescale_decrease"></div>
      </div>`
    );
  });

  it('renders the challenge UI into the parent', () => {
    // Act
    presentChallenge($parent, challenge, { app, world, worldController, challengeNum, challengeTempl });

    // Assert
    expect($parent.html()).toContain('startstop');
    expect($parent.html()).toContain('timescale_increase');
    expect($parent.html()).toContain('timescale_decrease');
  });

  it('calls app.startStopOrRestart when .startstop is clicked', () => {
    // Arrange
    presentChallenge($parent, challenge, { app, world, worldController, challengeNum, challengeTempl });

    // Act
    $parent.find('.startstop').trigger('click');

    // Assert
    expect(app.startStopOrRestart).toHaveBeenCalled();
  });

  it('increases timeScale when .timescale_increase is clicked and timeScale < 40', () => {
    // Arrange
    worldController.timeScale = 10;
    presentChallenge($parent, challenge, { app, world, worldController, challengeNum, challengeTempl });

    // Act
    $parent.find('.timescale_increase').trigger({ type: 'click', preventDefault: jest.fn() });

    // Assert
    expect(worldController.setTimeScale).toHaveBeenCalledWith(Math.round(10 * 1.618));
  });

  it('does not increase timeScale when .timescale_increase is clicked and timeScale >= 40', () => {
    // Arrange
    worldController.timeScale = 40;
    presentChallenge($parent, challenge, { app, world, worldController, challengeNum, challengeTempl });

    // Act
    $parent.find('.timescale_increase').trigger({ type: 'click', preventDefault: jest.fn() });

    // Assert
    expect(worldController.setTimeScale).not.toHaveBeenCalled();
  });

  it('decreases timeScale when .timescale_decrease is clicked', () => {
    // Arrange
    worldController.timeScale = 10;
    presentChallenge($parent, challenge, { app, world, worldController, challengeNum, challengeTempl });

    // Act
    $parent.find('.timescale_decrease').trigger({ type: 'click', preventDefault: jest.fn() });

    // Assert
    expect(worldController.setTimeScale).toHaveBeenCalledWith(Math.round(10 / 1.618));
  });
});
