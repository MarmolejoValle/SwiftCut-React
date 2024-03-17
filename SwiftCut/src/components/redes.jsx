import PropTypes from "prop-types";
import { Present } from "./present";
import Chart from "react-google-charts";
import { useState } from "react";
import { Card } from "./card";

export const Redes = () =>{

    const [skills,skillsSet] = useState([
        ["Habilidades","Lenguajes"],
        ["React" , 35],
        ["SpringFramework" , 49],
        ["React Native" , 10],
        ["Servelet" , 25]
    ]); 

    const name = "Alberto Marmolejo Valle";
    const character = {
        
    }
    const backImg = 'https://images.unsplash.com/photo-1659696928555-11a2769a4644?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=2000';
    return (
        <div>

<div style={{
            backgroundImage:`url(${backImg})`,
            height:300,
            width:'100vw',
            backgroundRepeat:"no-repeat",
            backgroundPosition:'cover',
            display:"flex",
            justifyContent:"center",
            alignItems:"flex-end",
        }}>
            <div style={{transform:'translateY(120px)',overflow:"hidden"}}>
             <Present/>
            </div>
               

        </div>

        <div style={{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center",
                    alignItems:"center",
                    padding:10,
                    borderRadius:20,
                    marginTop:150

                }}>
                    <h2>Mejores Skills</h2>
                <Chart 
                chartType="PieChart"
                data={skills}
                options={{
                backgroundColor:"#FFF"
                
                }}
                width={"100%"}
                height={"100%"}

                
                />
                </div>
      
                <div style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    width:"100%"
                }}
                >
                <Card data={{
                    name:"Google",
                    type:"Front-end",
                    year:2,
                    ref:213413435,
                    place:"EU Cansas"
                }} />
                <Card data={{
                    name:"Facebook",
                    type:"back-end",
                    year:1,
                    ref:213413435,
                    place:"Mexico"
                }} />
                <Card data={{
                    name:"Utez",
                    type:"Front-end",
                    year:2,
                    ref:213413435,
                    place:"Mexico"
                }} />

                </div>
            
            
        </div>
    );
}

