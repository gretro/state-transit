import { Message } from './message';
import { StateSnapshot } from './state-snapshot';

export interface StateMachine<T> {
  start(): Promise<StateSnapshot<T>>;
  send(message: Message): Promise<StateSnapshot<T>>;
  getStateSnapshot(): StateSnapshot<T>;
}
