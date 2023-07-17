import type { PropsWithChildren, FC } from 'react'
import type { PropsWithStyling } from '../../common-types'
import Container from '../Container'

import cx from 'classnames'
import styles from './Panel.module.css'

export interface PanelProps extends PropsWithChildren, PropsWithStyling {
  initialSize?: number | string
  minSize?: number
  maxSize?: number
}

const Panel: FC<PanelProps> = ({ className, style, children }) => {
  return (
    <Container className={cx(className, styles.Panel)} style={style} flexGrow>
      {children}
    </Container>
  )
}

export default Panel
