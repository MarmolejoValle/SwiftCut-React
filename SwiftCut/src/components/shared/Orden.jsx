import { Label } from "flowbite-react"
import { InfoLabel } from "../InfoLabel"

export const Orden = ({ item }) => {
    return (
        <>
            
                <div className="flex-[7] rounded-l-lg border h-full p-2" >
                    <InfoLabel info={{ title: "Cliente", value: item?.name }} />
                    <InfoLabel info={{ title: "Productos", value: item?.value }} />
                    <InfoLabel info={{ title: "Total", value: item?.price }} />
                </div>
                <div className="flex-[1] rounded-r-lg h-full" style={{ backgroundColor: "var(--blackLigth)" }}>

                </div>
           
        </>
    )
}