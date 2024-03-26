import { Avatar, Label } from "flowbite-react";


export const ProfileHead = ({ user }) => {
    return (<>
        <div className='flex py-4 first:pt-0 last:pb-0 absolute right-0 m-3'>
        <Avatar img={user?.personDto?.urlPhoto}alt="avatar of Jese" rounded status="online" />
           
                <div className="ml-3 overflow-hidden">
                    <p className="text-sm font-medium text-slate-900">{user?.personDto?.name} {user?.personDto?.lastName}</p>
                    <p className="text-[.6rem] text-slate-500 truncate">{user?.rolDto?.type}</p>
                </div>
        </div>
       
    </>);
}