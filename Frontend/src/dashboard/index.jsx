import React, { useEffect, useState } from 'react'
import Addresume from './componenets/Addresume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './componenets/ResumeCardItem';
import dummy from '@/data/dummy';

function Dashboard() {
  const {user} = useUser();
  const [resumeList,setResumeList]  = useState([]);
  
  useEffect(()=>{
    user&&GetResumesList()
  },[user])
// Used to get Users Resume List
const GetResumesList = () => {
  GlobalApi.GetUserResumes(user?.primaryEmailAddress.emailAddress)
    .then(resp => {
      console.log(resp.data); // Verify the response structure
      if (resp.status === 200) {
        setResumeList(resp.data.data); // Set the resumeList state with the data array
      }
    })
    .catch(error => {
      console.error('Error fetching resumes:', error);
    });
};
  return (
   
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start creating AI Resume for your next Job role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
        <Addresume/>
        {resumeList.length>0&&resumeList.map((resume,index)=>(
          <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList}/>
        ))}
      </div>
      <div className='flex justify-center items-center mt-6 '><p>Copyright &copy; Nithin Meesala 2024</p></div>
    </div>
  )
}

export default Dashboard