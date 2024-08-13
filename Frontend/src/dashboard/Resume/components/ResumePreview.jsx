import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';
import ProjectsPreview from './preview/ProjectsPreview';

function ResumePreview() {


    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const { showLinkedIn, setShowLinkedIn } = useContext(ResumeInfoContext);
    const { showGitHub, setShowGitHub } = useContext(ResumeInfoContext);
  return (
    <div className='  mr-10 ml-10 pt-3 mb-0 border-t-[10px] mt-20'
    style={{borderColor:resumeInfo?.themeColor}}
   >
        {/* Personal Details */}
            <PersonalDetailPreview  resumeInfo={resumeInfo} showLinkedIn={showLinkedIn} showGitHub={showGitHub}  />
        {/* Sumary */}
            <SummaryPreview resumeInfo={resumeInfo}/>
        {/* Skills */}
            <SkillsPreview resumeInfo={resumeInfo}/>
        {/* Professional Experince */}
            <ExperiencePreview resumeInfo={resumeInfo}/>
        {/* Projects Details */}
            <ProjectsPreview resumeInfo={resumeInfo}/>
        {/* Educational Details */}
            <EducationalPreview  resumeInfo={resumeInfo}/>
        
    </div>
  )
}

export default ResumePreview
