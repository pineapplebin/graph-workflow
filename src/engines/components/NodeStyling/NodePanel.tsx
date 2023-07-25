import { PropsWithStyling } from '@/desktop-ui'
import { FC, PropsWithChildren, useMemo } from 'react'
import { Node } from 'reactflow'
import { NodeContext, NodeContextValue } from './NodeContext'

import cx from 'classnames'
import styles from './index.module.css'

export interface NodePanelProps extends PropsWithChildren, PropsWithStyling {
  node: Node | null
}

/**
 * 节点的面板
 * 可控制缩放
 */
const NodePanel: FC<NodePanelProps> = ({
  className,
  style,
  children,
  node,
}) => {
  const contextValue = useMemo<NodeContextValue>(() => {
    return { node }
  }, [node])

  return (
    <NodeContext.Provider value={contextValue}>
      <div className={cx(styles.NodePanel, className)} style={style}>
        {children}
      </div>
    </NodeContext.Provider>
  )
}

export default NodePanel
