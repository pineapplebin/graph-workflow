export type NotUndefined<T> = T extends undefined ? never : T

export interface PropsWithStyling {
  className?: string
  style?: React.CSSProperties
}
