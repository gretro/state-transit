import {
  TransitionFailureHookListener,
  TransitionSuccessHookListener,
  EnterLeaveListener,
} from '../models/actions';

export interface StateMachineListeners<T> {
  onTransitionFailure?: TransitionFailureHookListener<T>;
  onTransitionSuccess?: TransitionSuccessHookListener<T>;
  onStateEnter?: EnterLeaveListener<T>;
  onStateLeave?: EnterLeaveListener<T>;
}
