import React, { useEffect, useRef, useState } from 'react'
import { signOut, useSession } from "next-auth/react";

export const NavbarProfile = () => {
    const [menuOpen, setMenuOpen]= useState<boolean>(false);
    const {data: session } = useSession();
    const menuRef = useRef<any>(null);

    useEffect(()=> {
        function handleClickAfuera(event:any){
            if (menuRef.current && !menuRef.current.contains(event.target)){
                setMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickAfuera);
        return () => {
            document.removeEventListener("mousedown", handleClickAfuera)
        }
    }, []);

    const modalMenu = () => {
        setMenuOpen(!menuOpen);
    }


  return (
    <div className='mr-2 md:mr-4 lg:mr-5 flex items-center flex-none cursor-pointer right-0'
    onClick={modalMenu}
    ref={menuRef}
    > 
    {/*<div className='hidden sm:block select-none'>{session?.user?.name}</div>
    <div>
        <img src={session?.user?.image?? `https://ui-avatars.com/api/?name=${session.user?.name}&background=DD4044&color=fff`} 
        alt='avatar'
        className='h-[40px] w-[40px] -mt-[2px] rounded-full ml-3 border cursor-pointer border-gray-600'/>
  </div>*/}
    </div>
  )
}
