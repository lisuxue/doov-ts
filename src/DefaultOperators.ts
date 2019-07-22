import { Operator } from 'Operator';

export const SINGLE_MAPPING: Operator = { readable: 'single_mapping' };
export const WHEN: Operator = { readable: 'when' };
export const VALIDATE: Operator = { readable: 'validate' };
export const NOT: Operator = { readable: 'not' };
export const AND: Operator = { readable: 'and' };
export const OR: Operator = { readable: 'or' };
export const THEN: Operator = { readable: 'then' };
export const ELSE: Operator = { readable: 'else' };
export const FUNCTION: Operator = { readable: 'function' };
export const IS_NULL: Operator = { readable: 'is null' };
export const IS_NOT_NULL: Operator = { readable: 'is not null' };
export const EQ: Operator = { readable: '=' };
export const NOT_EQ: Operator = { readable: '!=' };
export const MATCH_ALL: Operator = { readable: 'match all' };
export const NONE_MATCH: Operator = { readable: 'none match' };
export const MATCH_ANY: Operator = { readable: 'match any' };
export const CONTAINS: Operator = { readable: 'contains' };
export const MATCHES: Operator = { readable: 'matches' };
export const STARTS_WITH: Operator = { readable: 'starts with' };
export const ENDS_WITH: Operator = { readable: 'ends with' };
export const LENGTH: Operator = { readable: 'length' };
export const AS_INT: Operator = { readable: 'as integer' };
export const TRIM: Operator = { readable: 'trimmed' };
export const UPPER_CASE: Operator = { readable: 'upper case' };
export const LOWER_CASE: Operator = { readable: 'lower case' };
export const CONCAT: Operator = { readable: 'concat' };
export const REPLACE_ALL: Operator = { readable: 'replace all' };
export const SUB_STRING: Operator = { readable: 'sub string' };
export const MIN: Operator = { readable: 'min' };
export const MAX: Operator = { readable: 'max' };
export const SUM: Operator = { readable: 'sum' };
export const LESSER_THAN: Operator = { readable: '<' };
export const LESSER_OR_EQUALS: Operator = { readable: '<=' };
export const GREATER_THAN: Operator = { readable: '>' };
export const GREATER_OR_EQUALS: Operator = { readable: '>=' };
export const PLUS: Operator = { readable: '+' };
export const MINUS: Operator = { readable: '-' };
export const TIMES: Operator = { readable: '*' };
export const TO: Operator = { readable: '->' };