import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MyApps from './pages/MyApps'
import MyAccount from './pages/MyAccount'
import CardDemo from './pages/CardDemo'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/myapps" style={{ marginRight: '1rem' }}>My Apps</Link>
        <Link to="/myaccount" style={{ marginRight: '1rem' }}>My Account</Link>
        <Link to="/card-demo" style={{ marginRight: '1rem' }}>Card Demo</Link>
      </nav>

      <Routes>
        <Route path="/myapps" element={<MyApps />} />
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
    </>
  )
}

export default App
