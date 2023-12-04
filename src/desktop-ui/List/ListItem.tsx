import type { FC, PropsWithChildren } from 'react'
import Container from '../layouts/Container'
import type { PropsWithOnClick, PropsWithStyling } from '../common-types'
import cx from 'classnames'

export interface ListItemProps
  extends PropsWithChildren,
    PropsWithStyling,
    PropsWithOnClick {}

const ListItem: FC<ListItemProps> = ({
  className,
  style,
  children,
  onClick,
}) => {
  return (
    <Container
      className={cx(
        'cursor-pointer rounded-md px-4 py-2 duration-200 ease-in-out transition-bg',
        className,
      )}
      style={style}
      onClick={onClick}
    >
      {children}
    </Container>
  )
}

export default ListItem
