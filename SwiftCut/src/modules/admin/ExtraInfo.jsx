import { FloatingLabel, Label, Textarea } from "flowbite-react"
import { PhotoInfo } from "../../components/PhotoInfo"

export const ExtraInfo = () => {
    return (
        <>
            <div className="mt-8 h-[80vh] w-full  p-4">
                <div className="flex justify-center h-full w-full">
                    <div className="flex  items-center w-3/4 m-5 p-3">
                        <div className="flex-[2] p-2 m-2">
                            <FloatingLabel variant="outlined" label="Nombre" disabled={true} value={"Adobado"} />
                            <Textarea id="comment" placeholder="Descripcion" required rows={4} className="mb-3" disabled={true}  />
                            <FloatingLabel variant="outlined" label="Precio" disabled={true} value={"10"} />
                            <FloatingLabel variant="outlined" label="Productos Registrados" disabled={true} value={"5"} />

                        </div>
                        <div className=" flex-[3] h-full m-5 flex flex-col border rounded-lg overflow-hidden">
                           
                                <Label value="Productos Registrados" className="text-1xl text-center p-3 text-white " style={{backgroundColor:'var(--blackLigth)'}} />
                            <div className="overflow-y-scroll">
                                <PhotoInfo item={{urlPhoto:"https://editorialtelevisa.brightspotcdn.com/wp-content/uploads/2019/09/chuleta-cerdo-pimientos-balsamico.jpg",name:"Chuleta",description:"Chuleta es iuna parte sabrosota del ...."}}/>
                                <PhotoInfo item={{urlPhoto:"https://editorialtelevisa.brightspotcdn.com/wp-content/uploads/2019/09/chuleta-cerdo-pimientos-balsamico.jpg",name:"Chuleta",description:"Chuleta es iuna parte sabrosota del ...."}}/>
                                <PhotoInfo item={{urlPhoto:"https://editorialtelevisa.brightspotcdn.com/wp-content/uploads/2019/09/chuleta-cerdo-pimientos-balsamico.jpg",name:"Chuleta",description:"Chuleta es iuna parte sabrosota del ...."}}/>
                                <PhotoInfo item={{urlPhoto:"https://editorialtelevisa.brightspotcdn.com/wp-content/uploads/2019/09/chuleta-cerdo-pimientos-balsamico.jpg",name:"Chuleta",description:"Chuleta es iuna parte sabrosota del ...."}}/>
                                <PhotoInfo item={{urlPhoto:"https://editorialtelevisa.brightspotcdn.com/wp-content/uploads/2019/09/chuleta-cerdo-pimientos-balsamico.jpg",name:"Chuleta",description:"Chuleta es iuna parte sabrosota del ...."}}/>
                                <PhotoInfo item={{urlPhoto:"https://editorialtelevisa.brightspotcdn.com/wp-content/uploads/2019/09/chuleta-cerdo-pimientos-balsamico.jpg",name:"Chuleta",description:"Chuleta es iuna parte sabrosota del ...."}}/>
                                <PhotoInfo item={{urlPhoto:"https://editorialtelevisa.brightspotcdn.com/wp-content/uploads/2019/09/chuleta-cerdo-pimientos-balsamico.jpg",name:"Chuleta",description:"Chuleta es iuna parte sabrosota del ...."}}/>

                            </div>
                        </div>


                    </div>
                </div>



            </div>
        </>
    )
}