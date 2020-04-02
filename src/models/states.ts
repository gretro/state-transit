import { EnterLeaveHookAction } from './actions';
import { EnterLeaveHookContext } from './context';
import { Choice } from './choice';
import { Transition } from './transitions';

interface BaseState<T> {
  name: string;
  type: 'interim' | 'choice' | 'end';
  onEnter?: EnterLeaveHookAction<T>;
  onLeave?: EnterLeaveHookContext<T>;
}

export type State<T> = InterimState<T> | ChoiceState<T> | EndState<T>;

export interface InterimState<T> extends BaseState<T> {
  type: 'interim';
  transitions: Transition<T>[];
}

export interface ChoiceState<T> extends BaseState<T> {
  type: 'choice';
  choices: Choice<T>[];
}

export interface EndState<T> extends BaseState<T> {
  type: 'end';
  onLeave?: undefined;
}
