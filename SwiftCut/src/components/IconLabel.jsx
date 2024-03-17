import { Label } from "flowbite-react";

export const IconLabel = ({Icon,value,id,boolean})=>{
    return(
        <div className="flex items-center mt-1 mb-1 hover:border-l-4 duration-75" id={id}>
                        <Icon size={25} className="mr-4 ml-5" />
                        <Label value={value} className="text-white text-[.7rem]" hidden={boolean}  />
         </div>
    );
}