import { useContext, createContext } from 'react'

export interface GlobalContext {}

export const context = createContext<GlobalContext>({} as GlobalContext)

export function useGlobalContext() {
  return useContext(context)
}
