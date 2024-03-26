import { Avatar, Badge, Button, Card, FileInput, Label, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {AxiosClientFormData, AxiosClientJSON} from "../../config/http-client/axios-client";
import { FormElastic } from "../../components/FormElastic";

export const Profile = () => {
    const [userJson, setUserJson] = useState({});
    const [ordensCount, setOrdensCountJson] = useState({});
    const [ordens, setOrdensJson] = useState([]);


    const [mode,setMode] = useState("");
    const [rolesJson, setRolesJson] = useState([]);

    const { idUser } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosClientJSON({
                    url: '/api/employees/readEmployeeId',
                    method: 'POST',
                    data: { id: idUser }
                });
                const responseOrdensCount = await AxiosClientJSON({
                    url: '/api/employees/countOrdens',
                    method: 'POST',
                    data: { id: idUser }
                });
                const responseOrdens = await AxiosClientJSON({
                    url: '/api/employees/Ordens',
                    method: 'POST',
                    data: { id: idUser }
                });
                const rolesP = await AxiosClientJSON({
                    url: '/api/rols/readAll',
                    method: 'GET',
                    data: ''
                });
               
                // Aquí puedes hacer algo con la respuesta, como establecer el estado del componente
                setRolesJson(rolesP.data)
                // Aquí puedes hacer algo con la respuesta, como establecer el estado del componente

                setUserJson(response.data);
                setOrdensCountJson(responseOrdensCount.data);
                setOrdensJson(responseOrdens.data);
                if(userJson?.personDto?.statusPersonDto?.type === "Activo" ) setMode("success");
                if(userJson?.personDto?.statusPersonDto?.type ==="Bloqueado" ) setMode("dark");
            } catch (error) {
                // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, []);
   

    return (
        <>
            <div className=" h-fit m-auto ">
                <div className="m-2 flex flex-col h-full ">
                    <div className="flex-1 rounded-t-lg flex items-center justify-around p-6" style={{ backgroundColor: "var(--blackLigth)" }}>
                        <div className='flex py-4 first:pt-0 last:pb-0  items-center ml-16'>
                            <Avatar img={userJson?.personDto?.urlPhoto} alt="avatar of Jese" rounded size="xl" bordered/>

                            <div className="ml-3 overflow-hidden">
                                <p className="text-2xl font-medium text-white">{userJson?.personDto?.name} {userJson?.personDto?.lastName} </p>
                                <p className="text-1xl text-slate-400 truncate">{userJson?.rolDto?.type}</p>
                            </div>
                        </div>
                        <div>
                        <FormElastic key={""} item={{
                        title: "Modificar de Usuario",
                        data: [
                             

                            {id:"name" , text: "Nombre" , type:"text" , placeholder:"Alberto" , value : userJson?.personDto?.name} ,
                            {id:"lastName" , text: "Apellidos" , type:"text" , placeholder:"Cardenas Herrera" , value:userJson?.personDto?.lastName},
                            {id:"phone" , text: "Telefono" , type:"tel" , placeholder:"2418342349", value:userJson?.personDto?.name},
                            {id:"image" , text: "Foto" , type:"file" , value:""},
                            {id:"sex" , text: "Sexo" , type:"text" , placeholder:"/", value:userJson?.personDto?.sex},
                            {id:"email" , text: "Correo" , type:"email" , placeholder:"ejemplo@correo.com", value:userJson?.email},
                            {id:"password" , text: "Contraseña" , type:"password" , placeholder:"**************", value:""},
                            {id:"id" , text: "" , type:"hidden" , placeholder:"" , value : userJson?.id}

                        ],
                        select:[
                            {id:"rols" , text: "Roles" , type:"text" , data:rolesJson},
                        ],
                        form: {
                            method: 'PUT',
                            url: '/api/employees/update',
                            headers:{ "Content-Type": "multipart/form-data"},
                            axios:AxiosClientFormData,
                            redirect :`/Users/Profile/${userJson?.id}`
                        }
                        ,button:{
                            name:"Modificar"
                        }
                    }} />
                        </div>
                    </div>
                    <div className="flex-1 flex justify-around bg-slate-200 rounded-b-lg p-2 ">
                        <div className="w-3/12 h-full">
                            <div className="rounded-t-lg  p-3" style={{ backgroundColor: 'var(--red-3)' }}>

                                <h5 className="text-sm text-center  tracking-tight text-white dark:text-white">
                                    Pedidos realizados
                                </h5>
                            </div>

                            <Card className="w-full flex flex-col items-center rounded-none rounded-b-lg m-0 border-none ">
                                <div className="h-full w-full flex  flex-col ">

                                    <div className="h-4/5 flex justify-center items-center">
                                        <div style={{ borderColor: 'var(--red-3)' }} className="flex flex-col justify-center items-center w-20 h-20 rounded-full  m-5 p-3 border">
                                            <Label className="text-2xl font-bold">{ordensCount?.count}</Label>
                                            <Label className="text-sm text-gray-500">Total</Label>
                                        </div>
                                    </div>

                                </div>
                            </Card>
                        </div>
                        <div className="w-3/12 h-full">
                            <div className="rounded-t-lg  p-3" style={{ backgroundColor: 'var(--red-3)' }}>

                                <h5 className="text-sm text-center  tracking-tight text-white dark:text-white">
                                    Datos personales
                                </h5>
                            </div>
                            <Card className="w-full flex flex-col items-center rounded-none rounded-b-lg m-0 border-none " >
                                <div className="h-full w-full flex flex-col p-0 " >


                                    <div className="w-full ">
                                        <div className=" w-full mt-2">
                                            <p className="text-xs text-center text-gray-400 m-1 ">Nombre</p>
                                            <p className="text-[.9rem] ">{userJson?.personDto?.name}</p>
                                        </div>
                                        <div className=" w-full mt-2">
                                            <p className="text-xs text-center text-gray-400 m-1 ">Apellidos</p>
                                            <p className="text-[.9rem] ">{userJson?.personDto?.lastName}</p>
                                        </div>
                                        <div className=" w-full mt-2">
                                            <p className="text-xs text-center text-gray-400 m-1 ">Telefono</p>
                                            <p className="text-[.9rem] ">{userJson?.personDto?.phone}</p>
                                        </div>
                                        <div className=" w-full mt-2">
                                            <p className="text-xs text-center text-gray-400 m-1 ">Sexo</p>
                                            <p className="text-[.9rem] ">{userJson?.personDto?.sex}</p>
                                        </div>
                                        <div className=" w-full mt-2">
                                            <p className="text-xs text-center text-gray-400 m-1 ">Estado</p>
                                            <p className="text-[.9rem] ">
                                                <Badge color={mode} size="sm" className="justify-center">
                                                    {userJson?.personDto?.statusPersonDto?.type}
                                                </Badge>
                                            </p>
                                        </div>



                                    </div>

                                </div>
                            </Card>
                        </div>
                        <div className="w-3/12 h-full">
                            <div className="rounded-t-lg  p-3" style={{ backgroundColor: 'var(--red-3)' }}>

                                <h5 className="text-sm text-center  tracking-tight text-white dark:text-white">
                                    Ultimos pedidos
                                </h5>
                            </div>
                            <Card className="w-full flex flex-col items-center rounded-none rounded-b-lg m-0 border-none">
                                <div className="h-full w-full ">

                                    <Table striped={"row"} hoverable className="text-xs ">
                                        <Table.Head >
                                            <Table.HeadCell>#</Table.HeadCell>
                                            <Table.HeadCell>Total</Table.HeadCell>
                                            <Table.HeadCell>Fecha</Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body>
                                          {ordens.map((item,key)=>(  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                <Table.Cell className="">
                                                    {key+1}
                                                </Table.Cell>

                                                <Table.Cell>{item?.price}</Table.Cell>
                                                <Table.Cell>{item?.dateRequest}</Table.Cell>


                                            </Table.Row>))}

                                        </Table.Body>
                                    </Table>
                                </div>


                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}