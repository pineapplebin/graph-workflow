import { forwardRef } from 'react'
import { Handle, type HandleProps, Position } from 'reactflow'
import cx from 'classnames'

type SourceHandleProps = Omit<HandleProps, 'type' | 'position' | 'style'> & {}

export const SourceHandle = forwardRef<HTMLDivElement, SourceHandleProps>(
  ({ ...rest }, ref) => {
    return (
      <Handle
        ref={ref}
        type="source"
        position={Position.Right}
        className={cx('h-4 w-4 bg-slate-500')}
        {...rest}
      />
    )
  },
)

export const TargetHandle = forwardRef<HTMLDivElement, SourceHandleProps>(
  ({ ...rest }, ref) => {
    return (
      <Handle
        ref={ref}
        type="target"
        position={Position.Left}
        className={cx('h-4 w-4 bg-slate-500')}
        {...rest}
      />
    )
  },
)
