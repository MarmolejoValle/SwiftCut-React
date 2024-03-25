import { Avatar, Badge, Button, Label, Table } from "flowbite-react";
import { BiFoodMenu } from "react-icons/bi";
import { Link } from "react-router-dom";

export const Extras = () =>{
    return(
        <>
          <div className=" w-full p-5">
                <div className="m-4 flex" >
                    <Button  color="dark" size={'xs'} className="ml-3" style={{ backgroundColor: 'var(--red-3)' }}>Agregar</Button>


                </div>
                <Table striped={"row"} hoverable >
                    <Table.Head >
                        
                        <Table.HeadCell>Nombre</Table.HeadCell>
                        <Table.HeadCell>Precio</Table.HeadCell>
                        <Table.HeadCell>Descripcion</Table.HeadCell>
                        <Table.HeadCell>Registrados</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                           
                            <Table.Cell>
                                <div class=" overflow-hidden">
                                    <p class="text-sm font-medium text-slate-900">Alberto Marmolejo</p>
                                </div>
                            </Table.Cell>
                            <Table.Cell>$120</Table.Cell>
                            <Table.Cell>Sason a la carne</Table.Cell>
                            <Table.Cell>
                                10
                            </Table.Cell>

                            <Table.Cell>
                                <Link to={"/Extras/Info"}>
                                <BiFoodMenu size={25}/>
                                 
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                        
                    </Table.Body>
                </Table>
            </div>

        </>
    );
}