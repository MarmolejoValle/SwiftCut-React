import { Card, Label } from "flowbite-react";
import { FormElastic } from "./FormElastic";
import { AxiosClientFormData } from "../config/http-client/axios-client";

export const Category = ({ item  , hidden , refresh}) => {
    return (
        <>
        <div className="flex flex-col items-center">
        <div className={"border w-48 h-32 bg-cover bg-center rounded-md overflow-hidden "} style={{backgroundImage : `url('${item?.urlPhoto}')`}}>
            <Label value={item?.name} className="flex justify-center text-xl items-center text-white h-full bg-black/[.5]" />
            
        </div>
        <FormElastic  refresh={refresh} hidden={"hidden"} key={""} item={{
                            title: "Actualizar Categoría",
                            data: [
                                { id: "name", text: "Nombre", type: "text", placeholder: "", value:item?.name },
                                { id: "image", text: "Foto", type: "file" },
                                { id: "description", text: "Descripción", type: "textArea", placeholder: "", value: item?.description },
                                { id: "id", text: "Foto", type: "hidden"  , value:item?.id},



                            ], select: [],
                            form: {
                                method: 'PUT',
                                url: '/api/category/update',
                                headers: { "Content-Type": "multipart/form-data" },
                                axios: AxiosClientFormData,
                            }
                            , button: {
                                name: "Modificar"
                            },
                            delete:{
                                url:"/api/category/delete",
                                values:{id:item?.id},
                            }
                        }} />
                        </div>
        </>
    );
}
