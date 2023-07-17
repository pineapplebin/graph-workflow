import {
  PropsWithChildren,
  useMemo,
  Children,
  ReactElement,
  isValidElement,
} from 'react'

/**
 * 分割 children，限定只能接受 2 个
 */
export function useSplitChildren(
  children: PropsWithChildren['children'],
): [ReactElement, ReactElement] | null {
  return useMemo(() => {
    const childrenArray = Children.toArray(children).filter<ReactElement>(
      (child): child is ReactElement => !!child && isValidElement(child),
    )
    if (childrenArray.length !== 2) {
      return null
    }
    return [childrenArray[0], childrenArray[1]]
  }, [children])
}
