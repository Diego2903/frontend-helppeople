import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { AppRouter } from './routes/AppRouter'
import { AppTheme } from './theme'

export const App = () => {
  return (
    <BrowserRouter>
      <AppTheme>
        <Navbar />
        <AppRouter />
      </AppTheme>
    </BrowserRouter>
  )
}


