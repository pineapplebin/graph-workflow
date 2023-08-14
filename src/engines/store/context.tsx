import { useContext, createContext } from 'react'
import { useStore, type StoreApi } from 'zustand'
import { compare } from './utils'
import type { FlowDataState } from './types'

export const IndividualFlowContext = createContext<StoreApi<FlowDataState>>(
  null as any,
)

/**
 * 获取当前 flow data 的内容
 */
export function useGetFlow<U>(selector: (state: FlowDataState) => U) {
  const store = useContext(IndividualFlowContext)
  return useStore(store, selector, compare)
}

export const FlowStoreProvider = IndividualFlowContext.Provider
