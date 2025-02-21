"use client"

import Link from 'next/link';
import Image from 'next/image';
import { logo, sun } from '@public/assets/icons';
import { useState } from 'react';
import { navlinks } from '@constants';


const Icon = ({styles, name, imgUrl, isActive, disabled, handleClick }) => (
    <div className= {`w-[30px] h-[30px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32}'} flex 
    justify-center items-center ${!disabled && 'cursor-pointer'} ${styles} `} onClick={handleClick}>
        {!isActive ? (
            <Image src={imgUrl} alt="fund_logo" width={35} height={35} className='object-contain'/>
        ) : ( 
            <Image src={imgUrl} alt='fund_logo' width={35} height={35} className={`object-contain 
                ${isActive !== name && 'grayscale'}`} />
        )}

    </div>
)

const Nav = () => {

    const [isActive, setIsActive] = useState('dashboard');
    const [isLink, setIsLink] = useState('dashboard');
    return (
      <div className="flex justify-between items-center flex-row sticky bottom-3 w-3/4 m-auto"> 
        {/* <Link href="/">
            <Icon styles="w-[40px] h-[40px] bg-[#2c2f32]" imgUrl={logo} />
        
        </Link> */}

        <div className='flex-1 flex flex-row justify-between
        items-center bg-[#1c1c24] rounded-[15px] w-auto
        py-3 px-6'>
            <div className='flex flex-row justify-center items-center
            gap-3'>
                {navlinks.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.link}
                        >
                            <Icon
                                {...link} 
                                isActive={isActive} 
                                handleClick={() => {
                                    if (!link.disabled) {
                                        setIsActive(link.name);
                                    }
                                }} 
                            />
                        </Link>
                    ))}
            </div>
        </div>
      </div>
    )
  }
  
  export default Nav;