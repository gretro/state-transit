import { EnterLeaveHookAction, EnterLeaveListener } from './actions';
import { EnterLeaveHookContext } from './context';

interface BaseState<T> {
  name: string;
  type: 'interim' | 'choice' | 'end';
  onEnter?: EnterLeaveHookAction<T>;
  onEnterListener?: EnterLeaveListener<T>;
  onLeave?: EnterLeaveHookContext<T>;
  onLeaveListener?: EnterLeaveListener<T>;
}

export type State<T> = InterimState<T> | ChoiceState<T> | EndState<T>;

export interface InterimState<T> extends BaseState<T> {
  type: 'interim';
  events: TransitionEvent[];
}

// TODO: Implement
export interface ChoiceState<T> extends BaseState<T> {
  type: 'choice';
}

export interface EndState<T> extends BaseState<T> {
  type: 'end';
  onLeave?: undefined;
  onLeaveListener?: undefined;
}
