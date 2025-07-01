import { map, pluck, range, times } from 'lodash';
import { getCodeObjFromCode } from '../../models/utils';
import { calculateFitness } from './calculate-fitness';
import { doFitnessSuite } from './do-fitness-suite';
import { fitnessChallenges } from './index';
import { makeAverageResult } from './make-average-result';

// Mock dependencies
jest.mock('lodash', () => ({
  map: jest.fn((arr, fn) => (Array.isArray(arr) ? arr.map(fn) : [])),
  pluck: jest.fn((arr, key) => arr.map((obj) => obj[key])),
  range: jest.fn((n) => Array.from({ length: n }, (_, i) => i)),
  times: jest.fn((n, fn) => {
    for (let i = 0; i < n; i++) fn(i);
  }),
}));

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
    let timesCb;
    times.mockImplementation((n, cb) => {
      timesCb = cb;
      for (let i = 0; i < n; i++) cb(i);
    });
    // map and pluck behave as normal
    map.mockImplementation((arr, fn) => (Array.isArray(arr) ? arr.map(fn) : []));
    pluck.mockImplementation((arr, key) => arr.map((obj) => obj[key]));
    range.mockImplementation((n) => Array.from({ length: n }, (_, i) => i));
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
});
