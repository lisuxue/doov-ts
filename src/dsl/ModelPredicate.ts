import { BinaryPredicate } from './BinaryPredicate';
import { FieldModel } from 'FieldModel';
import { Context } from './lang/Context';

export type ModelPredicate = BinaryPredicate<FieldModel, Context>;
