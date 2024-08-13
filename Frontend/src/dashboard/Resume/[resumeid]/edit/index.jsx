import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';
import dummy from '@/data/dummy';

function EditResume() {

  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  const [activeFormIndex, setActiveFormindex] = useState(1);
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [showGitHub, setShowGitHub] = useState(false);

  useEffect(() => {
    GetResumeInfo();
    setTimeout(() => {
      console.log("Resume info by Nithin", resumeInfo);
    }, 3000);
  }, []);

  const GetResumeInfo = async () => {
    GlobalApi.GetResumeById(params?.resumeid).then(resp => {
      console.log("Response received from API", resp);
      setResumeInfo(resp.data.data);
      setShowLinkedIn(resp.data.data.showLinkedIn || false);
      setShowGitHub(resp.data.data.showGitHub || false);
    });
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo, activeFormIndex, setActiveFormindex, showLinkedIn, setShowLinkedIn, showGitHub, setShowGitHub }}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:p-10 gap-10'>
        {/* {Form Section} */}
        <FormSection />

        {/* {Preview Section} */}
        <div className='hidden md:block'>
          <div className='text-4xl font-bold flex justify-center items-center mb-6'><h1>Resume Preview</h1></div>
          <ResumePreview />
        </div>
      </div>
      <div className='flex justify-center items-center mt-1 '>
        <p>Copyright &copy; Nithin Meesala 2024</p>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
