import { Card, Label } from "flowbite-react";

export const Category = ({ item }) => {
    return (
        <>

        <div className={"border w-48 h-32 bg-cover bg-center rounded-md overflow-hidden"} style={{backgroundImage : `url('${item?.urlPhoto}')`}}>
            <Label value={item?.name} className="flex justify-center text-xl items-center text-white h-full bg-black/[.5]" />

        </div>
           
        </>
    );
}
