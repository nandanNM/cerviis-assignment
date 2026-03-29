import Dashboard from './Dashboard'
import { ToastProvider } from './components/ui/use-toast'
import './index.css'

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-zinc-50 flex flex-col pt-8">
        <Dashboard />
      </div>
    </ToastProvider>
  )
}

export default App
