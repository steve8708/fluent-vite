import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MyApps from './pages/MyApps'
import MyAccount from './pages/MyAccount'
import CardDemo from './pages/CardDemo'
import MyApps2 from './pages/MyApps2'
import { FluentThemeProvider } from './theme/ThemeProvider'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <FluentThemeProvider>
      <Routes>
        <Route path="/myapps" element={<MyApps />} />
        <Route path="/myapps2" element={<MyApps2 />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/card-demo" element={<CardDemo />} />
        <Route path="/" element={
          <>
            <div>
              <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
              <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </button>
              <p>
                Edit <code>src/App.jsx</code> and save to test HMR
              </p>
            </div>
            <p className="read-the-docs">
              Click on the Vite and React logos to learn more
            </p>
          </>
        } />
      </Routes>
    </FluentThemeProvider>
  )
}

export default App
