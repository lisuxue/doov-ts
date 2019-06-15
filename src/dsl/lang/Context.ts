// import { FieldId } from 'FieldId';
// import { Metadata } from '../meta/Metadata';

/**
 * Interface for the execution context.
 * <p>
 * You have for example node values (see {@link #getEvalValue(FieldId)}), failed nodes (see {@link #getEvalFalse()}), etc.
 */
export interface Context {
  // /**
  //  * Returns the root node of the syntax tree.
  //  *
  //  * @return the metadata
  //  */
  // getRootMetadata: () => Metadata;
  //
  // /**
  //  * Returns true if the evaluation short-circuit is activated, which will evaluate logical expression like java.
  //  * Activated by default.
  //  *
  //  * @return true if activated
  //  */
  // isShortCircuit: () => boolean;
  //
  // /**
  //  * Adds the given node that evaluates to false.
  //  *
  //  * @param metadata the metadata
  //  */
  // addEvalFalse: (metadata: Metadata) => void;
  //
  // /**
  //  * Adds the given node that evaluates to true.
  //  *
  //  * @param metadata the metadata
  //  */
  // addEvalTrue: (metadata: Metadata) => void;
  //
  // /**
  //  * Adds the given evaluation value for the given field id.
  //  *
  //  * @param id    the id
  //  * @param value the value
  //  */
  // addEvalValue: (id: FieldId, value: Object) => void;
  //
  // /**
  //  * Adds the set value for the given field id.
  //  *
  //  * @param id    the id
  //  * @param value the value
  //  */
  // addSetValue: (id: FieldId, value: Object) => void;
  //
  // /**
  //  * Return the evaluation value for this field id.
  //  *
  //  * @param id the id
  //  * @return the value
  //  */
  // getEvalValue: (id: FieldId) => Object;
  //
  // /**
  //  * Returns true if the given node evaluation is true.
  //  *
  //  * @param metadata the metadata
  //  * @return true if eval is true
  //  */
  // isEvalTrue: (metadata: Metadata) => boolean;
  //
  // /**
  //  * Returns true if the given node evaluation is false.
  //  *
  //  * @param metadata the metadata
  //  * @return true if eval is false
  //  */
  // isEvalFalse: (metadata: Metadata) => boolean;
  //
  // /**
  //  * Returns the list of nodes that evaluates to true.
  //  *
  //  * @return the eval list
  //  */
  // getEvalTrue: () => Metadata[];
  //
  // /**
  //  * Returns the list of nodes that evaluates to false.
  //  *
  //  * @return the eval list
  //  */
  // getEvalFalse: () => Metadata[];
}
