import PropTypes from "prop-types";

export const HelloWord = () =>{

    const name = "Alberto Marmolejo Valle"
    return (
        <div >
            <h1>Hola mi nombre es {name} </h1>  
        </div>
    );
}

//Compomenete  con parametros utilizables 
export const PersonaInfo = ({user,id , adress}) =>{

    ;


    return (
        <>
            <h1>Datos de la persona</h1>
            <div>
                <h2>Nombre : {user.name} </h2>
                <h2>Apellido : {user.lastname} </h2>
                <h2>Edad : {user.age} </h2>
                <h2>Dirrecion : {adress} </h2>
                <h2>Id : {id} </h2>

            </div>
        </>
    );
}

//Una validacion de el dato que te debe de llegar 
PersonaInfo.prototype = {
    user:PropTypes.object.isRequired,
    id:PropTypes.number.isRequired,
    adress:PropTypes.string.isRequired

}
//Por si no ahi datos en los props por default aqui es opcion
PersonaInfo.defaultProps={
    adress:'Cuernavaca Morelos'
}