export const createEditorAsync = jest.fn(() => Promise.resolve({ on: jest.fn(), emit: jest.fn() }));
