import { Button, FloatingLabel, Label, Textarea } from "flowbite-react"
import { PhotoInfo } from "../../components/PhotoInfo"
import { BarPorcen } from "../../components/BarPorcen"
import { Line } from "@ant-design/charts"

export const Graphics = () => {
    const config = {
        data: {
          type: 'fetch',
          value: 'https://assets.antv.antgroup.com/g2/temperatures1.json',
        },
        xField: (d) => new Date(d.date),
        yField: 'value',
        colorField: 'condition',
        shapeField: 'hvh',
        style: {
          gradient: 'x',
          lineWidth: 2,
        },
        scale: {
          y: { nice: true },
          color: {
          },
        },
      };
    return (
        <>
            <div className="mt-8 h-[80vh] w-full m-2 p-4">

                <div className="flex justify-center h-full w-full">
                    <div className="flex-1 h-full flex flex-col justify-evenly items-center">
                        <div className="w-6/12 border rounded-lg p-5  flex flex-wrap">
                            <div className="w-4/55">
                                <div className="flex flex-col p-1 rounded-lg text-center pr-4 pl-4" style={{ backgroundColor: "var(--blackLigth)" }}>
                                    <Label value="$100" className="text-white  text-lg" />
                                    <Label value="Precio por Kg" className="text-amber-500 text-xs" />
                                </div>
                            </div>
                            <div className="ml-3">
                                <div><Label value="Utilidades" className="text-xs " /></div>
                                <div className="ml-5"><Label value="$13000" className="text-lg  " /></div>
                            </div>
                        </div>
                        <div className="w-4/5 h-3/6 flex flex-col justify-center items-center">
                            <div className="text-center border p-12 rounded-full shadow-lg">
                                <div>
                                    <Label value="20" className="text-center text-6xl font-thin"/><span>%</span>
                                </div>
                                <div>
                                    <Label value="+12.45" className="text-xs text-green-400" /><span></span>
                                </div>

                            </div>
                        </div>
                        <div className="w-4/5 flex justify-center" >
                            <BarPorcen item={{category:"Lomo" , progress:20}}/>
                            <BarPorcen item={{category:"Lomo" , progress:10}}/>
                            <BarPorcen item={{category:"Cabeza" , progress:50}}/>
                            <BarPorcen item={{category:"Lomo" , progress:10}}/>
                        </div>
                    </div>
                    <div className="flex-1">
                        <Line  {...config} />
                        <Button style={{backgroundColor:'var(--red-3)'}} className="text-xs" size={"xs"}>Modificar precio por kilo</Button>
                    </div>
                </div>



            </div>
        </>
    )
}