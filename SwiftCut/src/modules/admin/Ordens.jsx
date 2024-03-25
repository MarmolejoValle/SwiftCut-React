import { useState } from "react";
import { Employees } from "../../components/Employees.jsx";
import { Orden } from "../../components/shared/Orden";
import { Label } from "flowbite-react";



export const Ordens = () => {


    const [ordenesJson, setOrdenesJson] = useState([
        { value: 60, name: "Jose alfredo", price: 1000, id: 1 },
        { value: 20, name: "Laura Los", price: 6000, id: 2 },
        { value: 10, name: "Olivas Consouelo", price: 10000, id: 3 },

        { value: 60, name: "Jose alfredo", price: 1000, id: 1 },
        { value: 20, name: "Laura Los", price: 6000, id: 2 },
        { value: 10, name: "Olivas Consouelo", price: 10000, id: 3 }
    ]);
    const [employeesJson, setEmployeesJson] = useState([
        { name: "Jared Juarez", value: "7", id: 1 },
        { name: "Ana Lura", value: "2", id: 2 },
        { name: "Leonidas Loas", value: "4", id: 3 },
        { name: "Jared Juarez", value: "7", id: 1 },
        { name: "Ana Lura", value: "2", id: 2 },
        { name: "Leonidas Loas", value: "4", id: 3 },
        { name: "Jared Juarez", value: "7", id: 1 },
        { name: "Ana Lura", value: "2", id: 2 },
        { name: "Leonidas Loas", value: "4", id: 3 }
    ]);

    const dropOrder = (item) => {
        console.log(item)
    }
    const dropOver = (id) => {
        document.getElementById('employees' + id).addEventListener('dropOver', () => {
            document.getElementById('employees' + id).classList.add('scale-75')
        });
    }


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
                                        <Orden key={key} item={{ value: item?.value, name: item?.name, price: item?.price }} />
                                    </div>

                                ))
                            }
                        </div>


                    </div>
                    <div className="flex-1  m-2 rounded-lg flex flex-col items-center overflow-y-scroll"  >
                        <div className="w-3/4 flex justify-center items-center border-b mb-4">
                            <Label value="Trabajdores" className=" p-1 text-xl" />
                        </div>
                        <div className="overflow-y-scroll w-full flex flex-col items-center">
                            {
                                employeesJson.map((item, key) => (
                                    <div key={key} className="h-fit  flex rounded-lg w-3/4 droppable "  >
                                        <Employees key={key} item={{ name: item?.name, value: item?.value, id: item?.id }} />
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