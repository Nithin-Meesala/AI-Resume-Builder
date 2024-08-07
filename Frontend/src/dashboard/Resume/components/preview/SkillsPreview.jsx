import React from 'react';

function SkillsPreview({ resumeInfo = {} }) {
  const skills = resumeInfo.skills || []; // Default to empty array if undefined
  const themeColor = resumeInfo.themeColor || '#000'; // Fallback color

  return (
    <div className='my-6'>
      <h2 className='font-bold text-md mb-2' style={{ color: themeColor }}>
        SKILLS
      </h2>
      <hr style={{ borderColor: themeColor }} />
      <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-1 gap-x-12 my-4 print:grid-cols-6'>
        {skills.map((skill, index) => (
          <div key={index} className='flex justify-between items-center print:text-xs'>
            <h2 className='lg:text-xs md:text-sm sm:text-sm text-center'>{skill.name}</h2>
{/*             <div className='h-2 bg-gray-300 w-[80px]'>
              <div className='h-2 skill-bar' style={{
                backgroundColor: themeColor,
                width: skill?.rating * 20 + '%',
              }}></div>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;
