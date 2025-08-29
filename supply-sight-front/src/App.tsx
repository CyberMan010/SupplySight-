import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/Button'
import { Card } from './components/ui/Card'
import { StatusPill } from './components/ui/StatusPill'
import { ProductsTable } from './components/dashboard/ProductsTable'
import { ProductDrawer } from './components/dashboard/Drawer'
import type { ProductDrawerProps } from './types'
import SupplySightDashboard from './components/Dashboard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <SupplySightDashboard />
    </>
  )
}

export default App
