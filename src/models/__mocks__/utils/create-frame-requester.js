export const createFrameRequester = jest.fn(() => {
  return {
    trigger: jest.fn(),
    register: jest.fn(),
  };
});
