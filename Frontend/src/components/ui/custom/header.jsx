import React from 'react';
import { Button } from '../button';
import { Link, useNavigate } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';

function Header() {
    const { isSignedIn } = useUser();
    const navigate = useNavigate();

    const handleLogo = () => {
        navigate("/");
    }

    return (
        <div className='flex flex-wrap items-center justify-between p-3 shadow-md'>
            {/* Logo Section */}
            <div className='flex-shrink-0'>
                <img 
                    src="/logo3.svg" 
                    alt="Logo" 
                    onClick={handleLogo} 
                    className='cursor-pointer w-12 h-12 sm:w-9 sm:h-9 md:w-[100px] md:h-[50px] lg:w-[100px] lg:h-[50px]'
                />
            </div>
            {/* Title Section */}
            <div className='flex-grow text-center text-xl font-black hidden md:block'>
                <h1 className='text-base md:text-4xl lg:text-4xl sm:text-xs whitespace-nowrap'>AI Resume Builder</h1>
            </div>
            {/* Button & User Icon Section */}
            <div className='flex-shrink-0 flex items-center space-x-2'>
                {isSignedIn ? 
                    <>
                        <Link to='/dashboard'>
                            <Button variant='outline' className="bg-black text-white text-xs sm:text-sm whitespace-nowrap">Dashboard</Button>
                        </Link>
                        <UserButton className='text-xs sm:text-sm' />
                    </>
                    :
                    <Link to='/auth/sign-in'>
                        <Button className='text-xs sm:text-sm'>Get Started</Button>
                    </Link>
                }
            </div>
        </div>
    );
}

export default Header;
