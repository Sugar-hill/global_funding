"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CustomButton from "@components/CustomButton";
import { logo, search } from "@public/assets/icons";
import { navlinks } from "@constants";

const Topbar = () => {

    const [isActive, setIsActive] = useState('dashboard');
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const address = '0xabc'
  return (
    <div className="flex flex-col justify-center
    mb-[23px] gap-6">  

        <div className="flex flex-row justify-between p-4">

            <Link href="/profile">
                <div className="w-[40px] h-[40px] rounded-full bg-[#2c2f32] flex justify-center 
                items-center cursor-pointer">
                    <Image src={logo} alt='profile' width={24} height={24} 
                    className={'object-contain'} />
                </div>
            </Link>

            <CustomButton 
                btnType="button"
                title={address ? '0xuda...bc' : 'Connect'}
                styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                handleClick={() => {
                    pass
                }}
            />
        </div>

        <div className="flex flex-row max-w-64 py-2 pl-4 pr-2 h-[42px]
        bg-[#1c1c24] rounded-[100px] m-auto">
            <input type="text" placeholder="Search for campaign" className="flex
            w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] 
            text-white bg-transparent outline-none" />

            <div className="w-[60px] h-full rounded-[20px] bg-[#4acd86]
            flex justify-center items-center cursor-pointer" >
                <Image src={search} alt='search' width={18} height={18} 
                className={'object-contain'} />

            </div>
        </div> 
 
    </div>
  )
}

export default Topbar;