import { State } from '../models/states';

export interface StateMachineConfig<T> {
  autoStart?: boolean;
  states: State<T>[];
  initialState: string;
  initialStateData?: T;
}
