export type NotUndefined<T> = T extends undefined ? never : T

export type ArrayItem<A> = A extends Array<infer T> ? T : never
