import React, { useContext, useState } from 'react';
import PersonalDetail from './forms/PersonalDetail';
import { ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

    const getButtonClassName = (index) => 
        `border-none ${activeFormIndex === index ? 'gap-1' : 'bg-transparent gap-1 text-primary'}`;

    return (
        <div>
            <div>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-4'>
                        <Link to={'/dashboard'}>
                            <Button><Home /></Button>
                        </Link>
                        <ThemeColor />
                    </div>
                </div>
                <div className='flex flex-wrap gap-2 m-2'>
                    <Button variant="outline" className={getButtonClassName(1)} onClick={() => setActiveFormindex(1)}>
                        Personal <ArrowRight />
                    </Button>
                    <Button variant="outline" className={getButtonClassName(2)} onClick={() => setActiveFormindex(2)}>
                        Summary <ArrowRight />
                    </Button>
                    <Button variant="outline" className={getButtonClassName(3)} onClick={() => setActiveFormindex(3)}>
                        Skills <ArrowRight />
                    </Button>
                    <Button variant="outline" className={getButtonClassName(4)} onClick={() => setActiveFormindex(4)}>
                        Experience <ArrowRight />
                    </Button>
                    <Button variant="outline" className={getButtonClassName(5)} onClick={() => setActiveFormindex(5)}>
                        Projects <ArrowRight />
                    </Button>
                    <Button variant="outline" className={getButtonClassName(6)} onClick={() => setActiveFormindex(6)}>
                        Education
                    </Button>
                </div>
            </div>
            {/* Personal Details */}
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
