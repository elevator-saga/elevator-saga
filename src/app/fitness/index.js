import { requireNothing } from './require-nothing';

/**
 * An array of fitness challenge configurations for the elevator simulation.
 * Each challenge defines scenario options and a condition function.
 *
 * @type {Array<{
 *   options: {
 *     description: string,
 *     floorCount: number,
 *     elevatorCount: number,
 *     spawnRate: number,
 *     elevatorCapacities?: number[]
 *   },
 *   condition: Function
 * }>}
 */
const fitnessChallenges = [
  {
    options: { description: 'Small scenario', floorCount: 4, elevatorCount: 2, spawnRate: 0.6 },
    condition: requireNothing(),
  },
  {
    options: {
      description: 'Medium scenario',
      floorCount: 6,
      elevatorCount: 3,
      spawnRate: 1.5,
      elevatorCapacities: [5],
    },
    condition: requireNothing(),
  },
  {
    options: {
      description: 'Large scenario',
      floorCount: 18,
      elevatorCount: 6,
      spawnRate: 1.9,
      elevatorCapacities: [8],
    },
    condition: requireNothing(),
  },
];
