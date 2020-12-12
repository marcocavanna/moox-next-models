export namespace DtoType {

  export type Nullable<T> = T | null | undefined;

  export type Array<T> = Nullable<T>[];

}
