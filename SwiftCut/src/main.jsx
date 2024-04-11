import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import App from './App'
import AuthContext from './config/context/auth-context'
import { SingInPage } from './modules/auth/SingInPage'
import { Routers } from './router/router'
import { ProtectedRouters } from './router/ProtectedRouters'
import { GiFoundryBucket } from 'react-icons/gi'
import { NotFound } from './modules/NotFound'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter basename="/"  future={{ v7_startTransition: true }}>
      <Routes >
        
        <Route  path="/" element={<SingInPage />} />
        <Route  path="/*" element={
          <ProtectedRouters>
            <Routers/>
          </ProtectedRouters>
        } />
       <Route path="*" element={<NotFound/>} />

      </Routes>
      
    </BrowserRouter>

  </React.StrictMode>

)
