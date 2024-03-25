import { Avatar, Badge, Table } from "flowbite-react";
import { useState } from "react";
import { PiIdentificationBadgeThin } from "react-icons/pi";
import { Link } from "react-router-dom";

export const ProductList = () => {
    const [productJson, setProductJson] = useState([
        { id: 2, urlPhoto: "https://ingredienta.com/wp-content/uploads/2016/06/lomo-cerdo-ing.jpg", name: "Nomalf", extra: 7, count: 10, kilos: 10 },
        { id: 2, urlPhoto: "https://ingredienta.com/wp-content/uploads/2016/06/lomo-cerdo-ing.jpg", name: "Nomalf", extra: 7, count: 0, kilos: 40 },
        { id: 2, urlPhoto: "https://ingredienta.com/wp-content/uploads/2016/06/lomo-cerdo-ing.jpg", name: "Nomalf", extra: 7, count: 100, kilos: 402 },
        { id: 2, urlPhoto: "https://ingredienta.com/wp-content/uploads/2016/06/lomo-cerdo-ing.jpg", name: "Nomalf", extra: 7, count: 30 ,kilos: 0 },
        { id: 2, urlPhoto: "https://ingredienta.com/wp-content/uploads/2016/06/lomo-cerdo-ing.jpg", name: "Nomalf", extra: 7, count: 0, kilos: 40 },
        { id: 2, urlPhoto: "https://ingredienta.com/wp-content/uploads/2016/06/lomo-cerdo-ing.jpg", name: "Nomalf", extra: 7, count: 100, kilos: 402 },
        { id: 2, urlPhoto: "https://ingredienta.com/wp-content/uploads/2016/06/lomo-cerdo-ing.jpg", name: "Nomalf", extra: 7, count: 30 ,kilos: 0 },
        { id: 2, urlPhoto: "https://ingredienta.com/wp-content/uploads/2016/06/lomo-cerdo-ing.jpg", name: "Nomalf", extra: 7, count: 0, kilos: 40 },
        { id: 2, urlPhoto: "https://ingredienta.com/wp-content/uploads/2016/06/lomo-cerdo-ing.jpg", name: "Nomalf", extra: 7, count: 100, kilos: 402 },
        { id: 2, urlPhoto: "https://ingredienta.com/wp-content/uploads/2016/06/lomo-cerdo-ing.jpg", name: "Nomalf", extra: 7, count: 30 ,kilos: 0 }

    ]);

    const status = (value) =>{
        if(value == 0 ) return {value : "Agotado" , mode :"dark"};
        if(value > 40 ) return {value : "Disponible" , mode :"success"};
        if(value < 40 ) return {value : "Escaso" , mode :"warning"};


    }
    return (
        <>
         <div className="overflow-x-auto h-4/6 rounded-lg p-3" >
            <Table  hoverable className="shadow-none" >
                <Table.Head className="" >
                    <Table.HeadCell>
                        <span className="sr-only">Photo</span>
                    </Table.HeadCell>
                    <Table.HeadCell>Nombre</Table.HeadCell>
                    <Table.HeadCell>Kilos</Table.HeadCell>
                    <Table.HeadCell>Extras</Table.HeadCell>
                    <Table.HeadCell>Estado</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {productJson.map((item, key) => (<Table.Row key={key} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="">
                            <div className="bg-cover h-14 w-14" style={{backgroundImage:`url('${item.urlPhoto} ')`} }></div>
                        </Table.Cell>
                        <Table.Cell>
                            <div class=" overflow-hidden">
                                <p class="text-sm font-medium text-slate-900">{item?.name}</p>
                            </div>
                        </Table.Cell>
                        <Table.Cell>{item?.kilos} </Table.Cell>
                        <Table.Cell>{item?.extra}</Table.Cell>
                        <Table.Cell>
                            <Badge color={status(item.count).mode} size="sm" className="justify-center font-medium">
                                {status(item.count).value}
                            </Badge>
                        </Table.Cell>

                        <Table.Cell>
                            <PiIdentificationBadgeThin size={25} />
                        </Table.Cell>
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            </div>
        </>);
}