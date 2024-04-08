import { Avatar, Badge, Label, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { PiIdentificationBadgeThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import { CardProduct } from "./CardProduct";
import { FormElastic } from "./FormElastic";
import { AxiosClientFormData, AxiosClientJSON } from "../config/http-client/axios-client";
import { BarLoader, PuffLoader } from "react-spinners";

export const ProductList = ({ productJson, idCategory  ,refresh ,idC}) => {


    const [extras, setExtras] = useState([]);
    const [product, setProduct] = useState(null);
    const [productId, setProductId] = useState(null);




    const fetchProduct = async (idP) => {
        
        try {
            const responseProduct = await AxiosClientJSON({
                url: '/api/product/read',
                method: 'POST',
                data: { id: idP }
            });
            const responseExtras = await AxiosClientJSON({
                url: '/api/extras/readForProduct',
                method: 'POST',
                data: { id: idP }
            });
            setProduct(responseProduct.data);
            setExtras(responseExtras.data);
        } catch (error) {
            // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
            console.error('Error fetching data:', error);
            setProduct(null);
            
        }
    };

    const status = (value) => {
        if (value <= 0) return { value: "Agotado", mode: "dark" };
        if (value > 40) return { value: "Disponible", mode: "success" };
        if (value <= 40) return { value: "Escaso", mode: "warning" };


    }
    return (
        <> <div className="flex-1 m-3 h-1/2">
            <div className="flex h-full items-center">
                <Label value="Productos" className=" m-4 text-xl" />
                <FormElastic refresh={refresh}  key={""} item={{
                    title: "Registrar Producto",
                    data: [
                        { id: "name", text: "Nombre", type: "text", placeholder: "", value: "" },
                        { id: "image", text: "Foto", type: "file" },
                        { id: "description", text: "Descripción", type: "textArea", placeholder: "", value: "" },
                        {id:"idCategory" , text: "" , type:"hidden" , placeholder:"" , value : idCategory}



                    ], select: [],
                    form: {
                        method: 'POST',
                        url: '/api/product/add',
                        headers: { "Content-Type": "multipart/form-data" },
                        axios: AxiosClientFormData,
                    }
                    , button: {
                        name: "Agregar"
                    }
                    ,refreshDate : idC
                }} />
            </div>
            <div className="overflow-y-scroll overflow-x-hidden h-4/6 rounded-lg p-3" >
                <Table hoverable className="shadow-none w-full" >
                    <Table.Head className="" >
                        <Table.HeadCell>
                            <span className="sr-only">Photo</span>
                        </Table.HeadCell>
                        <Table.HeadCell>Nombre</Table.HeadCell>
                        <Table.HeadCell>Kilos</Table.HeadCell>
                        <Table.HeadCell>Extras</Table.HeadCell>
                        <Table.HeadCell>Estado</Table.HeadCell>

                    </Table.Head>
                    <Table.Body >
                        {productJson.map((item, key) => (
                            <Table.Row
                                onClick={() => {fetchProduct(item?.id); setProduct(null) ;setProductId(item?.id) }}
                                key={key}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:-translate-x-8 duration-75  )" >
                                <Table.Cell className="">
                                    <div className="bg-cover h-14 w-14" style={{ backgroundImage: `url('${item?.urlPhoto} ')` }}></div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div class=" overflow-hidden">
                                        <p class="text-sm font-medium text-slate-900">{item?.name}</p>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>{item?.quantity}Kg</Table.Cell>
                                <Table.Cell>{item?.register}</Table.Cell>
                                <Table.Cell>
                                    <Badge color={status(item.quantity).mode} size="sm" className="justify-center font-medium">
                                        {status(item.quantity).value}
                                    </Badge>
                                </Table.Cell>


                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>

        </div>

            <div className="flex-[3] ">
                {product? <CardProduct item={product} extras={extras} refresh={fetchProduct} idProducto ={productId} refreshCategory={refresh} idCategory={idC} /> :
                    <div className="w-full flex justify-center items-center h-52">
                        <BarLoader size={50} speedMultiplier={.4}/>
                    </div>
                }
            </div>

        </>);
}