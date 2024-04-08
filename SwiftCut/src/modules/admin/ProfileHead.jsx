import { Avatar, Label } from "flowbite-react";
import Container from "postcss/lib/container";


export const ProfileHead = ({ user, boolean }) => {
    return (<>
        <div className='flex py-4 first:pt-0 last:pb-0  right-0 m-1 '   >
        <Avatar img={user?.personDto?.urlPhoto}alt="avatar of Jese" size={"xs"} rounded  className={boolean?"hidden":""}/>
           
                <div className="ml-3 overflow-hidden flex flex-col">
                    <Label className="text-sm font-medium text-white" hidden={boolean} >{user?.personDto?.name} {user?.personDto?.lastName}</Label>
                    <Label className="text-[.6rem] text-amber-200 truncate" hidden={boolean} >{user?.rolDto?.type}</Label>
                </div>
        </div>
    </>);
}