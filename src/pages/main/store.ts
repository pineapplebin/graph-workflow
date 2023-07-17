import { PersistentNode } from '@/engines/structs/types'
import { create } from 'zustand'

interface MainPageStore {
  nodes: PersistentNode[]
  initialize: () => void
}

export const useMainPageStore = create<MainPageStore>((set) => ({
  nodes: [],
  initialize: () => {
    set((state) => {
      return {
        ...state,
        nodes: [
          {
            name: 'ChooseFile',
            type: 'ChooseFile',
            props: {},
          },
        ],
      }
    })
  },
}))
