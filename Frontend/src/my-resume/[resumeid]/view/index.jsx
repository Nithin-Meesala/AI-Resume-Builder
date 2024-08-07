import { Button } from "@/components/ui/button";
import Header from "@/components/ui/custom/header";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/Resume/components/ResumePreview";
import React, { useEffect, useState } from "react";

import GlobalApi from "../../../../service/GlobalApi";
import { useNavigate, useParams } from "react-router-dom";
import { ShareSocial } from 'react-share-social'; 
import { GridLoader } from "react-spinners";
import {Smile, XIcon } from "lucide-react";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const {resumeid} = useParams();
  const [creating, setCreating] = useState(true);
  const [share, setShare] = useState(false);
  const Navigate = useNavigate();
  const params = useParams();
  const style = {
    root: {
      background: 'black',
      borderRadius: 3,
      border: 0,
      boxShadow: ' ',
      color: 'white',
      padding: 0,
      width: '100px'
    },
    copyContainer: {
      border: '2px solid white',
      background: 'black',
    },
    title: {
      color: 'white'
    },
  };

  useEffect(() => {
    // Simulate a loading period
    setTimeout(() => {
      setCreating(false);
      GetResumeInfo();
    }, 5000);
  
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(params?.resumeid).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
      
    });
  };

  const HandleDownload = () => {
    window.alert('For the best print results, please enable "Background graphics" in the print > More settings > "Background graphics".');
    window.print();
  };

  return (
    <>
      {creating ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          <div>
            <div className="text-white gap-3 flex justify-center mb-10">
              <GridLoader color="#00ff1e" width={20} />
            </div> 
            <h2 className="text-white mt-5 text-center px-4">Furnishing Your Resume.</h2>
            <h2 className="text-white mt-5 text-center px-4">If using Mobile, Switch to Desktop Mode for better Preview of your Resume<Smile/></h2>
          
          </div>
        </div>
      ) : (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
          <div id="no-print">
            <Header />
            <div className="my-10 mx-4 md:mx-10 lg:mx-20 xl:mx-36">
              <h2 className="text-center text-xl md:text-2xl font-medium">
                Congratulations, your ultimate AI-generated resume is ready
              </h2>
              <p className="text-center text-gray-400">
                Now you are ready to download your resume and share your unique URL with your friends and family.
              </p>
              <div className="flex flex-col md:flex-row justify-center md:justify-between items-center px-4 md:px-20 lg:px-44 my-10 gap-4">
                <Button variant="outline" onClick={HandleDownload} className="bg-black text-white hover:shadow-2xl">Download</Button>
                <Button variant="outline" className="bg-black text-white hover:shadow-2xl" onClick={() => setShare(!share)}>
                  Share
                </Button>
                {share && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-black p-8 rounded shadow-lg relative">
                      <button className="absolute top-2 right-2 text-black" onClick={() => setShare(false)}>
                        <XIcon className="text-white"/>
                      </button>
                        <ShareSocial
                          url={window.location.href}
                          socialTypes={['facebook', 'twitter', 'reddit', 'linkedin', 'whatsapp', 'telegram', 'instapaper', 'email', 'ok', 'livejournal', 'mailru', 'hatena', 'line']}
                          title="Select your platform to share your resume"
                          onClick={() => setShare(false)}
                          style={style}
                        />
                    </div>
                  </div>
                )}
                <Button
                  variant="outline"
                  onClick={() => Navigate('/dashboard')}
                  className="block border bg-black text-white border-gray-200 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                >
                  View Your Previous Resumes
                </Button>
              </div>
            </div>
          </div>
          <div id="print-area">
            <ResumePreview />
          </div>
          <div id="no-print" className='flex justify-center items-center mt-5'>
          <p>Copyright &copy; Nithin Meesala 2024</p>
          </div>
        </ResumeInfoContext.Provider>
      )}
    </>
  );
}

export default ViewResume;
