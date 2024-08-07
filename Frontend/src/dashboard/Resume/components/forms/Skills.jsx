import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Trash2Icon, LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Tooltip } from 'antd';

function Skills({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { activeFormIndex, setActiveFormindex } = useContext(ResumeInfoContext);
    const params = useParams();
    const [isChanged, setIsChanged] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (resumeInfo && resumeInfo.skills) {
            setResumeInfo(prev => ({ ...prev, skills: resumeInfo.skills }));
        }
    }, [resumeInfo, setResumeInfo]);

    const handleChange = (index, name, value) => {
        const updatedSkills = resumeInfo.skills.map((skill, i) => 
            i === index ? { ...skill, [name]: value } : skill
        );
        setResumeInfo(prev => ({ ...prev, skills: updatedSkills }));
        setIsChanged(true);
    };

    const addNewSkill = () => {
        const newSkills = [...resumeInfo.skills, { name: '', rating: 0 }];
        setResumeInfo(prev => ({ ...prev, skills: newSkills }));
        setIsChanged(true);
    };

    const removeSkill = (index) => {
        const filteredSkills = resumeInfo.skills.filter((_, i) => i !== index);
        setResumeInfo(prev => ({ ...prev, skills: filteredSkills }));
        setIsChanged(true);
    };

    const onSave = () => {
        setLoading(true);
        GlobalApi.UpdateResumeDetail(params?.resumeid,  { skills: resumeInfo.skills } )
            .then(resp => {
                setIsChanged(false);
                setLoading(false);
                toast('Details Updated!');
                console.log(resp.data)
            })
            .catch(error => {
                setLoading(false);
                toast('Server Error, please try again');
            });
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-5'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add your Professional Skills</p>
            <div>
                {resumeInfo.skills.map((item, index) => (
                    <div key={index} className='flex flex-col sm:flex-row sm:items-center mb-3 border rounded-lg p-3'>
                        <div className='flex-1'>
                            <label className='text-xs'>Name</label>
                            <Input
                                value={item.name}
                                className="w-full text-sm sm:text-base" // Responsive text size
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                            />
                        </div>
                        <div className='mt-2 sm:mt-0 sm:ml-3 flex items-center'>
                            <Rating
                                style={{ maxWidth: 120 }}
                                value={item.rating}
                                onChange={(v) => handleChange(index, 'rating', v)}
                            />
                        </div>
                        <Tooltip title="Delete skill">
                        <Button 
                            variant="outline" 
                            onClick={() => removeSkill(index)} 
                            className="text-red-600 border-red-600 gap-1 mt-2 sm:mt-0"
                            size="sm" // Smaller button size for small screens
                        >
                            <Trash2Icon className='h-4 w-4'/>
                        </Button>
                        </Tooltip>
                    </div>
                ))}
            </div>
            <div className='flex flex-col sm:flex-row justify-between items-center'>
                <Button 
                    variant="outline" 
                    onClick={addNewSkill} 
                    className="text-primary mb-2 sm:mb-0"
                    size="sm" // Smaller button size for small screens
                >
                    + Add more skills
                </Button>
                <div className='mt-2 sm:mt-0 flex gap-2'>
                    {activeFormIndex > 1 && (
                        <Button onClick={() => setActiveFormindex(activeFormIndex - 1)} size="sm">
                            <ArrowLeft className='h-6 w-5' />
                        </Button>
                    )}
                    <Button
                        disabled={!enabledNext}
                        onClick={() => setActiveFormindex(activeFormIndex + 1)}
                        size="sm" // Smaller button size for small screens
                    >
                        Next <ArrowRight />
                    </Button>
                    {isChanged && (
                        <Button type="submit" disabled={loading} onClick={onSave} size="sm">
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Skills;
