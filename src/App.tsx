import { Column } from '@/desktop-ui'
import AppHeader from './components/AppHeader'
import MainPage from './pages/main'

import { context } from './global-context'

const GlobalContextProvider = context.Provider

function App() {
  return (
    <GlobalContextProvider value={{}}>
      <Column>
        <AppHeader />
        <MainPage />
      </Column>
    </GlobalContextProvider>
  )
}

export default App
