/**
 * Id representing a value of the  {@code FieldModel}
 */
export interface FieldId {
  /**
   * Returns the field unique identifier
   *
   * @return the name
   */
  code: () => string;

  /**
   * Returns the field position, when referencing an element in a {@code Collection}.
   *
   * @return the position, defaults to -1
   */
  position: () => number;
}
