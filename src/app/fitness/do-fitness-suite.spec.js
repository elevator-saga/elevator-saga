import { getCodeObjFromCode } from '../../models/utils';
import { calculateFitness } from './calculate-fitness';
import { doFitnessSuite } from './do-fitness-suite';
import { fitnessChallenges } from './index';
import { makeAverageResult } from './make-average-result';

// Mock dependencies
jest.mock('../../models/utils', () => ({
  getCodeObjFromCode: jest.fn(),
}));

jest.mock('./calculate-fitness', () => ({
  calculateFitness: jest.fn(),
}));

jest.mock('./index', () => ({
  fitnessChallenges: [{ options: { id: 1 } }, { options: { id: 2 } }],
}));

jest.mock('./make-average-result', () => ({
  makeAverageResult: jest.fn((results) => ({ averaged: true, results })),
}));

describe('doFitnessSuite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns error object if getCodeObjFromCode throws', () => {
    getCodeObjFromCode.mockImplementation(() => {
      throw new Error('bad code');
    });
    const result = doFitnessSuite('bad code', 2);
    expect(result).toEqual({ error: 'Error: bad code' });
  });

  it('returns error object if calculateFitness returns error', () => {
    getCodeObjFromCode.mockReturnValue({ code: 'obj' });
    calculateFitness.mockReturnValueOnce({ error: 'fitness error' });
    // times will call the callback twice, but error is set on first run
    const result = doFitnessSuite('good code', 2);
    expect(result).toEqual({ error: 'fitness error' });
  });

  it('returns averaged results for each challenge', () => {
    getCodeObjFromCode.mockReturnValue({ code: 'obj' });
    // No error in fitness
    calculateFitness.mockImplementation((challenge) => ({ score: challenge.options.id * 10 }));
    // Simulate two runs
    makeAverageResult.mockImplementation((results) => ({ averaged: true, results }));

    const result = doFitnessSuite('good code', 2);

    // Should call makeAverageResult for each challenge
    expect(makeAverageResult).toHaveBeenCalledTimes(fitnessChallenges.length);
    expect(result.length).toBe(fitnessChallenges.length);
    expect(result[0]).toHaveProperty('averaged', true);
    expect(Array.isArray(result[0].results)).toBe(true);
  });

  it('handles empty fitnessChallenges gracefully', () => {
    jest.resetModules();
    jest.doMock('./index', () => ({ fitnessChallenges: [] }));
    // Re-require after mocking
    const { doFitnessSuite } = require('./do-fitness-suite');
    getCodeObjFromCode.mockReturnValue({ code: 'obj' });
    const result = doFitnessSuite('good code', 1);
    expect(result).toEqual([]);
  });

  it('returns error object if calculateFitness returns falsy', () => {
    getCodeObjFromCode.mockReturnValue({ code: 'obj' });
    // Simulate calculateFitness returning undefined (falsy)
    calculateFitness.mockReturnValueOnce(undefined);
    const result = doFitnessSuite('good code', 1);
    expect(result).toEqual({ error: 'fitness error' });
  });

  it('returns error object if calculateFitness returns null', () => {
    getCodeObjFromCode.mockReturnValue({ code: 'obj' });
    // Simulate calculateFitness returning null (falsy)
    calculateFitness.mockReturnValueOnce(null);
    const result = doFitnessSuite('good code', 1);
    expect(result).toEqual({ error: 'fitness error' });
  });

  it('calls calculateFitness with correct arguments', () => {
    getCodeObjFromCode.mockReturnValue({ code: 'obj' });
    calculateFitness.mockImplementation((challenge) => ({ score: challenge.options.id * 10 }));
    doFitnessSuite('good code', 2);
    expect(calculateFitness).toHaveBeenCalledWith(fitnessChallenges[0], { code: 'obj' }, 1000.0 / 60.0, 12000);
    expect(calculateFitness).toHaveBeenCalledWith(fitnessChallenges[1], { code: 'obj' }, 1000.0 / 60.0, 12000);
  });

  it('returns error if error occurs on second run', () => {
    getCodeObjFromCode.mockReturnValue({ code: 'obj' });
    // First run is fine, second run returns error
    calculateFitness
      .mockReturnValueOnce({ score: 10 })
      .mockReturnValueOnce({ score: 20 })
      .mockReturnValueOnce({ error: 'fail' });
    const result = doFitnessSuite('good code', 2);
    expect(result).toEqual({ error: 'fail' });
  });

  it('returns error if error occurs on second challenge in first run', () => {
    getCodeObjFromCode.mockReturnValue({ code: 'obj' });
    // First challenge ok, second challenge returns error
    calculateFitness.mockReturnValueOnce({ score: 10 }).mockReturnValueOnce({ error: 'fail' });
    const result = doFitnessSuite('good code', 1);
    expect(result).toEqual({ error: 'fail' });
  });
});
