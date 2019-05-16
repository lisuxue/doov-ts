export interface Setter<T, C, V> {
  (obj: T, val: V, ctx?: C): Promise<T>;
}
