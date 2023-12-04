import { type FC, type PropsWithChildren } from 'react'
import { useToggle } from 'ahooks'
import { ModalBase, ModalMask } from './base'
import Container from '../layouts/Container'
import { usePropsWithDefaults } from '../hooks'
import type { PropsWithModalRelate, WithBuild } from './types'

export interface PopupModalProps
  extends PropsWithChildren,
    PropsWithModalRelate {
  width?: string | number
  height?: string | number
}

const PopupModal: FC<PopupModalProps> & WithBuild<PopupModalProps> = ({
  show,
  children,
  onChangeShow,
  onClose,
  ...rest
}) => {
  const { width, height } = usePropsWithDefaults(rest, {
    width: '60vw',
    height: '40vh',
  })

  if (!show) {
    return null
  }

  return (
    <ModalBase>
      <ModalMask onClick={onClose}></ModalMask>
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Container style={{ width, height }}>{children}</Container>
      </div>
    </ModalBase>
  )
}

PopupModal.build = (props) => {
  const [show, { set, setLeft, toggle }] = useToggle(false)

  return {
    toggle,
    modal: (
      <PopupModal {...props} show={show} onClose={setLeft} onChangeShow={set} />
    ),
  }
}

export default PopupModal
