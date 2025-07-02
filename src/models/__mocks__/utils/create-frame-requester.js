export const createFrameRequester = jest.fn(() => {
  return {
    emit: jest.fn(),
    register: jest.fn(),
  };
});
