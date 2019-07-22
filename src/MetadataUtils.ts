import { Metadata } from 'Metadata';
import { WhenMetadata } from 'WhenMetadata';
import { ValidationRuleMetadata } from 'ValidationRuleMetadata';
import { ValueMetadata } from 'ValueMetadata';
import { FieldMetadata } from 'FieldMetadata';
import { UnaryMetadata } from 'UnaryMetadata';
import { BinaryMetadata } from 'BinaryMetadata';
import { NaryMetadata } from 'NaryMetadata';
import { SingleMappingMetadata } from 'SingleMappingMetadata';
import { MultipleMappingsMetadata } from 'MultipleMappingsMetadata';
import { ConditionalMappingMetadata } from 'ConditionalMappingMetadata';
import { FunctionMetadata } from 'FunctionMetadata';
import { IterableMetadata } from 'IterableMetadata';

export type TypedMetadata =
  | WhenMetadata
  | ValidationRuleMetadata
  | ValueMetadata
  | FieldMetadata
  | IterableMetadata
  | UnaryMetadata
  | BinaryMetadata
  | NaryMetadata
  | SingleMappingMetadata
  | MultipleMappingsMetadata
  | ConditionalMappingMetadata
  | FunctionMetadata;

export function fieldsOf(metadata: Metadata): (string | number)[][] {
  const m = metadata as TypedMetadata;
  if (m.type == 'FIELD') {
    return [m.path];
  } else if (metadata.children) {
    return metadata.children().flatMap(value => fieldsOf(value));
  } else {
    return [];
  }
}
