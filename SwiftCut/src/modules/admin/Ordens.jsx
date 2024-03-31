import { useEffect, useState } from "react";
import { Employees } from "../../components/Employees.jsx";
import { Orden } from "../../components/shared/Orden";
import { Label } from "flowbite-react";
import { AxiosClientJSON } from "../../config/http-client/axios-client.js";



export const Ordens = () => {


    const [ordenesJson, setOrdenesJson] = useState([]);
    const [employeesJson, setEmployeesJson] = useState(null);
    const fetchData = async () => {
        try {
            const response = await AxiosClientJSON({
                url: '/api/employees/readForOrdens',
                method: 'GET',
                data: ''
            });
            const resposeOrdens = await AxiosClientJSON({
                url: '/api/order/readAll',
                method: 'GET',
                data: ''
            });
            setEmployeesJson(response.data);
            setOrdenesJson(resposeOrdens.data);
        } catch (error) {
            // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
            console.error('Error fetching data:', error);
        }
    };

    const dropOrder = (item) => {
        console.log(item)
    }
    const dropOver = (id) => {
        document.getElementById('employees' + id).addEventListener('dropOver', () => {
            document.getElementById('employees' + id).classList.add('scale-75')
        });
    }
    useEffect(() => {


        fetchData();

    }, []);

    return (
        <>
            <div className="mt-8 h-[80vh] w-full m-2 p-4">

                <div className="flex justify-center h-full w-full">
                    <div className="flex-1  m-2 rounded-lg flex flex-col items-center " id="ordernsAll">
                        <div className="w-full flex justify-center items-center border-b mb-4">
                            <Label value="Ordenes" className=" p-1 text-xl" />
                        </div>
                        <div className="overflow-y-scroll w-full flex flex-col items-center ">
                            {
                                ordenesJson.map((item, key) => (
                                    <div key={key} className="h-fit  flex rounded-lg w-3/4 m-3 hover:scale-105  duration-75 " id={`orden-${item?.id}`}
                                        draggable onDragStart={(e) => {
                                            e.dataTransfer.setData('text/plain', e.target.id)
                                        }}



                                    >
                                        <Orden key={key} item={item} />
                                    </div>

                                ))
                            }
                        </div>


                    </div>
                    <div className="flex-1  m-2 rounded-lg flex flex-col items-center "  >
                        <div className="w-3/4 flex justify-center items-center border-b mb-4">
                            <Label value="Trabajdores" className=" p-1 text-xl" />
                        </div>
                        <div className="overflow-y-scroll w-full flex flex-col items-center">
                            {
                                employeesJson?.map((item, key) => (
                                    <div key={key} className="h-fit  flex rounded-lg w-3/4 droppable "  >
                                        <Employees refresh={fetchData} key={key} item={item} />
                                    </div>

                                ))
                            }
                        </div>




                    </div>
                </div>
            </div>
        </>
    );
}