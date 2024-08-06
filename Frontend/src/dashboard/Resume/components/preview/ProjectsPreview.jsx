import React from 'react';

function ProjectsPreview({ resumeInfo = {} }) {
  const projects = resumeInfo.projects || []; // Default to empty array if undefined

  return (
    <div className='my-6'>
      <h2 className='font-bold text-md mb-2' style={{ color: resumeInfo?.themeColor }}>
        PROJECTS
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {projects.map((project, index) => (
        <div key={index} className='my-5'>
          <div className="flex justify-between">
            <h2 className='text-sm font-semibold' style={{ color: resumeInfo?.themeColor }}>
              {project?.projectTitle}
            </h2>
            <h2 className='text-xs'></h2>
          </div>
          <p className='text-xs my-2'>{project?.projectDescription}</p>
        </div>
      ))}
    </div>
  );
}

export default ProjectsPreview;
