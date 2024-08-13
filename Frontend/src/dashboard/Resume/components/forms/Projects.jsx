import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';

import { ArrowLeft, ArrowRight, Brain, LoaderCircle, PlusIcon, Trash2Icon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AIChatSession } from './../../../../../service/AIModal';
import { ScaleLoader } from 'react-spinners';
const prompt = "Project Title:{projectTitle}, Depends on project Title give a description for my resume within 3-4 lines in text format and do not give the response as array of objects just give me the description.";

const formField = {
    projectTitle: '',
    projectDescription: ''
};

function Projects({ enabledNext }) {
    const [projectsList, setprojectsList] = useState([]);
    const [isChanged, setIsChanged] = useState(false); // Track changes
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { activeFormIndex, setActiveFormindex } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [aiGeneratedProjectsList, setAiGeneratedProjectsList] = useState([]);

    useEffect(() => {
        if (resumeInfo?.projects.length > 0) {
            setprojectsList(resumeInfo?.projects);
        }
    }, []);

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedProjects = projectsList.map((project, i) => {
            if (i === index) {
                return { ...project, [name]: value };
            }
            return project;
        });
        setprojectsList(updatedProjects);
        setIsChanged(true); // Mark as changed
    };

    const AddNewProjects = () => {
        setprojectsList([...projectsList, formField]);
        setIsChanged(true); // Mark as changed
    };

    // Highlighted: Remove a specific project by index
    const RemoveProject = (index) => {
        setprojectsList(projectsList.filter((_, i) => i !== index));
        setIsChanged(true); // Mark as changed
    };

    const GenerateDescriptionFromAI = async (index) => {
        setIsChanged(true);
        setLoading(true);
        const projectTitle = projectsList[index]?.projectTitle || '';
    
        // Generate prompt with the project title
        const PROMPT = prompt.replace('{projectTitle}', projectTitle);
        console.log("Generated Prompt: ", PROMPT);
    
        try {
            const result = await AIChatSession.sendMessage(PROMPT);
            const responseText = await result.response.text();
            console.log("AI Response Text: ", responseText);
    
            // Check if the AI response is valid and not empty
            if (responseText && responseText.trim()) {
                // Format the response by removing unwanted characters
                const formattedResponse = responseText
                    .replace('{', '')
                    .replace('}', '')
                    .replace("description", '')
                    .replace(':', '')
                    .replace('""', '')
                    .replace('"', '')
                    .replace('"', '');
    
                // Update the specific project's description with the formatted AI response
                setprojectsList(prevProjectsList => {
                    const updatedProjects = prevProjectsList.map((project, i) => {
                        if (i === index) {
                            return { ...project, projectDescription: formattedResponse };
                        }
                        return project;
                    });
                    return updatedProjects;
                });
    
                toast.success('Project description generated successfully!');
            } else {
                toast.error("AI did not return a valid summary.Save Details,Refresh and try again.");
            }
        } catch (error) {
            console.error("Error generating description from AI:", error);
            toast.error("AI did not return a valid summary.Save Details,Refresh and try again.");
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            projects: projectsList
        });
    }, [projectsList, setResumeInfo, resumeInfo]);

    const onSave = () => {
        setLoading(true);
        const data = {
            
                projects: projectsList.map(({ id, ...rest }) => rest)
            
        };
        console.log(projectsList);

        GlobalApi.UpdateResumeDetail(params?.resumeid, data).then(res => {
            console.log("after Api Call", res);
            enabledNext(true);
            setLoading(false);
            setIsChanged(false); // Reset change flag
            toast('Details updated!');
        }).catch(error => {
            console.error("API Error: ", error);
            setLoading(false);
        });
    };

    return (
        <div>
            <div className='lg:p-5 pt-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-5'>
                <h2 className='font-bold text-lg '>Projects</h2>
                <p className=''>Add your Projects</p>
                <div>
                    {projectsList.map((item, index) => (
                        <div key={index}>
                            <div className='grid gap-3 border lg:p-3 p-1 my-5 rounded-lg'>
                                <div>
                                    <label className='text-md font-semibold'>Project Title</label>
                                    <Input
                                        defaultValue={item?.projectTitle}
                                        onChange={(event) => handleChange(index, event)}
                                        name="projectTitle"
                                    />
                                </div>
                                <div className='flex justify-between items-end mt-2 font-semibold'>
                                    <label>Add Project Description</label>
                                    <Button type="button" onClick={()=>{GenerateDescriptionFromAI(index)}} size="sm" variant="outline" className='border-primary text-primary flex gap-1'>
                                        <Brain className='h-4 w-4' />Generate using AI
                                    </Button>
                                </div>
                                <Textarea
                                    required
                                    className='mt-5'
                                    onChange={(event) => handleChange(index, event)}
                                    name="projectDescription"
                                    value={item?.projectDescription}
                                />
                                {/* Highlighted: Remove button for each project */}
                                <Button 
                                    variant="outline" 
                                    onClick={() => RemoveProject(index)} 
                                    className="border-red-600 text-red-600 hover:text-black  mt-2 "
                                >
                                    <Trash2Icon/> Remove Project
                                </Button>
                                
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between items-center'>
                    <Button variant="outline" onClick={AddNewProjects} className="text-primary"><PlusIcon/> Add </Button>
                    <div className=' flex justify-end gap-3 items-center '>
                        {activeFormIndex > 1 && (
                            <Button onClick={() => setActiveFormindex(activeFormIndex - 1)} className='bg-primary text-white'>
                                <ArrowLeft size="sm" />
                            </Button>
                        )}
                        <Button className='bg-primary text-white'
                            disabled={!enabledNext}
                            onClick={() => setActiveFormindex(activeFormIndex + 1)}
                        >
                            Next <ArrowRight />
                        </Button>
                        {isChanged && (
                            <Button disabled={loading} onClick={onSave} className='bg-primary text-white'>
                                {loading ? <LoaderCircle className='animate-spin'/> : 'Save'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;
