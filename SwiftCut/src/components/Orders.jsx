
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { Orden } from "./shared/Orden";
import { AxiosClientJSON } from "../config/http-client/axios-client";

export const OrdersList = ({ modelMode, set, ordens  , refresh}) => {

  const fetchData = async (idOrder) => {
    try {
        const response = await AxiosClientJSON({
            url: '/api/order/remove',
            method: 'PUT',
            data: {id : idOrder}
        });
       
        set(false);
        refresh();
    } catch (error) {
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
        console.error('Error fetching data:', error);
    }
};

  return (
    <>
      <Modal show={modelMode} size="md" popup onClose={() => set(false)} >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Ordenes</h3>
            {
              ordens.map((item) => (
                <div className="flex items-center">
                  <Orden item={item} />
                  <Button className="h-fit"color="dark" onClick={()=>fetchData(item?.id)} >Eliminar</Button>
                </div>
               ) )
            }



          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}