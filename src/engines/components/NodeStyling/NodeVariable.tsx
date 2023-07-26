import {
  Children,
  PropsWithChildren,
  cloneElement,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { useUpdateNodeInternals } from 'reactflow'
import { NodeContext } from './NodeContext'
import { TargetHandle } from './Handle'
import { Row, SizedBox, Container } from '@/desktop-ui'
import { Typing } from './Typing'

import styles from './NodeVariable.module.css'

export interface NodeVariableProps<T> extends PropsWithChildren {
  name: string
  label: string
  typing: string
  value?: T
  onChange?: (value: any) => void
}

function NodeVariable<T>({
  name,
  label,
  typing,
  children,
  value,
  onChange,
}: NodeVariableProps<T>) {
  const { nodeId, node } = useContext(NodeContext)
  const updateNodeInternals = useUpdateNodeInternals()
  const handleRef = useRef<HTMLDivElement>(null)

  const fieldId = useMemo(() => {
    return `${nodeId}_${name}`
  }, [nodeId, name])

  useEffect(() => {
    if (handleRef.current && nodeId) {
      handleRef.current.style.left = '-0.5rem'
      updateNodeInternals(nodeId)
    }
  }, [nodeId, updateNodeInternals])

  const fieldControl = useInjectChild(
    { id: fieldId, value, onChange },
    children,
  )

  return (
    <div className={styles.NodeVariable}>
      <div className={styles.Label}>
        <TargetHandle ref={handleRef} id={fieldId} />
        <Row>
          <label htmlFor={fieldId}>{label}</label>
          <SizedBox width="0.5rem" />
          <Typing typing={typing} missing={!value && !node?.data.output} />
        </Row>
      </div>
      <Container className={styles.InputControl}>{fieldControl}</Container>
    </div>
  )
}

function useInjectChild<T>(
  fieldProps: Pick<NodeVariableProps<T>, 'value' | 'onChange'> & {
    id?: string
  },
  children: PropsWithChildren['children'],
) {
  return useMemo(() => {
    if (!children) {
      return null
    }
    const child = Children.only(children)
    if (!child || typeof child !== 'object' || !isValidElement(child)) {
      return child
    }

    const newChild = cloneElement(child, { ...fieldProps })
    return newChild
  }, [children, fieldProps.value, fieldProps.onChange])
}

export default NodeVariable
