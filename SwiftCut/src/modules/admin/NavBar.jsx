import { Label } from "flowbite-react";
import { IoIosMenu } from "react-icons/io";
import { GiHandTruck } from "react-icons/gi";
import { HiTruck } from "react-icons/hi2";
import { RiBarChartGroupedLine } from "react-icons/ri";
import { GiRiceCooker } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import logoWhite from '../../assets/img/logo-white.png'
import { IconLabel } from "../../components/IconLabel";
import { useState } from "react";




export const NavBar = () => {
    const [labelVision, setLabelVision] = useState({ vision: false, wigth: "w-44" });
    const changeSize = () => {
        if (labelVision.vision) setLabelVision({ vision: false, wigth: "w-44" });
        else setLabelVision({ vision: true, wigth: "w-14" });

    }
    return (
        <>
            <div id="barNav" style={{ backgroundColor: "var(--red-3)" }} className={`text-white ${labelVision.wigth} h-[90vh] sticky  flex flex-col justify-between  rounded-xl m-8 relative duration-75`}>

                <div className="flex flex-col mt-3" id="menu" onClick={changeSize}>
                    <IconLabel Icon={IoIosMenu} value={"Menu"} id={"users"} boolean={labelVision.vision} />
                </div>
                <div className="flex flex-col ">
                    <IconLabel Icon={FaUsers} value={"Usuarios"} id={"Usuarios"} boolean={labelVision.vision} />
                    <IconLabel Icon={RiBarChartGroupedLine} value={"Graficas"} id={"users"} boolean={labelVision.vision} />
                    <IconLabel Icon={HiTruck} value={"Pedidos"} id={"Pedidos"} boolean={labelVision.vision} />
                    <IconLabel Icon={GiRiceCooker} value={"Extras"} id={"Extras"} boolean={labelVision.vision} />
                    <IconLabel Icon={GiHandTruck} value={"Inventario"} id={"users"} boolean={labelVision.vision} />
                </div>
                <div className="flex flex-col mb-3" id="footer">
                    <IconLabel Icon={CiLogout} value={"Usuarios"} id={"Salir"} boolean={labelVision.vision} />
                    <div className="flex justify-center mt-4">
                        <img src={logoWhite} alt="" style={{ width: 100, height: 16 }} hidden={labelVision.vision} />

                    </div>
                </div>
            </div>
        </>
    );
}