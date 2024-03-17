import React from 'react'
import ReactDOM from 'react-dom/client'
import { SingInPage } from './modules/auth/SingInPage.jsx'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavBar } from './modules/admin/NavBar.jsx'
/*
const h1 = 
React.createElement('div',null,
React.createElement('ul',null,
React.createElement('li',null,"item 1 ")));
*/
let userConst = {
  name: "Alberto",
  lastname: "Marmolejo",
  age: 20
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<NavBar />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>

)
