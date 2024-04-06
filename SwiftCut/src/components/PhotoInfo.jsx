import { Avatar, Card } from "flowbite-react";

export const PhotoInfo = ({ item }) => {
    return (
        <>


            <Card className="max-w-xs" imgSrc={item?.urlPhoto} horizontal>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item?.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {item?.description}                </p>
            </Card>
        </>
    );
}