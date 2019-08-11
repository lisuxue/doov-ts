import { DslBuilder } from 'dsl/DslBuilder';
import { Context } from 'dsl/Context';

export interface MappingRule extends DslBuilder {
  execute<M extends object>(model: M, ctx?: Context): M;
}
