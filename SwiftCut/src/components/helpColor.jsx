import { Label } from "flowbite-react";

export const HelpColor =({text,color})=>{
    return(<>
    <div className="flex ">
        <Label value={text} className="ml-5 mr-5 "/>
        <div className={`bg-${color}-400 w-5 h-5`}>

        </div>
    </div>
    </>);
}