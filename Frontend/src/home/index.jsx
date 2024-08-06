import Header from '@/components/ui/custom/header'
import { UserButton, useUser } from '@clerk/clerk-react'
import { ArrowDownIcon, ArrowUpIcon, AtomIcon, Edit, Share2 } from 'lucide-react'
import React, { useState } from 'react'

function Home() {

  const {isSignedIn} = useUser();
  const [clicked,setClicked] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
    setClicked(true)
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // This makes the scrolling smooth
    });
    setClicked(false);
  };
  return (
    <>
  
  <div>
    <Header/>
    </div>
    <div>
    {/* <img src={'/grid.svg'} className="absolute z-[-10] w-full" width={1200} height={300} /> */}
    {/* <Header/> */}
   <section className=" z-50">
    {!clicked?<div onClick={scrollToBottom} className='fixed animate-bounce cursor-pointer bottom-[100px] right-[55px] p-1   h-[70px] w-[70px] rounded-full bg-primary text-white shadow-lg focus:outline-none '>
      <ArrowDownIcon className='h-[50px] w-[50px] m-1.5'></ArrowDownIcon>
    </div>:<div onClick={scrollToTop} className='fixed animate-bounce cursor-pointer bottom-[100px] right-[55px] p-1   h-[70px] w-[70px] rounded-full bg-primary text-white shadow-lg focus:outline-none '>
      <ArrowUpIcon className='h-[50px] w-[50px] m-1.5'></ArrowUpIcon>
    </div>}
    
    
  <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
      <a href="https://github.com/Nithin-Meesala" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
          <span className="text-xs bg-primary rounded-full text-white px-4 py-1.5 mr-3">New</span> <span className="text-sm font-medium">Nithin.github.com All new Apps</span> 
          <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
      </a>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white ">
        Build Your Resume <span className='text-primary'>With AI</span> </h1>
      <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Effortlessly Craft a Standout Resume with Our AI-Powered Builder</p>
      <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a href="/dashboard" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              {isSignedIn?"Start Building your resume":"Get Started"}
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </a>
          <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              <svg className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
              Watch video
          </a>  
      </div>
      <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36  ">
          <span className="font-semibold text-gray-400 uppercase">Suitable for all </span>
          <div className="flex flex-wrap justify-center  items-center mt-8 text-gray-500 sm:justify-between">
              <a href="#" className=" mb-5 text-lg lg:mb-0   flex items-center gap-3
              ">
                  <img src="/student.svg" alt="student-image"  className='h-20 w-15 opacity-50  hover:opacity-85'/>  Student's                      
              </a>
              
              <a href="#" className="  mb-5 text-lg lg:mb-0  flex items-center gap-3
              ">
                  <img src="/fresher.svg" alt="student-image"  className='h-20 w-15 opacity-50 hover:opacity-85'/>  Fresher's                      
              </a>
              <a href="#" className=" mb-5 text-lg lg:mb-0    flex items-center gap-3
              ">
                  <img src="/professional.svg" alt="student-image"   className='h-20 w-15 opacity-50 hover:opacity-85'/>Experienced                      
              </a>         
          </div>
      </div> 
  </div>
</section>
<section className="py-8 bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
<h2 className="font-bold text-3xl">How it Works?</h2>
<h2 className="text-md text-gray-500">Create your Job-ready resume using AI in 3 easy steps</h2>

<div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
    <a
      className="block rounded-xl border bg-white
       border-gray-200 p-8 shadow-xl transition
       hover:border-pink-500/10 hover:shadow-pink-500/10"
      href="#"
    >
     <AtomIcon className='h-8 w-8'/>

      <h2 className="mt-4 text-xl font-bold text-black">Give Your Resume a Title</h2>

      <p className="mt-1 text-sm text-gray-600">
      Start by giving your resume a strong title that captures attention and reflects
       your professional identity. This sets the tone for the rest of your application.
      </p>
    </a>

    <a
      className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
      href="#"
    >
    <Edit className='h-8 w-8'/>

      <h2 className="mt-4 text-xl font-bold text-black">Edit Your resume using AI </h2>

      <p className="mt-1 text-sm text-gray-600">
      Utilize our AI tools to enhance and personalize your resume, ensuring it stands out to potential employers.
       Tailor your skills and experiences to match job requirements seamlessly.
      </p>
    </a>

    <a
      className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
      href="#"
    >
    <Share2 className='h-8 w-8' />

      <h2 className="mt-4 text-xl font-bold text-black">Download and Share your AI generated Resume</h2>

      <p className="mt-1 text-sm text-gray-600">
      Easily download and share your polished resume, ready to impress recruiters and secure your dream job.
       Share it across multiple platforms with just a few clicks.
      </p>
    </a>

  
  </div>

  <div className="mt-12 text-center">
    <a
      href="/dashboard"
      className="inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400"
    >
      {isSignedIn?"Start Building your resume":"Get Started"}
    </a>
  </div>
  <div className='flex justify-center items-center mt-5 '><p>Copyright &copy; Nithin Meesala 2024</p></div>
  </section>
  
</div>

   </>
  )}
 

export default Home 