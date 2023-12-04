import type { ReactNode } from 'react'

export interface PropsWithModalRelate {
  show?: boolean
  onClose?: () => void
  onChangeShow?: (show: boolean) => void
}

export type WithBuild<P extends PropsWithModalRelate> = {
  build: (props: Omit<P, keyof PropsWithModalRelate>) => {
    toggle: () => void
    modal: ReactNode
  }
}
