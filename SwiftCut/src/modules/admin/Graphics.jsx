import { Button, FloatingLabel, Label, Textarea } from "flowbite-react"
import { PhotoInfo } from "../../components/PhotoInfo"
import { BarPorcen } from "../../components/BarPorcen"
import { Line } from "@ant-design/charts"
import { useEffect, useState } from "react"
import { FormElastic } from "../../components/FormElastic";

import { AxiosClientJSON } from "../../config/http-client/axios-client"

export const Graphics = () => {
    const [movimentJson, setMovimentJson] = useState([]);
    const [priceJson, setPriceJson] = useState([]);
    const [categoryJson, setCategoryJson] = useState([]);
    const [utilidadJson, setUtilidadJson] = useState([]);
    const [utilidadNeta, setUtilidadNetaJson] = useState(0);

    const porcenCategory = (item) => {
        setCategoryJson([])
        let total = 0;
        item.map((element) => {
            total += element.count;
        })
        item.map((element) => {
            let promedio = (element.count *100 / total).toFixed(0);
            setCategoryJson((categorypre) => [...categorypre, { name: element.name, count: promedio }])

        })
    }

    const fetchData = async () => {
        try {
            const response = await AxiosClientJSON({
                url: '/api/movementHistory/readAll',
                method: 'GET',
                data: ''
            });
            const priceNow = await AxiosClientJSON({
                url: '/api/priceKg/readNow',
                method: 'GET',
                data: ''
            });
            const categoryAll = await AxiosClientJSON({
                url: '/api/movementHistory/readAllCategory',
                method: 'GET',
                data: ''
            });
            const utiliAll = await AxiosClientJSON({
                url: '/api/movementHistory/quantityCategory',
                method: 'GET',
                data: ''
            });
            utilid(utiliAll.data ,priceNow.data)
            // Aquí puedes hacer algo con la respuesta, como establecer el estado del componente
            setMovimentJson(response.data);
            setPriceJson(priceNow.data);
            porcenCategory(categoryAll.data);
        } catch (error) {
            // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
            console.error('Error fetching data:', error);
        }
    };
    const utilid =(item , price)=>{
        setUtilidadNetaJson(((item[2]?.quantity * price?.priceSale)- (item[0]?.quantity * price?.priceBuy )) );
        setUtilidadJson(((item[2]?.quantity  * 100 )/  (item[0]?.quantity * (item[0]?.quantity  > item[2]?.quantity ? -1 : 1) ) ).toFixed(2));

    }

    useEffect(() => {

        fetchData();

        // Llamar a fetchData cuando el componente se monta


    }, []);
    const config = {
        data: movimentJson,
        xField: (d) => new Date(d.dateTime),
        yField: 'quantity',
        colorField: 'type',
        seriesField: 'product',
        style: {
            gradient: 'x',
            lineWidth: 2,
        },

    };
    return (
        <>
            <div className="w-full p-4">
            <Label value="Graficas" className="text-3xl"/>

                <div className="flex justify-center h-full w-full">
                    <div className="flex-1 h-full flex flex-col justify-evenly items-center">
                        <div className="w-6/12 border rounded-lg p-5  flex flex-wrap">
                            <div className="w-4/55">
                                <div className="flex flex-col p-1 rounded-lg text-center pr-4 pl-4" style={{ backgroundColor: "var(--blackLigth)" }}>
                                    <Label value={priceJson.priceSale} className="text-white  text-lg" />
                                    <Label value="Precio por Kg" className="text-amber-500 text-xs" />
                                </div>
                            </div>
                            <div className="ml-3">
                                <div><Label value="Utilidades" className="text-xs " /></div>
                                <div className="ml-5"><Label value={ "$" +utilidadNeta} className="text-lg  " /></div>
                            </div>
                        </div>
                        <div className="w-4/5 h-3/6 flex flex-col justify-center items-center">
                            <div className="text-center border p-12 rounded-full shadow-lg">
                                <div>
                                    <Label value={utilidadJson} className="text-center text-6xl font-thin" /><span>%</span>
                                </div>
                                <div>
                                    <Label value={((priceJson.priceSale  *  priceJson.priceBuy)/100).toFixed(2) + "%"} className="text-xs text-green-400" /><span></span>
                                </div>

                            </div>
                        </div>
                        <div className="w-4/5 flex justify-center" >
                            {categoryJson.map((item , key) => {
                               return <BarPorcen  key={key} item={{ category: item.name, progress: item.count }} />

                            })}

                        </div>
                    </div>
                    <div className="flex-1">
                        <Line  {...config} />
                        <FormElastic refresh={fetchData}  key={""} item={{
                        title: "Nuevo precio por kilo",
                        data: [
                             

                            {id:"priceBuy" , text: "Precio de compra" , type:"number" , placeholder:"" , value : ""} ,
                            {id:"priceSale" , text: "Precio de venta" , type:"number" , placeholder:"" , value : ""} ,

                           
                        

                        ],
                        select:[
                        ],
                        form: {
                            method: 'POST',
                            url: '/api/priceKg/add',
                            headers:{ "Content-Type": "multipart/form-data"},
                            axios:AxiosClientJSON,
                        }
                        ,button:{
                            name:"Nuevo precio por kilo"
                        }
                    }} />
                    </div>
                </div>



            </div>
        </>
    )
}