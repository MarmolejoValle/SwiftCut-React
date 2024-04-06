import { useEffect, useState } from "react";
import { Category } from "../../components/Category";
import { Button, Label, Spinner } from "flowbite-react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ProductList } from "../../components/ProductList";
import { CardProduct } from "../../components/CardProduct";
import { BeatLoader, PuffLoader } from 'react-spinners'
import { FormElastic } from "../../components/FormElastic";
import { AxiosClientFormData, AxiosClientJSON } from "../../config/http-client/axios-client";
import { PiTrendUpDuotone } from "react-icons/pi";


export const Inventory = () => {
    const [categoryJson, setCategoryJson] = useState([]);
    const [productsJson, setProductsJson] = useState(null);
    const [categoryId, setCategoryId] = useState(0);
    const [idCategoryRefresh, setIdCategoryRefresh] = useState(0);
    const [spinner, setSpinner] = useState(true);
    const [active, setActive] = useState('');


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

    useEffect(() => {


        fetchData();

    }, []);

    const ProductsData = async (idC) => {
        try {
            setSpinner(true)
            const response = await AxiosClientJSON({
                url: '/api/product/readCategory',
                method: 'POST',
                data: { id: idC }
            });
            setCategoryId(idC)
            setProductsJson(response.data);
            setSpinner(false)


        } catch (error) {
            // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
            console.error('Error fetching data:', error);
        }
    };

    const activeItem =(item)=>{
        document.getElementById(active)?.classList?.remove("-translate-y-4");
        document.getElementById(active)?.querySelector('button').classList.add("hidden");


        document.getElementById(item).classList.add("-translate-y-4");
        document.getElementById(item).querySelector('button');
        document.getElementById(item).querySelector('button').classList.remove("hidden");

        setActive(item)
    }
    return (
        <>
            <div className="w-full  p-4">
<div className="flex items-center mb-4">


                        <Label value="Categorias" className="text-3xl"/>
                        <FormElastic refresh={fetchData} key={""} item={{
                            title: "Registrar Categoria",
                            data: [
                                { id: "name", text: "Nombre", type: "text", placeholder: "", value: "" },
                                { id: "image", text: "Foto", type: "file" },
                                { id: "description", text: "Descripcion", type: "textArea", placeholder: "", value: "" },


                            ], select: [],
                            form: {
                                method: 'POST',
                                url: '/api/category/add',
                                headers: { "Content-Type": "multipart/form-data" },
                                axios: AxiosClientFormData,
                                redirect: `/Inventory`
                            }
                            , button: {
                                name: "Agregar"
                            }
                        }} />
                        
                    </div>
                <div className="flex flex-col justify-start h-full w-full">
                    
                    <div className="w-full h-3/6 flex items-start">
                        <div className=" flex overflow-x-scroll  h-full  w-11/12   items-center p-1 ">
                            {
                                categoryJson.map((item, key) => (
                                    <div key={key} id={`${item?.id}-cad`} className={`m-1 p-2 h-full hover:-translate-y-4 duration-75 `}
                                     onClick={() => {
                                         ProductsData(item?.id); 
                                         setProductsJson(null); 
                                         setIdCategoryRefresh(item?.id); 
                                         activeItem(item?.id+"-cad"); }} >

                                        <Category  item={item} refresh={fetchData}  />
                                        
                                    </div>
                                ))
                            }
                            
                        </div>



                    </div>
                    <div className="flex h-full mt-10">
                        {productsJson ? <ProductList productJson={productsJson} idCategory={categoryId} refresh={ProductsData} idC={idCategoryRefresh} />
                            : <div className="w-full flex justify-center items-center h-52 flex-wrap">
                                <PuffLoader size={50} />
                            </div>
                        }

                    </div>


                </div>
            </div>
        </>);
}