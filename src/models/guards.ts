import { LightGuardContext, FullGuardContext } from './context';

export type GuardType = 'light' | 'full';

interface BaseGuard {
  type: GuardType;
  id: string;
}

export interface LightGuard<T> extends BaseGuard {
  type: 'light';
  evaluate: GuardEvaluation<LightGuardContext<T>>;
}

export interface FullGuard<T> extends BaseGuard {
  type: 'full';
  evaluate: GuardEvaluation<FullGuardContext<T>>;
}

export type Guard<T> = LightGuard<T> | FullGuard<T>;

export interface GuardEvaluationResult {
  success: boolean;
  reason?: string;
}

export type GuardEvaluation<TContext> = (
  context: TContext
) => GuardEvaluationResult | Promise<GuardEvaluationResult>;
