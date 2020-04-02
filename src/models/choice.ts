import { Guard } from './guards';

export interface Choice<T> {
  target: string;
  guard?: Guard<T>;
}
