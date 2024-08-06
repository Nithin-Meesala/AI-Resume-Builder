import React, { useContext } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

function PersonalDetailPreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);

  if (!resumeInfo) return null;

  const { showLinkedIn, showGitHub, linkedinusername, linkedinurl, githubusername, githuburl, themeColor } = resumeInfo;

  return (
    <div className="p-4 md:p-3 sm:p-2">
      <h2 className="font-bold text-xl text-center lg:text-xl md:text-lg sm:text-base" style={{ color: themeColor }}>
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className="text-center text-sm font-medium lg:text-sm md:text-xs sm:text-xxs">
        {resumeInfo?.jobTitle}
      </h2>
      <h2 className="text-center text-xs font-normal lg:text-xs md:text-xxs sm:text-[10px]" style={{ color: themeColor }}>
        {resumeInfo?.address}
      </h2>
      <div className="flex flex-wrap justify-between items-center mt-1 md:mt-2 sm:mt-3 gap-2">
        <h2 className="font-normal text-xs lg:text-xs md:text-xxs sm:text-[11px] flex-shrink-0" style={{ color: themeColor }}>
          {resumeInfo?.phone}
        </h2>
        {showLinkedIn && (
          <h2 className="flex items-center text-xs gap-1 lg:text-xs md:text-xxs sm:text-[11px] flex-shrink-0" style={{ color: themeColor }}>
            <img src="/linkedin.svg" alt="" className="h-4 w-4 lg:h-5 lg:w-5 md:h-3 md:w-3 sm:h-3 sm:w-3" />
            <a href={linkedinurl} target="_blank" rel="noopener noreferrer">
              {linkedinusername}
            </a>
          </h2>
        )}
        {showGitHub && (
          <h2 className="flex items-center text-xs gap-1 lg:text-xs md:text-xxs sm:text-[11px] flex-shrink-0" style={{ color: themeColor }}>
            <img src="/github.svg" alt="" className="h-4 w-4 lg:h-5 lg:w-5 md:h-3 md:w-3 sm:h-3 sm:w-3" />
            <a href={githuburl} target="_blank" rel="noopener noreferrer">
              {githubusername}
            </a>
          </h2>
        )}
        <h2 className="font-normal text-xs lg:text-xs md:text-xxs sm:text-[11px] flex-shrink-0" style={{ color: themeColor }}>
          <a href={`mailto:${resumeInfo?.email}`}>
            {resumeInfo?.email}
          </a>
        </h2>
      </div>
      <hr className="border-[1.5px] my-2 lg:my-2 md:my-3 sm:my-4" style={{ borderColor: themeColor }} />
    </div>
  );
}

export default PersonalDetailPreview;
