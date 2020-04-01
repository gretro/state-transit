import { Message } from './message';

interface BaseContext<T> {
  event:
    | 'transition-hook'
    | 'enter-hook'
    | 'leave-hook'
    | 'light-guard'
    | 'full-guard';
  stateData?: T;
  // TODO: Type correctly
  getStateMachine: () => unknown;
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
