import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "../App"
import { SingInPage } from "../modules/auth/SingInPage"
import { Users } from "../modules/admin/Users"
import { Inventory } from "../modules/admin/Inventory"
import { Graphics } from "../modules/admin/Graphics"
import { Profile } from "../modules/admin/Profile"
import { ExtraInfo } from "../modules/admin/ExtraInfo"
import { Extras } from "../modules/admin/Extras"
import { Ordens } from "../modules/admin/Ordens"
import { ProfileHead } from "../modules/admin/ProfileHead"
import { NavBar } from "../modules/admin/NavBar"
import { useEffect, useState } from "react"
import { AxiosClientJSON } from "../config/http-client/axios-client"
import { NotFound } from "../modules/NotFound"

export const Routers = ()=>{
    
useEffect(() => {
    const fetchData = async () => {
        try {
            
            const info = await AxiosClientJSON({
                url: '/api/employees/info',
                method: 'POST',
                data: {email : sessionStorage.getItem('email')}
            });
            // Aquí puedes hacer algo con la respuesta, como establecer el estado del componente
           
        } catch (error) {
            // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
            console.error('Error fetching data:', error);
        }
    };
    fetchData();

    // Llamar a fetchData cuando el componente se monta


}, []);

    return(
        <>
        <div className='flex justify-around'>
         
          <NavBar />
          <div className='mt-9 w-11/12 p-4 flex  overflow-hidden rounded-md border bg-white mb-3'>
            <Routes>
              <Route  path="/Users" element={<Users />} />
              <Route  path="/Inventory" element={<Inventory />} />
              <Route  path="/Graphics" element={<Graphics />} />
              <Route  path="/Users/Profile/:idUser" element={<Profile />} />
              <Route  path="/Extras" element={<Extras />} />
              <Route  path="/Extras/Info/:idExtra" element={<ExtraInfo />} />
              <Route  path="/Ordens" element={<Ordens />} />
              <Route path="*" element={<NotFound/>} />

            </Routes>
          </div>
  
        </div>
      </>
    )
}