import { Message } from './message';
import { StateSnapshot } from './state-snapshot';

interface BaseContext<T> {
  event: 'transition-hook' | 'enter-hook' | 'leave-hook' | 'light-guard' | 'full-guard';
  stateContext: StateSnapshot<T>;
}

export interface AlterableBaseContext<T> extends BaseContext<T> {
  alterStateData: (next: T) => void;
}

interface WithMessage {
  message?: Message;
}

interface TransitionContext {
  source: string;
  target?: string;
}

export type EnterLeaveHookContext<T> = BaseContext<T> &
  WithMessage & {
    type: 'enter-hook' | 'leave-hook';
    state: string;
  };

export interface LightGuardContext<T> extends BaseContext<T> {
  type: 'light-guard';
}

export type FullGuardContext<T> = BaseContext<T> &
  WithMessage &
  TransitionContext & {
    type: 'full-guard';
  };

export type TransitionHookContext<T> = BaseContext<T> &
  WithMessage &
  TransitionContext & {
    type: 'transition-hook';
  };
