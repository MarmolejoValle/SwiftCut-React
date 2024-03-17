export const Card = ({data}) =>{

    const name = "Alberto Marmolejo Valle"
    return (
        <div style={{    width:"40%",
        backgroundColor:'#fff',
        borderRadius:10,
        color:'#000',
        overflow:"hidden",
        margin:20
        }}>
        <div style={{
           
           
            padding:10,
          
        }}>
             <h3 style={{textAlign:"center"}}>Empresa {data.name} </h3>
             <div style={{fontSize:12}}>
                <p><span style={{fontSize:16 , color:"red"}}>Tipo de empleo</span> {data.type} </p>
                <p><span style={{fontSize:16 , color:"red"}}>Años</span> {data.year} </p>
                <p><span style={{fontSize:16 , color:"red"}}>Numero de referencia</span> {data.ref} </p>
                <p><span style={{fontSize:16 , color:"red"}}>Lugar</span> {data.place} </p>
             </div>
        </div>
        <div style={{padding:10,backgroundColor:"#22b90edc"}}></div>
        </div>
        
    );
}
