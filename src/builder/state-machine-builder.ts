import { StateMachineConfig } from './state-machine-config';
import { StateMachine } from '../models/state-machine';
import { StateMachineListeners } from './state-machine-listeners';
import { InvalidConfigurationError } from '../models';
import { validateConfiguration } from './state-machine-validation';

export type StateMachineBuilder<T> = (listeners?: StateMachineListeners<T>) => Promise<StateMachine<T>>;

export function createBuilder<T>(config: StateMachineConfig<T>): StateMachineBuilder<T> {
  const errors = validateConfiguration(config);
  if (errors.length > 0) {
    throw new InvalidConfigurationError(errors);
  }

  // TODO: Create and return state machine
  throw new Error('Not yet implemented');
}
