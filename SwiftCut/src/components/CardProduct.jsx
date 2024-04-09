import { Badge, Button, Card, Label, Table, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { FormElastic } from "./FormElastic";
import { AxiosClientFormData, AxiosClientJSON } from "../config/http-client/axios-client";
import { customAlert } from "../config/alert/alert";

export const CardProduct = ({ item, extras, refresh, idProducto, refreshCategory, idCategory }) => {
    const [extrasJson , setExtras] = useState([])
    const fetchProduct = async () => {
        
        try {
            const responseExtras = await AxiosClientJSON({
                url: '/api/extras/readAll',
                method: 'GET',
                data: ''
            });
            setExtras(responseExtras.data)
        } catch (error) {
            // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
            console.error('Error fetching data:', error);
        }
    };
    const deleteProduct = async (id) => {
        
        try {
            const responseExtras = await AxiosClientJSON({
                url: '/api/productExtras/delete',
                method: 'DELETE',
                data: {id : id}
            });

            if(responseExtras.status == 'OK')
            {
                refresh(idProducto);
                refreshCategory(idCategory);
            }
        } catch (error) {
            // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
            console.error('Error fetching data:', error);
            customAlert(
                'Registro incorrecto',
                'Revisa los datos',
                'error'
            );
        }
    };
    useEffect(() => {

       
        fetchProduct();

    }, []);

    const status = (value) => {
        if (value <= 0) return { value: "Agotado", mode: "dark" };
        if (value > 40) return { value: "Disponible", mode: "success" };
        if (value <= 40) return { value: "Escaso", mode: "warning" };
    }
    


    return (
        <>
            <Card
                className="max-w-xl"

                renderImage={() => <img className="object-cover h-40 rounded-t-lg " src={item?.urlPhoto} alt="image 1" />}
            >
                <div className="w-full flex justify-between items-center">
                    <FormElastic refresh={refresh} refreshExtra={refreshCategory} key={""} item={{
                        title: "Modificar Producto",
                        data: [
                            { id: "name", text: "Nombre", type: "text", placeholder: "", value: item?.name },
                            { id: "image", text: "Foto", type: "file" },
                            { id: "description", text: "Descripción", type: "textArea", placeholder: "", value: item?.description },
                            { id: "id", text: "", type: "hidden", placeholder: "", value: item?.id }




                        ], select: [],
                        form: {
                            method: 'PUT',
                            url: '/api/product/update',
                            headers: { "Content-Type": "multipart/form-data" },
                            axios: AxiosClientFormData,
                        }
                        , button: {
                            name: "Modificar"
                        }
                        , refreshDate: idProducto
                        , refreshExtra: idCategory,
                        delete:{
                            url:"/api/product/delete",
                            values:{id:item?.id },
                        }
                    }} />                    <h2 className="text-xl">{item?.name} </h2>
                    <Badge color={status(item?.quantity)?.mode} size="xs" className="justify-center font-medium">
                        {status(item?.quantity)?.value}
                    </Badge>
                </div>

                <div>
                    <Textarea id="comment" disabled={true} required rows={4} className="mb-3 text-center " value={item?.description} />
                    <div className="flex justify-evenly items-center">
                        <Label value="Cantidad" className="text-sm" />
                        <Label value={`${item.quantity|| 0} Kg`} className="text-gray-500" />
                        <FormElastic refresh={refresh} refreshExtra={refreshCategory} key={""} item={{
                            title: "Recuerda que los kilos se sumarán ",
                            data: [

                                { id: "quantity", text: "Cantidad para agregar", type: "num", placeholder: `la cantida agregada se sumara :  ${item.quantity|| 0}`, value: 0 },
                                { id: "id", text: "", type: "hidden", placeholder: "", value: item?.id },





                            ], 
                            select: [],
                            form: {
                                method: 'PUT',
                                url: '/api/product/updateQuantity',
                                headers: { "Content-Type": "multipart/form-data" },
                                axios: AxiosClientJSON,
                            }
                            , button: {
                                name: "Editar"
                            }
                            , refreshDate: idProducto
                            , refreshExtra: idCategory
                        }} />
                    </div>
                </div>
                <div className="border-t mt-3 p-3 rounded-sm ">
                    <div className="flex w-full items-center">

                   
                    <Label value="Extras" className="text-xl" />
                    <FormElastic refresh={refresh} refreshExtra={refreshCategory} key={""} item={{
                            title: "Seleccione un extra ",
                            data: [

                                { id: "idProduct", text: "", type: "hidden", placeholder: "", value: item?.id },


                            ], select: [{id:"idExtra", text: "" , type:"num" ,data:extrasJson}],
                            form: {
                                method: 'POST',
                                url: '/api/productExtras/add',
                                headers: { "Content-Type": "multipart/form-data" },
                                axios: AxiosClientJSON,
                            }
                            , button: {
                                name: "Agregar"
                            }
                            , refreshDate: idProducto
                            , refreshExtra: idCategory
                        }} />
                         </div>
                    <div className="overflow-x-auto h-44">
                        <Table hoverable className="shadow-none " align="center" >
                            <Table.Head >
                                <Table.HeadCell>Nombre</Table.HeadCell>
                                <Table.HeadCell>Precio</Table.HeadCell>
                                <Table.HeadCell>
                                    <span className="sr-only">Edit</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                {extras?.map((item, key) => (
                                    <Table.Row key={key} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>
                                            <div class=" overflow-hidden">
                                                <p class="text-sm font-medium text-slate-900">{item?.name}</p>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Label value={`${item?.price || 0} x Kg`} className="text-xs text-gray-500" />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button color="red" onClick={()=>deleteProduct(item?.id)}>Eliminar</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>

                    </div>
                </div>

            </Card>
        </>
    );
}