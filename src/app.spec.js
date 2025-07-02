jest.mock('@riotjs/route', () => jest.fn());
jest.mock('./app/create-editor', () => ({
  createEditorAsync: jest.fn(() => Promise.resolve({ on: jest.fn(), emit: jest.fn() })),
}));
jest.mock('./app/simulation', () =>
  jest.fn(() => ({ startChallenge: jest.fn(), worldController: { setTimeScale: jest.fn() } }))
);

global.$ = jest.fn(() => ({
  on: jest.fn(),
  emit: jest.fn(),
  addClass: jest.fn(() => ({
    html: jest.fn(),
    removeClass: jest.fn(),
  })),
}));

describe('app', () => {
  it('should load without error', () => {
    document.body.innerHTML = `
      <div class="innerworld"></div>
      <div class="statscontainer"></div>
      <div class="feedbackcontainer"></div>
      <div class="challenge"></div>
      <div class="codestatus"></div>
      <template id="floor-template"></template>
      <template id="elevator-template"></template>
      <template id="elevatorbutton-template"></template>
      <template id="user-template"></template>
      <template id="challenge-template"></template>
      <template id="feedback-template"></template>
      <template id="codestatus-template"></template>
    `;

    require('./app.js');
  });
});
