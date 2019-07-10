import { DslBuilder } from './DslBuilder';
import { Context } from 'Context';

export interface MappingRule extends DslBuilder {
  execute<M extends object>(model: M, ctx?: Context): M;
}
