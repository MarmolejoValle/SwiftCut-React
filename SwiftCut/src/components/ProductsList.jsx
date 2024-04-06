
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { Orden } from "./shared/Orden";
import { AxiosClientJSON } from "../config/http-client/axios-client";
import { CardProduct } from "./shared/CardProduct";

export const ProductList = ({ modelMode, set, ordens, refresh }) => {

  const fetchData = async (idOrder) => {
    try {
      const response = await AxiosClientJSON({
        url: '/api/order/remove',
        method: 'PUT',
        data: { id: idOrder }
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
      <Modal show={modelMode} size="" popup onClose={() => set(false)} >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 flex items-center flex-col">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Productos</h3>
            <div className="flex items-center flex-wrap ">
              {
                ordens.map((item) => (

                  <CardProduct item={item} />

                ))
              }
            </div>


          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}