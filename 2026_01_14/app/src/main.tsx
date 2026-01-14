import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.scss'
import App from './App.tsx'
import Posts from './components/Posts/Posts.tsx'
import Categories from './components/Categories/Categories.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<App />}/>
              <Route path='/posts' element={<Posts/>} />
              <Route path='/categories' element={<Categories/>} />
          </Routes>
      </BrowserRouter>
  </StrictMode>
)
