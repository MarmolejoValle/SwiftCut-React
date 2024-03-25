
import React from 'react'
import ReactDOM from 'react-dom/client'
import { SingInPage } from './modules/auth/SingInPage.jsx'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavBar } from './modules/admin/NavBar.jsx'
import { Inventory } from './modules/admin/Inventory.jsx'
import { Users } from './modules/admin/Users.jsx'
import { Graphics } from './modules/admin/Graphics.jsx'
import { ProfileHead } from './modules/admin/ProfileHead.jsx'
import { Profile } from './modules/admin/Profile.jsx'
import { Extras } from './modules/admin/Extras.jsx'
import { ExtraInfo } from './modules/admin/ExtraInfo.jsx'
import { Ordens } from './modules/admin/Ordens.jsx'

import { Label } from 'flowbite-react'

const App = () => {

  return (
    <>
      <div className='flex'>
        <ProfileHead />
        <NavBar />
        <div className='mt-5 w-full p-4 overflow-hidden'>
          <Routes >
            <Route exact path="/SingInPage" element={<SingInPage />} />
            <Route exact path="/Users" element={<Users />} />
            <Route exact path="/Inventory" element={<Inventory />} />
            <Route exact path="/Graphics" element={<Graphics />} />
            <Route exact path="/Users/Profile/:idUser" element={<Profile />} />
            <Route exact path="/Extras" element={<Extras />} />
            <Route exact path="/Extras/Info" element={<ExtraInfo />} />
            <Route exact path="/Ordens" element={<Ordens />} />
          </Routes>
        </div>

      </div>
    </>

  )
}

export default App
