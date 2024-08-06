import { LoaderCircle, MoreVertical, NotebookIcon } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi';
import { toast } from 'sonner';


function ResumeCardItem({resume,refreshData}) {

  const Navigate = useNavigate();
  const [openAlert,setOpenAlert] = useState(false);
  const [loading,setLoading] = useState(false)




  const onDelete=()=>{
    setLoading(true)
    console.log(resume.resumeid)
    GlobalApi.DeleteResumeById(resume.resumeid).then(resp=>{
      toast("Resume Deleted")
      refreshData();
      setLoading(false);
      setOpenAlert(false);

    },(error)=>{
      setLoading(false);

    })
  }
  // const onMenuClick=(url)=>{
  //   Navigate(url)
  // }
//style={{borderColor:resume?.attributes.themeColor}}
  return (
    <div >
      <div className='hover:scale-105  transition-all hover:shadow-md shadow-primary'
      style={{borderColor:resume?.themeColor}}>
    <Link to={'/dashboard/resume/'+resume.resumeid+"/edit"}>
        <div className='p-14  bg-gradient-to-b
          from-pink-100 via-purple-200 to-blue-200   border-t-4  flex items-center justify-center 
        h-[280px]   rounded-t-lg text-white' style={{borderColor:resume?.themeColor}} >
                
                <img src='/cv.png' width={80} height={80} />
        </div>
        </Link>
        <div className='border p-3 flex justify-between rounded-b-lg text-white  '
        style={{background:resume?.themeColor}} 
        >
        <h2 className='text-center my-1 '>{resume?.title}</h2>
        
        <DropdownMenu>
            <DropdownMenuTrigger><MoreVertical className='h-4 w-4 cursor-pointer'/></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem 
              onClick={()=>Navigate('/dashboard/resume/'+resume?.resumeid+"/edit")}>Edit</DropdownMenuItem>
              <DropdownMenuItem
              onClick={()=>Navigate('/my-resume/'+resume?.resumeid+"/view")}>View</DropdownMenuItem>
              <DropdownMenuItem
              onClick={()=>Navigate('/my-resume/'+resume?.resumeid+"/view")}>Download</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>setOpenAlert(true)}
              >Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
            
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} disabled={loading}>
                 {loading?<LoaderCircle className='animate-spin'/>:'Delete'}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          </div>
        </div>
    </div>    

    
  )
}

export default ResumeCardItem