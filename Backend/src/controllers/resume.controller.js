import { set } from "mongoose";
import { Resume } from "../models/resume.model.js";


const createNewResume = async(req,res)=>{
    const {title,resumeid,userEmail,userName} = req.body;
    try{
        const existingResume =await Resume.findOne({title});
        if(existingResume){
            return res.status(302).json({message:"Resume Already exists!"});
        }
        const newResume = new Resume({
            title:title,
            resumeid:resumeid,
            userEmail:userEmail,
            userName:userName,
        });
        await newResume.save();
        return res.status(200).json({message:"Resume Created", data:{id:newResume.resumeid}});
    }catch(e){
        return res.status(500).json({message:`something went wrong${e}`})
    }
}

const getResumeList = async(req,res)=>{
        const {userEmail} = req.body;
        try{
            const resumelist = await  Resume.find({userEmail});
            console.log(resumelist);
            return res.status(200).json({ message: "Resumes Retrieved", data: resumelist });
            
        }catch(e){
            return res.status(500).json({message:`something went wrong${e}`})
        }

}

const updateResume = async (req, res) => {
    const { resumeid, skills, ...updateData } = req.body;
    try {
        // Find the resume by resumeid
        const resume = await Resume.findOne({ resumeid });
        if (resume) {
            // Prepare update operations
            const updateOps = { ...updateData }; // Include other fields you want to update

            // If skills are provided, handle updating them
            if (skills !== undefined) {
                updateOps.skills = skills; // Directly set the new skills array
            }

            // Update the resume with new data
            await Resume.updateOne({ resumeid }, { $set: updateOps });

            // Fetch the updated resume for the response
            const updatedResume = await Resume.findOne({ resumeid });
            return res.status(200).json({ message: "Details updated", data: updatedResume });
        } else {
            return res.status(404).json({ message: "Resume not found" });
        }
    } catch (e) {
        return res.status(500).json({ message: `Something went wrong: ${e}` });
    }
};


const getResumeById = async (req, res) => {
    const { id } = req.params; // Resume ID from URL params
    try {
        const resume = await Resume.findOne({ resumeid: id });
        if (resume) {
            return res.status(200).json({ message: "Resume retrieved", data: resume });
        } else {
            return res.status(404).json({ message: "Resume not found" });
        }
    } catch (e) {
        return res.status(500).json({ message: `Something went wrong: ${e}` });
    }
}

const deleteResumeById = async(req,res)=>{
    const {id} = req.params;
    try{
        const resume = await Resume.findOne({ resumeid: id });
        if(resume){
            await Resume.deleteOne({resumeid: id});
            return res.status(200).json({ message: "Resume Deleted", data: resume });
        } else {
            res.status(404).send({ message: 'Resume not found' });
          }
    }catch (error) {
        res.status(500).send({ message: 'An error occurred', error });
    }
}


export {createNewResume,getResumeList,updateResume,getResumeById,deleteResumeById};