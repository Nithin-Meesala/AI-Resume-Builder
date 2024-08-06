import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from './../../../service/GlobalApi';
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function Addresume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [ResumeTitle, setResumeTitle] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();

    const data = {
      
        title: ResumeTitle,
        resumeid: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName
      
    };

    GlobalApi.CreateNewResume(data)
        .then(resp => {
            setLoading(false);
            if (resp.status === 200) {
                console.log(resp.data);
                navigate('/dashboard/resume/' + resp.data.data.id + "/edit");
            } else if (resp.status === 302) {
                console.log(resp.data.message);
                alert("Resume already exists!");
            }
        })
        .catch(error => {
          setLoading(false);
          if (error.status === 302) {
              console.log(error.data.message);
              alert("Resume already exists!");
          } else {
              console.error('Error from API:', error);
              alert("An error occurred while creating the resume.");
          }
      });
  };

  return (
    <div>
      <div className="hover:scale-110  transition-all hover:shadow-lg border rounded-lg bg-black   ">
      <div
        className="p-14 py-24  items-center flex 
        justify-center bg-secondary  h-[280px] 
        
        cursor-pointer "
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare size="40px" />
      </div>
      <p className="flex justify-center m-4 text-center text-white">Create New Resume</p>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new Resume</p>
              <Input className='my-2' placeholder="Ex.Full Stack Resume" onChange={(e) => setResumeTitle(e.target.value)} />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button variant='ghost' onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button disabled={!ResumeTitle || loading} onClick={() => onCreate()}>
                {loading ?
                  <Loader2 className='animate-spin' /> : 'Create'
                }
              </Button>
            </div>
          </DialogHeader>
          <DialogFooter>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Addresume;
