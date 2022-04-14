import type {Config} from '@jest/types';

export default {
  verbose: true,
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
} as Config.InitialOptions;
