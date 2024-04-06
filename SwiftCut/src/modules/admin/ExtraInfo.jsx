import { FloatingLabel, Label, Textarea } from "flowbite-react"
import { PhotoInfo } from "../../components/PhotoInfo"
import { useEffect, useState } from "react";
import { AxiosClientJSON } from "../../config/http-client/axios-client";
import { useParams } from "react-router-dom";
import { FormElastic } from "../../components/FormElastic";

export const ExtraInfo = () => {
    const [extraJson, setExtraJson] = useState({});
    const [productJson, setProductJson] = useState([]);

    const fetchData = async () => {
        try {
            const response = await AxiosClientJSON({
                url: '/api/extras/read',
                method: 'POST',
                data: { id: idExtra }
            });
            const responseProduct = await AxiosClientJSON({
                url: '/api/product/readExtras',
                method: 'POST',
                data: { idExtras: idExtra }
            });
            
            
            
            
            setExtraJson(response.data);
            setProductJson(responseProduct.data);

           
        } catch (error) {
            // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
            console.error('Error fetching data:', error);
        }
    };


    const { idExtra } = useParams();
    useEffect(() => {

       
        fetchData();

    }, []);
    return (
        <>
            <div className="mt-8 w-full  p-4">
                <div className="flex justify-center h-full w-full">
                
                    <div className="flex  items-center w-3/4 m-5 p-3">
                        <div className="flex-[2] p-2 m-2">
                            <FloatingLabel variant="outlined" label="Nombre" disabled={true} value={extraJson?.name} />
                            <Textarea id="comment" placeholder="Descripcion" required rows={4} className="mb-3" disabled={true}  value={extraJson?.description}/>
                            <FloatingLabel variant="outlined" label="Precio" disabled={true} value={extraJson?.price} />
                            <FloatingLabel variant="outlined" label="Productos Registrados" disabled={true} value={"5"} />
                            <FormElastic refresh={fetchData} key={""} item={{
                        title: "Modificar de Extra",
                        data: [
                            {id:"name" , text: "Nombre" , type:"text" , placeholder:"Alberto" , value : extraJson?.name} ,
                            {id:"description" , text: "Descripcion" , type:"textArea" , placeholder:"Cardenas Herrera" , value:extraJson?.description},
                            {id:"price" , text: "Precio" , type:"tel" , placeholder:"", value:extraJson?.price},
                            {id:"id" , text: "" , type:"hidden" , placeholder:"" , value : extraJson?.id}

                        ],select:[],
                        form: {
                            method: 'PUT',
                            url: '/api/extras/update',
                            headers:{ "Content-Type": "multipart/form-data"},
                            axios:AxiosClientJSON,
                            redirect :`/Extras`
                        }
                        ,button:{
                            name:"Modificar"
                        },
                        delete:{
                            url:"/api/extras/delete",
                            values:{id:extraJson?.id},
                            navigate : "/Extras"
                        }
                    }} />
                        </div>
                        <div className=" flex-[3] h- m-5 flex flex-col border rounded-lg overflow-hidden">
                           
                                <Label value="Productos Registrados" className=" text-1xl text-center p-3 text-white " style={{backgroundColor:'var(--blackLigth)'}} />
                            <div className="overflow-y-scroll h-96">
                                {
                                    productJson.map((item)=>{
                                        return(<>
                                                                        <PhotoInfo item={item}/>

                                        </>);
                                    })
                                }
                               
                            </div>
                        </div>


                    </div>
                </div>



            </div>
        </>
    )
}