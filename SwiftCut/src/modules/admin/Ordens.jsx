import { useEffect, useState } from "react";
import { Employees } from "../../components/Employees.jsx";
import { Orden } from "../../components/shared/Orden.jsx";
import { Button, Label } from "flowbite-react";
import { AxiosClientJSON } from "../../config/http-client/axios-client.js";
import SockJS from "sockjs-client/dist/sockjs.js";
import * as Stomp from "stompjs";
import { OrdersList } from "../../components/Orders.jsx";
import { ProductList } from "../../components/ProductsList.jsx";
import { HelpColor } from "../../components/helpColor.jsx";




export const Ordens = () => {



    const [ordenesJson, setOrdenesJson] = useState([]);
    const [employeesJson, setEmployeesJson] = useState(null);
    const [messages, setMessages] = useState([]);
    const [clientUs, setClient] = useState(null);
    const [modalModel, setModalMode] = useState(false);
    const [ordensForEmployeeJson, setOrdensForEmployeeJson] = useState([]);
    const [productListJson, setProductList] = useState([]);
    const [modalProductMode, setModalProductMode] = useState(false);



    const ordensEmployeData = async (idEmploye) => {
        try {
            const response = await AxiosClientJSON({
                url: '/api/order/readAllForEmployees',
                method: 'POST',
                data: {idEmployee : idEmploye}
            });
          
            setOrdensForEmployeeJson(response.data);



        } catch (error) {
            // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
            console.error('Error fetching data:', error);
        }
    };

    const ordensProductData = async (idOrder) => {
        try {
            const response = await AxiosClientJSON({
                url: '/api/order/readAllForOrder',
                method: 'POST',
                data: {id : idOrder}
            });
          
            setProductList(response.data);



        } catch (error) {
            // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
            console.error('Error fetching data:', error);
        }
    };

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

    useEffect(() => {


        fetchData();
        const token = sessionStorage.getItem('token');
        /*
         const sockjs = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(sockjs);
        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/messages', (mensaje) => {
                const payloadData = JSON.parse(mensaje.body)
                setMessages((prevMessages) => [...prevMessages, payloadData]);

            });
        }); 
        
        const disconnectWebSocket = () => {
        stompClient.disconnect(() => {
            console.log('WebSocket disconnected.');
        });
    };

        */
       
      
       
   

    }, []);

    

    const onError = (err) => {
        console.log(err);

    }
    const dropOver = (id) => {
        document.getElementById('employees' + id).addEventListener('dropOver', () => {
            document.getElementById('employees' + id).classList.add('scale-75')
        });
    }


    return (
        <>
            <div className=" h-[80vh] w-full p-4">
                <div>
                <Label value="Pedidos" className="text-3xl"/>
                    <HelpColor/>
                    <HelpColor/>
                    <HelpColor/>
                </div>

                <OrdersList modelMode={modalModel} set={setModalMode} ordens={ordensForEmployeeJson} refresh={fetchData}/>
                <ProductList modelMode={modalProductMode} set={setModalProductMode} ordens={productListJson} refresh={fetchData}/>

                <div className="flex justify-center h-full w-full">
                    <div className="flex-1  m-2 rounded-lg flex flex-col items-center " id="ordernsAll">
                        <div className="w-full flex justify-center items-center border-b mb-4">
                            <Label value="Ordenes" className=" p-1 text-xl" />
                            {messages.map((element) => (
                                "element"
                            ))}
                        </div>
                        <div className="overflow-y-scroll w-full flex flex-col items-center ">
                            {ordenesJson.length == 0 ? <div className="flex items-center justify-center">
                                <Button
                                    size={"sm"}
                                    color="dark"
                                    onClick={() => fetchData()}
                                >Actualizar</Button>
                            </div> :
                                ordenesJson.map((item, key) => (
                                    <div key={key} className="h-fit  flex rounded-lg w-3/4 m-3 hover:scale-105  duration-75 " id={`orden-${item?.id}`}
                                      onClick={()=>{setModalProductMode(true); ordensProductData(item?.id);} } 
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
                                    <div key={key} className="h-fit  flex rounded-lg w-3/4 droppable " onClick={()=>{setModalMode(true) ; ordensEmployeData(item?.id)}} >
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