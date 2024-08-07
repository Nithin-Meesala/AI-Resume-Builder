import React, { useContext, useState } from 'react';
import PersonalDetail from './forms/PersonalDetail';
import { ArrowRight, BookPlus, Home } from 'lucide-react';
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import Projects from './forms/Projects';

function FormSection() {
    const { activeFormIndex, setActiveFormindex } = useContext(ResumeInfoContext);
    const [enabledNext, setEnableNext] = useState(false);
    const params = useParams();

    const handleDivClick = (index) => {
        setActiveFormindex(index);
    };

    return (
        <div>
            <div className='flex justify-between items-center mb-4 '>
                <div className='flex gap-4 '>
                    <Link to={'/dashboard'}>
                        <div className='p-2 border rounded hover:shadow-md bg-primary text-white'>
                            <Home  />
                        </div>
                    </Link>
                    <ThemeColor />
                </div>
            </div>
            <div className='flex flex-wrap gap-1 mt-2 mb-2 mr-0 ml-0  '>
                <div
                    onClick={() => handleDivClick(1)}
                    className={`inline-flex items-center p-2 border rounded cursor-pointer ${activeFormIndex === 1 ? 'bg-primary text-white' : 'bg-transparent text-primary'} ${activeFormIndex === 1 ? 'min-w-max' : 'min-w-[100px]'} sm:min-w-[80px] md:min-w-[100px]`}
                >
                    <span className='text-xs sm:text-xs md:text-base'>Personal</span>
                    <ArrowRight className='text-xs sm:text-xs md:text-base ml-2' />
                </div>
                <div
                    onClick={() => handleDivClick(2)}
                    className={`inline-flex items-center p-2 border rounded cursor-pointer ${activeFormIndex === 2 ? 'bg-primary text-white' : 'bg-transparent text-primary'} ${activeFormIndex === 2 ? 'min-w-max' : 'min-w-[100px]'} sm:min-w-[80px] md:min-w-[100px]`}
                >
                    <span className='text-xs sm:text-xs md:text-base'>Summary</span>
                    <ArrowRight className='text-xs sm:text-xs md:text-base ml-2' />
                </div>
                <div
                    onClick={() => handleDivClick(3)}
                    className={`inline-flex items-center p-2 border rounded cursor-pointer ${activeFormIndex === 3 ? 'bg-primary text-white' : 'bg-transparent text-primary'} ${activeFormIndex === 3 ? 'min-w-max' : 'min-w-[100px]'} sm:min-w-[80px] md:min-w-[100px]`}
                >
                    <span className='text-xs sm:text-xs md:text-base'>Skills</span>
                    <ArrowRight className='text-xs sm:text-xs md:text-base ml-2' />
                </div>
                <div
                    onClick={() => handleDivClick(4)}
                    className={`inline-flex items-center p-2 border rounded cursor-pointer ${activeFormIndex === 4 ? 'bg-primary text-white' : 'bg-transparent text-primary'} ${activeFormIndex === 4 ? 'min-w-max' : 'min-w-[100px]'} sm:min-w-[80px] md:min-w-[100px]`}
                >
                    <span className='text-xs sm:text-xs md:text-base'>Experience</span>
                    <ArrowRight className='text-xs sm:text-xs md:text-base ml-2' />
                </div>
                <div
                    onClick={() => handleDivClick(5)}
                    className={`inline-flex items-center p-2 border rounded cursor-pointer ${activeFormIndex === 5 ? 'bg-primary text-white' : 'bg-transparent text-primary'} ${activeFormIndex === 5 ? 'min-w-max' : 'min-w-[100px]'} sm:min-w-[80px] md:min-w-[100px]`}
                >
                    <span className='text-xs sm:text-xs md:text-base'>Projects</span>
                    <ArrowRight className='text-xs sm:text-xs md:text-base ml-2' />
                </div>
                <div
                    onClick={() => handleDivClick(6)}
                    className={`inline-flex items-center p-2 border rounded cursor-pointer ${activeFormIndex === 6 ? 'bg-primary text-white' : 'bg-transparent text-primary'} ${activeFormIndex === 6 ? 'min-w-max' : 'min-w-[100px]'} sm:min-w-[80px] md:min-w-[100px]`}
                >
                    <span className='text-xs sm:text-xs md:text-base'>Education</span>
                    <BookPlus className='text-xs sm:text-xs md:text-base ml-2' />
                </div>
            </div>
            {/* Render the appropriate form based on activeFormIndex */}
            {activeFormIndex === 1 ? 
                <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
                /* Summary */
                : activeFormIndex === 2 ?
                <Summary enabledNext={(v) => setEnableNext(v)} />
                /* Skills */
                : activeFormIndex === 3 ?
                <Skills enabledNext={(v) => setEnableNext(v)} />
                /* Experience */
                : activeFormIndex === 4 ?
                <Experience enabledNext={(v) => setEnableNext(v)} />
                /* Projects */
                : activeFormIndex === 5 ?
                <Projects enabledNext={(v) => setEnableNext(v)} />
                /* Education */
                : activeFormIndex === 6 ?
                <Education enabledNext={(v) => setEnableNext(v)} />
                : activeFormIndex === 7 ?
                <Navigate to={'/my-resume/' + params?.resumeid + "/view"} />
                : null}
        </div>
    );
}

export default FormSection;
