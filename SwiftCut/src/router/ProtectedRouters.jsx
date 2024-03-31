import { Navigate } from "react-router-dom";

export const ProtectedRouters =({children})=>{
    const token = sessionStorage.getItem('token') || null;

    if(token) return children ;
    else return <Navigate to={"/"}/> 

}