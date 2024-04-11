import { useEffect, useState } from "react";
import { InfoLabel } from "./InfoLabel";
import { AxiosClientJSON } from "../config/http-client/axios-client";
import { customAlertCorfirm, customToast } from "../config/alert/alert";

export const Employees = ({ item , refresh }) => {
    const [color, setColor] = useState('gray');
    
    const update = async (data) => {
        try {
            const resposeOrdens = await AxiosClientJSON({
                url: '/api/order/updateEmployees',
                method: 'PUT',
                data: data
            });
            if(resposeOrdens.status ==  'OK')
            {
                customToast("Orden asignada" , 'success');

                refresh();
                
            }
        } catch (error) {
            console.log(error)
               
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
                <InfoLabel info={{ title: "Pedidos en caja", value: item?.count|| 0 }} />

                {(item?.count|| 0 ) <= 2 ? <div className={`bg-green-400  h-1/6 rounded-sm`}></div> : null}
                {(item?.count || 0) > 2 && (item?.count || 0) <= 6 ? <div className={`bg-yellow-400  h-1/6 rounded-sm`}></div> : null}
                {(item?.count || 0 )> 6 ? <div className={`bg-red-400  h-1/6 rounded-sm`}></div> : null}


            </div>
        </>
    );
}