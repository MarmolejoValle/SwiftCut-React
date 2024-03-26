
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

import { useEffect, useState } from "react";
import { AxiosClientJSON } from './config/http-client/axios-client.js'

const App = () => {

const [user, setUser] = useState([]);
useEffect(() => {
    const fetchData = async () => {
        try {
            
            const info = await AxiosClientJSON({
                url: '/api/employees/info',
                method: 'POST',
                data: {email : sessionStorage.getItem('email')}
            });
            // Aquí puedes hacer algo con la respuesta, como establecer el estado del componente
            setUser(info.data);
           
        } catch (error) {
            // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
            console.error('Error fetching data:', error);
        }
    };
    fetchData();

    // Llamar a fetchData cuando el componente se monta


}, []);

  return (
    <>
      <div className='flex'>
        <ProfileHead user={user}/>
        <NavBar />
        <div className='mt-5 w-full p-4 overflow-hidden'>
          <Routes >
            <Route exact path="/SingInPage" element={<SingInPage />} />
            <Route exact path="/Users" element={<Users />} />
            <Route exact path="/Inventory" element={<Inventory />} />
            <Route exact path="/Graphics" element={<Graphics />} />
            <Route exact path="/Users/Profile/:idUser" element={<Profile />} />
            <Route exact path="/Extras" element={<Extras />} />
            <Route exact path="/Extras/Info/:idExtra" element={<ExtraInfo />} />
            <Route exact path="/Ordens" element={<Ordens />} />
          </Routes>
        </div>

      </div>
    </>

  )
}

export default App
