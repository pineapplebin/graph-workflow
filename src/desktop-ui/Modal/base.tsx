import type { FC, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export const ModalBase: FC<PropsWithChildren> = ({ children }) => {
  return createPortal(children, document.body)
}

export const ModalMask: FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div className="fixed inset-0 bg-black opacity-50" onClick={onClick}></div>
  )
}
