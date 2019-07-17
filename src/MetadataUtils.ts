import { Metadata, TypedMetadata } from 'Metadata';
import { WhenMetadata } from 'WhenMetadata';
import { ValidationRuleMetadata } from 'ValidationRuleMetadata';
import { ValueMetadata } from 'ValueMetadata';
import { FieldMetadata } from 'FieldMetadata';
import { IterableValueMetadata } from 'IterableValueMetadata';
import { UnaryMetadata } from 'UnaryMetadata';
import { BinaryMetadata } from 'BinaryMetadata';
import { NaryMetadata } from 'NaryMetadata';
import { SingleMappingMetadata } from 'SingleMappingMetadata';
import { MultipleMappingsMetadata } from 'MultipleMappingsMetadata';
import { ConditionalMappingMetadata } from 'ConditionalMappingMetadata';
import { FunctionMetadata } from 'FunctionMetadata';

export type TypedMetadata =
  | WhenMetadata
  | ValidationRuleMetadata
  | ValueMetadata
  | FieldMetadata
  | IterableValueMetadata
  | UnaryMetadata
  | BinaryMetadata
  | NaryMetadata
  | SingleMappingMetadata
  | MultipleMappingsMetadata
  | ConditionalMappingMetadata
  | FunctionMetadata;

export function process(metadata: Metadata) {
  const m = metadata as TypedMetadata;
  switch (m.type) {
    case 'WHEN':
      break;
    case 'VALIDATION':
      break;
    case 'VALUE':
      break;
    case 'FIELD':
      break;
    case 'ITERABLE_VALUE':
      break;
    case 'UNARY':
      break;
    case 'BINARY':
      break;
    case 'NARY':
      break;
    case 'SINGLE_MAPPING':
      break;
    case 'MULTIPLE_MAPPING':
      break;
    case 'CONDITIONAL_MAPPING':
      break;
    case 'FUNCTION':
      const body = m.body;
      console.log(body);
      break;
    default:
      break;
  }
}
