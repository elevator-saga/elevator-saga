import { createFrameRequester } from './create-frame-requester';

describe('createFrameRequester', () => {
  it('should initialize currentT to 0', () => {
    const requester = createFrameRequester(100);
    expect(requester.currentT).toBe(0);
  });

  it('should increment currentT by timeStep on emit', () => {
    const requester = createFrameRequester(50);
    requester.emit();
    expect(requester.currentT).toBe(50);
    requester.emit();
    expect(requester.currentT).toBe(100);
  });

  it('should call registered callback with updated currentT', () => {
    const requester = createFrameRequester(20);
    const cb = jest.fn();
    requester.register(cb);
    requester.emit();
    expect(cb).toHaveBeenCalledWith(20);
    requester.emit();
    expect(cb).toHaveBeenCalledWith(40);
    expect(cb).toHaveBeenCalledTimes(2);
  });

  it('should not call callback if not registered', () => {
    const requester = createFrameRequester(10);
    const cb = jest.fn();
    requester.emit();
    expect(cb).not.toHaveBeenCalled();
  });

  it('should replace the callback when register is called again', () => {
    const requester = createFrameRequester(5);
    const cb1 = jest.fn();
    const cb2 = jest.fn();
    requester.register(cb1);
    requester.emit(); // cb1 called with 5
    requester.register(cb2);
    requester.emit(); // cb2 called with 10
    expect(cb1).toHaveBeenCalledTimes(1);
    expect(cb2).toHaveBeenCalledWith(10);
    expect(cb2).toHaveBeenCalledTimes(1);
  });
});
