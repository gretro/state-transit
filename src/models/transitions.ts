import { Guard } from './guards';
import {
  TransitionHookAction,
  TransitionFailureHookListener,
  TransitionSuccessHookListener,
} from './actions';

export interface Transition<T> {
  onEvent: string;
  source: string;
  target: string;
  guards?: Guard<T>[];
  beforeGuardsAction?: TransitionHookAction<T>;
  onFailureListener?: TransitionFailureHookListener<T>;
  onSuccessListener?: TransitionSuccessHookListener<T>;
}
