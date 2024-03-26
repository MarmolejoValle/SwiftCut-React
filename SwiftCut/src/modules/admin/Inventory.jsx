import { useEffect, useState } from "react";
import { Category } from "../../components/Category";
import { Button, Label } from "flowbite-react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ProductList } from "../../components/ProductList";
import { CardProduct } from "../../components/CardProduct";
import { FormElastic } from "../../components/FormElastic";
import { AxiosClientFormData, AxiosClientJSON } from "../../config/http-client/axios-client";


export const Inventory = () => {
    const [categoryJson, setCategoryJson] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await AxiosClientJSON({
                    url: '/api/category/readAll',
                    method: 'GET',
                    data: ''
                });
                
                

                setCategoryJson(response.data);
               
            } catch (error) {
                // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, []);
   
    const [product, setProduct] = useState(
        {
            id:32,
            name: "chueton",
            urlPhoto: "https://carnesideal.tienda/cdn/shop/products/CRD15-1_2ec75d12-afea-432c-b0e8-8cf108370bba.jpg?v=1630341701",
            description: "Es una combinación de carne y hueso de la columna del cerdo. Este corte de carne es utilizado para mole de olla o para hacer guisado en salsa verde, roja,verdolagas.",
            count: 20,
            extras: [
                {
                    id:20,
                    name: "Ahumado",
                    price: 30,
                    
                },
                {
                    id:21,
                    name: "Enchilado",
                    price: 50,
                    
                }
            ]

        }
    );
    return (
        <>
            <div className="mt-3  w-full m-2 p-4">

                <div className="flex flex-col justify-start h-full w-full">

                    <div className="w-full h-3/6 flex items-start">
                        <div className=" flex overflow-x-scroll  h-full  w-11/12 overflow-y-hidden  items-center ">
                            {
                                categoryJson.map((item, key) => (
                                    <div key={key} className="m-1 p-2 h-full ">
                                        <Category item={{ name: item?.name, urlPhoto: item?.urlPhoto }} />
                                    </div>
                                ))
                            }
                        </div>
                        <div className=" h-4/5 m-3">
                        <FormElastic key={""} item={{
                        title: "Registrar Categoria",
                        data: [
                            {id:"name" , text: "Nombre" , type:"text" , placeholder:"" , value : ""} ,
                            {id:"description" , text: "Descripcion" , type:"text" , placeholder:"" , value : ""} ,
                            {id:"image" , text: "Foto" , type:"file" },


                        ],select:[],
                        form: {
                            method: 'POST',
                            url: '/api/category/add',
                            headers:{ "Content-Type": "multipart/form-data"},
                            axios:AxiosClientFormData,
                            redirect :`/Inventory`
                        }
                        ,button:{
                            name:"Agregar"
                        }
                    }} />
                        </div>
                    </div>
                    <div className="flex h-full mt-10">
                        <div className="flex-1 m-3 ">
                        <Label value="Productos" className=" m-4 text-xl" />

                            <ProductList />
                        </div>
                        <div className="flex-[2] ">
                            <CardProduct item={product}/>
                        </div>
                    </div>


                </div>
            </div>
        </>);
}