import { DslBuilder } from '../DslBuilder';
import { Context } from '../Context';

export interface MappingRule extends DslBuilder {
  execute<M extends object>(input: M, ctx?: Context): M;
  executeOn<M extends object, O extends object>(input: M, output: O, ctx?: Context): O;
}
