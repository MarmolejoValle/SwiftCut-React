import { useState } from "react";
import { Category } from "../../components/Category";
import { Button, Label } from "flowbite-react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ProductList } from "../../components/ProductList";
import { CardProduct } from "../../components/CardProduct";


export const Inventory = () => {
    const [categoryJson, setCategoryJson] = useState([
        { name: "Primera", url: "https://images.hola.com/imagenes/cocina/recetas/20210318186295/lomo-de-cerdo-asado-al-horno/0-932-27/diapdre-home-t.jpg" },
        { name: "Lomo", url: "https://carnesideal.tienda/cdn/shop/products/CRD05-1_6982d974-a452-4983-9c0c-350d6a3ad91b.jpg?v=1627841538" },
        { name: "Lomo", url: "https://carnesideal.tienda/cdn/shop/products/CRD05-1_6982d974-a452-4983-9c0c-350d6a3ad91b.jpg?v=1627841538" },
        { name: "Lomo", url: "https://carnesideal.tienda/cdn/shop/products/CRD05-1_6982d974-a452-4983-9c0c-350d6a3ad91b.jpg?v=1627841538" },
        { name: "Lomo", url: "https://carnesideal.tienda/cdn/shop/products/CRD05-1_6982d974-a452-4983-9c0c-350d6a3ad91b.jpg?v=1627841538" },
        { name: "Lomo", url: "https://carnesideal.tienda/cdn/shop/products/CRD05-1_6982d974-a452-4983-9c0c-350d6a3ad91b.jpg?v=1627841538" },
        { name: "Lomo", url: "https://carnesideal.tienda/cdn/shop/products/CRD05-1_6982d974-a452-4983-9c0c-350d6a3ad91b.jpg?v=1627841538" },
        { name: "Lomo", url: "https://carnesideal.tienda/cdn/shop/products/CRD05-1_6982d974-a452-4983-9c0c-350d6a3ad91b.jpg?v=1627841538" },
        { name: "Lomo", url: "https://carnesideal.tienda/cdn/shop/products/CRD05-1_6982d974-a452-4983-9c0c-350d6a3ad91b.jpg?v=1627841538" },
        { name: "Lomo", url: "https://carnesideal.tienda/cdn/shop/products/CRD05-1_6982d974-a452-4983-9c0c-350d6a3ad91b.jpg?v=1627841538" },
        { name: "Lomo", url: "https://carnesideal.tienda/cdn/shop/products/CRD05-1_6982d974-a452-4983-9c0c-350d6a3ad91b.jpg?v=1627841538" }]);

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
                                        <Category item={{ name: item?.name, urlPhoto: item?.url }} />
                                    </div>
                                ))
                            }
                        </div>
                        <div className=" h-4/5 m-3">
                            <Button className="h-full " style={{ backgroundColor: "var(--red-3)" }}>
                                <IoIosAddCircleOutline size={25} />
                            </Button>
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