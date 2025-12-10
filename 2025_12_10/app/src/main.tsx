// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'
import Dashboard from "./dashboard.tsx";
import Home from "./home.tsx"
import Settings from "./settings.tsx";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />}/>
          <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<Home />} />
              <Route path="settings" element={<Settings />} />
          </Route>
      </Routes>
  </BrowserRouter>,
)
