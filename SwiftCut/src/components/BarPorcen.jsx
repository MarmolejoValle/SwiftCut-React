import { Label, Progress } from "flowbite-react";

export const BarPorcen = ({ item }) => {
    return (
        <>
            <div className="w-14 m-2 p-1">
                <div className="flex flex-col text-center">
                    <Label value={`${item.progress}%`}  className="text-xs text-gray-400"/>
                    <Label value={item.category}  className="text-sm text-amber-500" />
                </div>
                <Progress progress={item.progress} color="dark"size="sm" />
            </div>
        </>
    );
} 