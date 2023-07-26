import { FC, PropsWithChildren, useMemo } from 'react'
import { Node } from 'reactflow'
import { Button, Row, PropsWithStyling } from '@/desktop-ui'
import { NodeContext, NodeContextValue } from './NodeContext'

import cx from 'classnames'
import styles from './NodePanel.module.css'

export interface NodePanelProps extends PropsWithChildren, PropsWithStyling {
  type: string
  node: Node | null
  nodeId: string | null
  running?: boolean
  error?: boolean
}

/**
 * 节点的面板
 * 可控制缩放
 */
const NodePanel: FC<NodePanelProps> = ({
  className,
  style,
  children,
  type,
  node,
  nodeId,
  running,
  error,
}) => {
  const contextValue = useMemo<NodeContextValue>(() => {
    return { node, nodeId }
  }, [node])

  const handleStartRun = () => {}

  return (
    <NodeContext.Provider value={contextValue}>
      <PanelControl selected={node?.selected} onStartRun={handleStartRun} />
      <div
        className={cx(
          className,
          styles.NodePanel,
          running && styles.Running,
          error && styles.Error,
          node?.selected && styles.Selected,
        )}
        style={style}
      >
        <div className={styles.Header}>{type}</div>
        <div className={styles.Content}>{children}</div>
      </div>
    </NodeContext.Provider>
  )
}

interface PanelControlProps {
  selected?: boolean
  onStartRun?: () => void
}

const PanelControl: FC<PanelControlProps> = ({ selected, onStartRun }) => {
  return (
    <div
      className={cx(styles.PanelControl, selected && styles.PanelControlActive)}
    >
      <Row>
        <Button onClick={onStartRun}>Run</Button>
      </Row>
    </div>
  )
}

export default NodePanel
