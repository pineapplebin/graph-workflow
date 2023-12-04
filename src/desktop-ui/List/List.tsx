import type { FC, PropsWithChildren } from 'react'
import Container from '../layouts/Container'
import Column from '../layouts/Column'
import type { PropsWithStyling } from '../common-types'
import cx from 'classnames'

export interface ListProps extends PropsWithChildren, PropsWithStyling {}

const List: FC<ListProps> = ({ className, style, children }) => {
  return (
    <Container
      className={cx(
        'h-full w-full rounded-md bg-slate-200 p-3 focus:outline-hl focus-visible:outline-hl',
        className,
      )}
      style={style}
      scrollable
      tabIndex={0}
    >
      <Column>{children}</Column>
    </Container>
  )
}

export default List
