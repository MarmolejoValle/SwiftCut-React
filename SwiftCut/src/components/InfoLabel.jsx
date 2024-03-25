import { Label } from "flowbite-react";

export const InfoLabel = ({info}) => {
    return (
        <>
            <div className="flex m-1 ">
                <Label value={info?.title} className="flex-1 text-sm font-semibold flex items-center" />
                <Label value={info?.value} className="flex-1 text-xs flex  items-center text-gray-600" />
            </div>
        </>
    );
}