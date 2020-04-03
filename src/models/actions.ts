import { Message } from './message';
import { EnterLeaveHookContext, TransitionHookContext, AlterableBaseContext } from './context';

export type EnterLeaveHookAction<T> = (
  context: EnterLeaveHookContext<T> & AlterableBaseContext<T>
) => void | Message | Promise<void> | Promise<Message>;

export type TransitionHookAction<T> = (
  context: TransitionHookContext<T> & AlterableBaseContext<T>
) => void | Message | Promise<void> | Promise<Message>;

export type EnterLeaveListener<T> = (context: EnterLeaveHookContext<T>) => void | Promise<void>;

export type TransitionSuccessHookListener<T> = (context: TransitionHookContext<T>) => void | Promise<void>;

export type TransitionFailureHookListener<T> = (
  context: TransitionHookContext<T>,
  failedGuardId: string
) => void | Promise<void>;
