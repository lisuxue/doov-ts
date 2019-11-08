import { DslBuilder } from '../DslBuilder';
import { Context } from '../Context';
import { Result } from '../Result';

export interface ValidationRule extends DslBuilder {
  execute<M extends object>(model: M, ctx?: Context): Result;
}
