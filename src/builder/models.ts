import { State } from '../models/states';

// TODO: Implement throw on error
export interface StateMachineConfig<TStateData> {
  autoStart?: boolean;
  states: State<TStateData>;
  initialState: string;
  initialStateDate?: TStateData;
}
