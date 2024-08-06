import { DotIcon } from 'lucide-react'
import React from 'react'

function ExperiencePreview({resumeInfo}) {
  return (
    <div className='my-6'>

        <h2 className=' font-bold text-md mb-2'
         style={{color:resumeInfo?.themeColor}}>
           EXPERIENCE/INTERNSHIPS</h2>
        <hr  style={{borderColor:resumeInfo?.themeColor}}/>

        {resumeInfo?.experience?.map((experience,index)=>(
          <div  key={index} className='my-5 text-xs text-start '>
              <h2 className='text-sm font-semibold'
              style={{color:resumeInfo.themeColor}}>
                {experience?.workTitle}</h2>
              <h2 className='text-xs flex justify-between '>{experience?.companyName},
                 {experience?.city}, {experience?.state}
                 <span>{experience?.startDate} To {experience?.endDate}
                 </span>
                 </h2>
                 
                 <div dangerouslySetInnerHTML={{__html:experience?.workSummary}}
                  className='mt-2' style={{lineHeight:1}}></div> 
              
          </div>
        ))}
    </div>
  )
}

export default ExperiencePreview