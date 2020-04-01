import { Message } from './message';
import { EnterLeaveHookContext, TransitionHookContext } from './context';

export type EnterLeaveHookAction<T> = (
  context: EnterLeaveHookContext<T>
) => void | Message | Promise<void> | Promise<Message>;

export type TransitionHookAction<T> = (
  context: TransitionHookContext<T>
) => void | Message | Promise<void> | Promise<Message>;

export type TransitionSuccessHookListener<T> = (
  context: TransitionHookContext<T>
) => void | Promise<void>;

export type TransitionFailureHookListener<T> = (
  context: TransitionHookContext<T>,
  failedGuardId: string
) => void | Promise<void>;
