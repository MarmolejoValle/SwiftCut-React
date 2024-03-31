import { Avatar, Badge, Button, Label, Table } from "flowbite-react";
import { BiFoodMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FormElastic } from "../../components/FormElastic";
import { AxiosClientFormData, AxiosClientJSON } from "../../config/http-client/axios-client";
import { useEffect, useState } from "react";

export const Extras = () =>{
    const [extrasJson, setExtrasJson] = useState([]);


    const fetchData = async () => {
        try {
            const response = await AxiosClientJSON({
                url: '/api/extras/readAll',
                method: 'GET',
                data: ''
            });
          
           
            // Aquí puedes hacer algo con la respuesta, como establecer el estado del componente
            setExtrasJson(response.data);
        } catch (error) {
            // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        
        fetchData();

        // Llamar a fetchData cuando el componente se monta


    }, []);
    return(
        <>
          <div className=" w-full p-5">
                <div className="m-4 flex" >
                <FormElastic refresh={fetchData}  key={""} item={{
                        title: "Registro de extra",
                        data: [
                             

                            {id:"name" , text: "Nombre" , type:"text" , placeholder:"" , value : ""} ,
                            {id:"price" , text: "Precio" , type:"text" , placeholder:"" ,value : ""},
                            {id:"description" , text: "Descripcion" , type:"text" , placeholder:"", value :""},
                        

                        ],
                        select:[
                        ],
                        form: {
                            method: 'POST',
                            url: '/api/extras/add',
                            headers:{ "Content-Type": "multipart/form-data"},
                            axios:AxiosClientJSON,
                            redirect :`/Extras`
                        }
                        ,button:{
                            name:"Agregar"
                        }
                    }} />

                </div>
                <Table  hoverable >
                    <Table.Head >
                        
                        <Table.HeadCell>Nombre</Table.HeadCell>
                        <Table.HeadCell>Precio</Table.HeadCell>
                        <Table.HeadCell>Descripcion</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                       {extrasJson.map((item)=>( <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                           
                            <Table.Cell>
                                <div class=" overflow-hidden">
                                    <p class="text-sm font-medium text-slate-900">{item?.name}</p>
                                </div>
                            </Table.Cell>
                            <Table.Cell>{item?.price}</Table.Cell>
                            <Table.Cell>{item?.description}</Table.Cell>
                           

                            <Table.Cell>
                                <Link to={`/Extras/Info/${item?.id}`}>
                                <BiFoodMenu size={25}/>
                                 
                                </Link>
                            </Table.Cell>
                        </Table.Row>))}
                        
                    </Table.Body>
                </Table>
            </div>

        </>
    );
}