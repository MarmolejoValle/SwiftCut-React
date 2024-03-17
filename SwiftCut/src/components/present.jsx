import PropTypes from "prop-types";
import face from "../assets/img/face.jpeg"
import { FaAccusoft, FaAcquisitionsIncorporated, FaFacebook, FaInstagram, FaLinkedin, FaTwitch, FaTwitter } from "react-icons/fa";


export const Present = () =>{

    const name = "Alberto Marmolejo Valle";
    const character = {
        
    }
    return (
        <div style={{
            backgroundColor:'#ffffff',
            width:600,
            borderRadius:10,overflow:"hidden"
        }}>

            <div  style={{
            display:"flex",
            padding:10
                 }}>
                <img src={face} style={{
            backgroundColor:'#ffffff65',
            width:150,
            height:200,
            borderRadius:5,
            flex:1
                 }}></img>

<div style={{
                color:'#000',
                margin:10,
                flex:4
                
                }}>
                    <div style={{
                                        textAlign:"center"
                                }} >
                    <p style={{}}>Alberto Marmolejo Valle</p>
                    <p>Desarrollo de Software</p>
                    </div>

                    <div >
                        <table style={{
                                        width:'100%'
                                }}>
                            <tbody style={{
                                        textAlign:"start"
                                }} >
                            <tr style={{
                                        display:"flex",
                                        justifyContent:"space-between"
                                }}>
                                <th scope="row" style={{
                                    textAlign:"justify"
                                    }}>Años</th>
                                <td>19</td>
                            </tr>
                            <tr style={{
                                        display:"flex",
                                        justifyContent:"space-between"
                                }}>
                                <th scope="row" style={{
                                    textAlign:"justify"
                                    }}>Direccion</th>
                                <td>Mexico Morelos</td>
                            </tr>
                            <tr style={{
                                        display:"flex",
                                        justifyContent:"space-between"
                                }}>
                                <th scope="row" style={{
                                    textAlign:"justify"
                                    }}>Correo</th>
                                <td>marmolejov60@gmail.com</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
            </div>
            </div>
            
            <div style={{
                            backgroundColor:'#22b90edc',
                            padding:10,
                            display:"flex",
                            justifyContent:"space-evenly"
                        }} >
                            <FaFacebook/>
                            <FaTwitter/>
                            <FaInstagram/>
                            <FaLinkedin/>
            </div>
            
        </div>
    );
}

