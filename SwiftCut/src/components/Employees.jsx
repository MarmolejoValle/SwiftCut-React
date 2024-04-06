import { useEffect, useState } from "react";
import { InfoLabel } from "./InfoLabel";
import { AxiosClientJSON } from "../config/http-client/axios-client";

export const Employees = ({ item , refresh }) => {
    const [color, setColor] = useState('gray');
    const colormode = (value) => {
        if (value <= 2) {
            return 'green';
        }


        if (value >= 6) {
            return 'red';
        }
        if (value > 2 && value <= 5) {
            return 'orange';
        }
    }
    const update = async (data) => {
        const resposeOrdens = await AxiosClientJSON({
            url: '/api/order/updateEmployees',
            method: 'PUT',
            data: data
        });
        if(resposeOrdens.status ==  'OK')
        {
            refresh();
        }
    }

    return (
        <>
            <div className="border w-full m-1 p-4 rounded-lg " id={`employess-${item?.id}`} onDrop={e => {
                let idTransfer = e.dataTransfer
                    .getData('text/plain').split("-")[1];
                
                update({ id: idTransfer, idEmployee: item?.id })

                console.log("Orden : " + idTransfer + "   Empleado : " + item?.id);

            }}
                onDragOver={(e) => { e.preventDefault(); }}
            >
                <div>
                    <p className="text-lg " style={{ color: "var(--blackLigth)" }}>{item?.personDto?.name + " " + item?.personDto?.lastName} </p>
                </div>
                <InfoLabel info={{ title: "Email", value: item?.email }} />
                <InfoLabel info={{ title: "Pedidos en caja", value: item?.count }} />

                {item?.count <= 2 ? <div className={`bg-green-500  h-1/6 rounded-sm`}></div> : null}
                {item?.count > 2 && item?.count <= 6 ? <div className={`bg-orange-500  h-1/6 rounded-sm`}></div> : null}
                {item?.count > 6 ? <div className={`bg-red-500  h-1/6 rounded-sm`}></div> : null}


            </div>
        </>
    );
}