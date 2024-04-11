
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Orden } from "./shared/Orden";
import { AxiosClientJSON } from "../config/http-client/axios-client";
import { CardProduct } from "./shared/CardProduct";
import { GoogleMap, LoadScript, LoadScriptNext, Marker } from "@react-google-maps/api";
import { customToast } from "../config/alert/alert";
export const ProductList = ({ modelMode, set, ordens, refresh }) => {
  useEffect(() => {

}, []);

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
const mapUrlZomm =`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d7549.260480095264!2d${ordens[0]?.latitude}!3d${ordens[0]?.longitude}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2smx!4v1712723064443!5m2!1ses!2smx`;

  return (
    <>
      <Modal show={modelMode} size="" popup onClose={() => set(false)} >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 flex items-center flex-col">
          
            <div className="h-64 w-full">
             {ordens[0]?.longitude ? 
             
             <iframe
                src={mapUrlZomm}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
             : null} 
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Productos  </h3>
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