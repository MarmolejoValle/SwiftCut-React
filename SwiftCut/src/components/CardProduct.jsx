import { Badge, Button, Card, Label, Table, Textarea } from "flowbite-react";
import { useState } from "react";

export const CardProduct = ({ item }) => {
    const status = (value) => {
        if (value == 0) return { value: "Agotado", mode: "dark" };
        if (value > 40) return { value: "Disponible", mode: "success" };
        if (value < 40) return { value: "Escaso", mode: "warning" };
    }
    const [extrasJson, setExtrasJson] = useState([
        { id: 1, name: "Ahumado", price: 10 },
        { id: 1, name: "Enchilado", price: 40 },
        { id: 1, name: "Cortes", price: 10 }
    ]);
    return (
        <>
            <Card

                renderImage={() => <img className="object-cover h-40 " src={item?.urlPhoto} alt="image 1" />}
            >
                <div className="w-full flex justify-between items-center">
                    <Button color="dark" className="text-xs" size={"xs"} style={{ backgroundColor: "var(--red-3)" }}>Editar</Button>
                    <h2 className="text-xl">{item?.name} </h2>
                    <Badge color={status(item.count).mode} size="xs" className="justify-center font-medium">
                        {status(item.count).value}
                    </Badge>
                </div>

                <div>
                    <Textarea id="comment" disabled={true} required rows={4} className="mb-3 text-center " value={item?.description} />
                    <div className="flex justify-evenly items-center">
                        <Label value="Cantidad" className="text-sm" />
                        <Label value={`${item.count} Kg`} className="text-gray-500" />
                        <Button color="dark" className="text-xs" size={"xs"} style={{ backgroundColor: "var(--red-3)" }}>Editar</Button>

                    </div>
                </div>
                <div className="border-t mt-3 p-3 rounded-sm ">
                    <Label value="Extras" className="text-lg" />
                    <div className="overflow-x-auto h-44">
                        <Table hoverable className="shadow-none" >
                            <Table.Head >

                                <Table.HeadCell>Nombre</Table.HeadCell>
                                <Table.HeadCell>Kilos</Table.HeadCell>
                                <Table.HeadCell>
                                    <span className="sr-only">Edit</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                {extrasJson.map((item, key) => (
                                    <Table.Row key={key} className="bg-white dark:border-gray-700 dark:bg-gray-800">

                                        <Table.Cell>
                                            <div class=" overflow-hidden">
                                                <p class="text-sm font-medium text-slate-900">{item?.name}</p>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Label value={item?.price} className="text-xs text-gray-500" />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button color="red">Eliminar</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>

                    </div>
                </div>

            </Card>
        </>
    );
}