import { Metadata } from 'dsl/meta/Metadata';
import { WhenMetadata } from 'dsl/meta/WhenMetadata';
import { ValidationRuleMetadata } from 'dsl/meta/ValidationRuleMetadata';
import { ValueMetadata } from 'dsl/meta/ValueMetadata';
import { FieldMetadata } from 'dsl/meta/FieldMetadata';
import { UnaryMetadata } from 'dsl/meta/UnaryMetadata';
import { BinaryMetadata } from 'dsl/meta/BinaryMetadata';
import { NaryMetadata } from 'dsl/meta/NaryMetadata';
import { SingleMappingMetadata } from 'dsl/meta/SingleMappingMetadata';
import { MultipleMappingsMetadata } from 'dsl/meta/MultipleMappingsMetadata';
import { ConditionalMappingMetadata } from 'dsl/meta/ConditionalMappingMetadata';
import { FunctionMetadata } from 'dsl/meta/FunctionMetadata';
import { IterableMetadata } from 'dsl/meta/IterableMetadata';

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
