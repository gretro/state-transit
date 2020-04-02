import { Guard } from './guards';
import { TransitionHookAction } from './actions';

export interface Transition<T> {
  onEvent: string;
  source: string;
  target: string;
  guards?: Guard<T>[];
  beforeGuardsAction?: TransitionHookAction<T>;
  onSuccessAction?: TransitionHookAction<T>;
}
