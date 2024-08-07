import React, { useEffect, useState } from 'react';
import Addresume from './componenets/Addresume';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './componenets/ResumeCardItem';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    user && GetResumesList();
  }, [user]);

  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress.emailAddress)
      .then(resp => {
        if (resp.status === 200) {
          setResumeList(resp.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching resumes:', error);
      });
  };

  return (
    <div className='p-4 sm:p-6 md:p-10 lg:p-14'>
      <h2 className='text-xl sm:text-2xl md:text-3xl font-bold'>My Resume</h2>
      <p className='text-sm sm:text-base md:text-lg'>Start creating AI Resume for your next Job role</p>
      <div className='grid mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8'>
        <Addresume />
        {resumeList.length > 0 && resumeList.map((resume, index) => (
          <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
        ))}
      </div>
      <div className='text-center mt-6 text-xs sm:text-sm md:text-base'>
        <p>Copyright &copy; Nithin Meesala 2024</p>
      </div>
    </div>
  );
}

export default Dashboard;
