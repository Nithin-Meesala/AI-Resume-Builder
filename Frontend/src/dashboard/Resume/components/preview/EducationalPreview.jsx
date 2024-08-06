import React from 'react';

function EducationalPreview({ resumeInfo = {} }) {
  const education = resumeInfo.education || []; // Default to empty array if undefined

  return (
    <div className='my-6'>
      <h2 className='font-bold text-md mb-2' style={{ color: resumeInfo?.themeColor }}>
        EDUCATION
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {education.map((edu, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm font-semibold' style={{ color: resumeInfo?.themeColor }}>
            {edu?.universityName}
          </h2>
          <h2 className='text-xs flex justify-between'>
            {edu?.degree} in {edu?.major}
            <span>{edu?.startDate} To {edu?.endDate}</span>
          </h2>
          {/* Score */}
          <p className='text-xs my-2'>{edu?.score}</p>
          {/* Score */}
            <p className='text-xs my-2'>{edu?.description}</p>
        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;
