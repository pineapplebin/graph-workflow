import { FC, useContext, useRef } from 'react'
import { NodeContext } from './NodeContext'

import styles from './NodeVariable.module.css'
import { Handle, Position, useUpdateNodeInternals } from 'reactflow'

export interface NodeVariableProps {
  label: string
}

const NodeVariable: FC<NodeVariableProps> = ({}) => {
  const {} = useContext(NodeContext)
  const useUpdateInternal = useUpdateNodeInternals()
  const handleRef = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.NodeVariable}>
      <Handle ref={handleRef} position={Position.Left} type="target" />
    </div>
  )
}

export default NodeVariable
