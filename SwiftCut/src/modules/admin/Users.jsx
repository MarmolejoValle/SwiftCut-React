import { Avatar, Badge, Button, Label, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { PiIdentificationBadgeThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import {AxiosClientFormData, AxiosClientJSON } from "../../config/http-client/axios-client";
import { FormElastic } from "../../components/FormElastic";

export const Users = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [usersJson, setUsersJson] = useState([]);
    const [rolesJson, setRolesJson] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosClientJSON({
                    url: '/api/employees/readAll',
                    method: 'GET',
                    data: ''
                });
                const rolesP = await AxiosClientJSON({
                    url: '/api/rols/readAll',
                    method: 'GET',
                    data: ''
                });
                // Aquí puedes hacer algo con la respuesta, como establecer el estado del componente

                setUsersJson(response.data);
                setRolesJson(rolesP.data)
                console.log(rolesJson);
            } catch (error) {
                // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

        // Llamar a fetchData cuando el componente se monta


    }, []);

    const status = (value) => {
        if (value === "Activo") return { value: "Activo", mode: "success" };
        if (value === "Bloqueado") return { value: "Bloqueado", mode: "dark" };


    }

    return (
        <>
            <div className=" w-full p-5">
                <div className="m-4 flex" >
                <TextInput type="search" required />

                    <FormElastic key={""} item={{
                        title: "Registro de Usuario",
                        data: [
                            {id:"name" , text: "Nombre" , type:"text" , placeholder:"Alberto"},
                            {id:"lastName" , text: "Apellidos" , type:"text" , placeholder:"Cardenas Herrera"},
                            {id:"phone" , text: "Telefono" , type:"tel" , placeholder:"2418342349"},
                            {id:"image" , text: "Foto" , type:"file" },
                            {id:"sex" , text: "Sexo" , type:"text" , placeholder:"/"},
                            {id:"email" , text: "Correo" , type:"email" , placeholder:"ejemplo@correo.com"},
                            {id:"password" , text: "Contraseña" , type:"password" , placeholder:"**************"}

                        ],
                        select:[
                            {id:"rols" , text: "Roles" , type:"text" , data:rolesJson},
                        ],
                        form: {
                            method: 'POST',
                            url: '/api/employees/add',
                            headers:{ "Content-Type": "multipart/form-data"},
                            axios:AxiosClientFormData
                        }
                    }} />

                </div>
                <Table hoverable >
                    <Table.Head >
                        <Table.HeadCell>
                            <span className="sr-only">Photo</span>
                        </Table.HeadCell>
                        <Table.HeadCell>Nombre</Table.HeadCell>
                        <Table.HeadCell>Telefono</Table.HeadCell>
                        <Table.HeadCell>Correo</Table.HeadCell>
                        <Table.HeadCell>Estado</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {usersJson.map((item , key) => 
                        (<Table.Row key={key} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="">
                                <Avatar img={item?.personDto?.urlPhoto} alt="avatar of Jese" rounded bordered  size={"lg"}/>
                            </Table.Cell>
                            <Table.Cell>
                                <div className=" overflow-hidden">
                                    <p className="text-sm font-medium text-slate-900">{`${item?.personDto?.name} ${item?.personDto?.lastName}`} </p>
                                    <p className="text-[.6rem] text-slate-500 truncate">{item?.rolDto?.type}</p>
                                </div>
                            </Table.Cell>
                            <Table.Cell>{item?.personDto?.phone}</Table.Cell>
                            <Table.Cell>{item?.email}</Table.Cell>
                            <Table.Cell>
                                <Badge color={status(item?.personDto?.statusPersonDto?.type).mode} size="sm" className="justify-center">
                                    {status(item?.personDto?.statusPersonDto?.type).value}
                                </Badge>
                            </Table.Cell>

                            <Table.Cell>
                                <Link to={`/Users/Profile/${item?.id}`} >
                                    <PiIdentificationBadgeThin size={25} />
                                </Link>
                            </Table.Cell>
                        </Table.Row>))}

                    </Table.Body>
                </Table>
            </div>

        </>
    );
}