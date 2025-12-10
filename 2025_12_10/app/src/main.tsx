// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'
import Dashboard from "./dashboard.tsx";
import Home from "./home.tsx"
import Settings from "./settings.tsx";
import UsersHome from "./users/UsersHome.tsx";
import UserById from "./users/UserById.tsx";
import BestUsers from "./users/BestUsers.tsx";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />}/>
          <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<Home />} />
              <Route path="settings" element={<Settings />} />
          </Route>
          {/*<Route element={<AuthLayout />}>*/}
          {/*    <Route path="login" element={<Login />} />*/}
          {/*    <Route path="register" element={<Register />} />*/}
          {/*</Route>*/}

          <Route path="users">
              <Route index element={<UsersHome />} />
              <Route path=":id" element={<UserById />} />
              <Route path="best" element={<BestUsers />} />
          </Route>
      </Routes>
  </BrowserRouter>,
)
