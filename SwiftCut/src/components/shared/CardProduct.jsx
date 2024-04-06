import { Card, Label } from "flowbite-react"
import { InfoLabel } from "../InfoLabel"

export const CardProduct = ({ item }) => {
    return (
        <>

            <Card className="min-w-2xl  min-h-96 m-3 " imgSrc={item?.productExtrasDto?.productDto?.urlPhoto} horizontal>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item?.productExtrasDto?.productDto?.name}
                </h5>
                <div className="flex flex-col justify-between h-full items-stretch">

                    <div className="p-2">
                        <p className="font-normal text-gray-700 dark:text-gray-400 text-sm">
                            {item?.productExtrasDto?.productDto?.description}
                        </p>
                    </div>
                    <div className="p-2 border-t">
                        <p className="font-normal text-gray-900  text-xl">
                            {item?.productExtrasDto?.extraDto?.name}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400 text-sm">
                            {item?.productExtrasDto?.extraDto?.description}
                        </p>
                    </div>
                    <div className="p-2 border-t">
                        <p className="font-normal text-red-900  text-xl">
                          <span className="text-sm text-gray-900 ">Cantidad</span> { `${item?.total}Kg`}
                        </p>

                    </div>

                </div>

            </Card>

        </>
    )
}