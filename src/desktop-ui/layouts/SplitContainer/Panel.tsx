import type { PropsWithChildren, FC } from 'react'
import type { PropsWithStyling } from '../../common-types'
import Container from '../Container'

import cx from 'classnames'

export interface PanelProps extends PropsWithChildren, PropsWithStyling {
  initialSize?: number | string
  minSize?: number
  maxSize?: number
}

const Panel: FC<PanelProps> = ({ className, style, children }) => {
  return (
    <Container
      className={cx('h-full w-full flex-grow overflow-hidden', className)}
      style={style}
    >
      {children}
    </Container>
  )
}

export default Panel
