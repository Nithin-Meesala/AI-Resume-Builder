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
        <div className='flex flex-wrap items-center justify-between p-3 shadow-md space-x-4'>
            {/* Logo Section */}
            <div className='flex-shrink-0'>
                <img 
                    src="/logo.svg" 
                    width={50} // Default width for responsiveness
                    height={80} // Default height for responsiveness
                    alt="Logo" 
                    onClick={handleLogo} 
                    className='cursor-pointer w-12 h-16 sm:w-9 sm:h-12 md:w-24 md:h-30 lg:w-[100px] lg:h-[50px]'
                />
            </div>
            {/* Title Section */}
            <div className='flex-grow text-center text-xl font-black'>
                <h1 className='text-base md:text-xl lg:text-4xl sm:text-xs'>AI Resume Builder</h1>
            </div>
            {/* Button & User Icon Section */}
            <div className='flex-shrink-0 flex items-center space-x-2'>
                {isSignedIn ? 
                    <>
                        <Link to='/dashboard'>
                            <Button variant='outline' className="bg-black text-white text-xs sm:text-sm">Dashboard</Button>
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
