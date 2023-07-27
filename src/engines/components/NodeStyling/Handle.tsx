import { forwardRef } from 'react'
import { Handle, type HandleProps, Position } from 'reactflow'

type SourceHandleProps = Omit<HandleProps, 'type' | 'position' | 'style'> & {}

const HANDLE_STYLE: React.CSSProperties = {
  width: '1rem',
  height: '1rem',
}

export const SourceHandle = forwardRef<HTMLDivElement, SourceHandleProps>(
  ({ ...rest }, ref) => {
    return (
      <Handle
        ref={ref}
        type="source"
        position={Position.Right}
        style={HANDLE_STYLE}
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
        style={HANDLE_STYLE}
        {...rest}
      />
    )
  },
)
