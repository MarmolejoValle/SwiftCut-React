import { useEffect, useState } from "react";
import { InfoLabel } from "./InfoLabel";

export const Employees = ({ item }) => {
    const [color, setColor] = useState('gray');
    useEffect(() => {
            if(item?.value <= 2){
                setColor("green");
            }
            if(item?.value > 2 && item?.value <= 5 ){
                setColor("orange");
            }
            if(item?.value > 2 && item?.value >= 6 ){
                setColor("red");
            }
          


      });
    return (
        <>
            <div className="border w-full m-1 p-4 rounded-lg " id={`employess-${item?.id}`} onDrop={e=>{
               let idTransfer  = e.dataTransfer 
               .getData('text/plain').split("-") ;
                document.getElementById(e.dataTransfer 
                    .getData('text/plain')).remove();
               
                console.log("Drop : ");
            
            }}
            onDragOver={(e) => {e.preventDefault();}} 
            >
                <div>
                    <p className="text-lg " style={{ color: "var(--blackLigth)" }}>{item?.name} </p>
                </div>
                <InfoLabel info={{ title: "Pedidos en caja", value: item?.value }} />
                <div className={`bg-${color}-500 h-1/6 rounded-sm"`}></div>
            </div>
        </>
    );
}