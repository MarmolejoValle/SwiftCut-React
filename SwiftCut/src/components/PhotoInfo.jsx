import { Avatar } from "flowbite-react";

export const PhotoInfo = ({item}) => {
    return (
        <>
            <Avatar img={item?.urlPhoto} size="lg" className=" p-2">
                <div className="space-y-1 font-medium dark:text-white ">
                    <div className="text-lg">{item?.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">${item?.description} </div>
                </div>
            </Avatar>
        </>
    );
}