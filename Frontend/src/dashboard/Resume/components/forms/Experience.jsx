import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { ArrowLeft, ArrowRight, LoaderCircle, Trash2Icon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: ''
};

function Experience({ enabledNext }) {
    const [experienceList, setExperienceList] = useState([]);
    const [isChanged, setIsChanged] = useState(false); // Track changes
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { activeFormIndex, setActiveFormindex } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (resumeInfo?.experience.length > 0) {
            setExperienceList(resumeInfo.experience);
        }
    }, [resumeInfo?.experience]);

    const handleChange = (index, event) => {
        const newEntries = [...experienceList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
        setIsChanged(true); // Mark as changed
    };

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = [...experienceList];
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);
        setIsChanged(true); // Mark as changed
    };

    const handleAiGenerate = (index) => {
        // Here, you can implement your AI generation logic and set isChanged to true
        setIsChanged(true);
    };

    const AddNewExperience = () => {
        setExperienceList([...experienceList, formField]);
        setIsChanged(true); // Mark as changed
    };

    const RemoveExperience = (index) => {
        const newEntries = experienceList.filter((_, i) => i !== index);
        setExperienceList(newEntries);
        setIsChanged(true); // Mark as changed
    };

    useEffect(() => {
        setResumeInfo((prev) => ({
            ...prev,
            experience: experienceList
        }));
    }, [experienceList, setResumeInfo]);

    const onSave = () => {
        setLoading(true);
        const data = {
            
                experience: experienceList.map(({ id, ...rest }) => rest)
            
        };
        console.log(experienceList);

        GlobalApi.UpdateResumeDetail(params.resumeid, data).then(res => {
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
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-5'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add your Job Experience</p>
                <div>
                    {experienceList.map((item, index) => (
                        <div key={index}>
                            <div className='flex justify-end mr-2    '>
                                <Button variant="outline"
                                   onClick={() => RemoveExperience(index)}
                                   className="text-primary border-primary gap-1 h-[36px] "><Trash2Icon className='h-4 w-4'/>Remove Experience
                                </Button>
                            </div>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                <div>
                                    <label className='text-xs'>Position/ Title</label>
                                    <Input
                                        defaultValue={item?.title}
                                        onChange={(event) => handleChange(index, event)}
                                        name="workTitle"
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Company Name</label>
                                    <Input
                                        defaultValue={item?.companyName}
                                        onChange={(event) => handleChange(index, event)}
                                        name="companyName"
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>City</label>
                                    <Input
                                        defaultValue={item?.city}
                                        onChange={(event) => handleChange(index, event)}
                                        name="city"
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>State</label>
                                    <Input
                                        defaultValue={item?.state}
                                        onChange={(event) => handleChange(index, event)}
                                        name="state"
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Start Date</label>
                                    <Input
                                        type="date"
                                        defaultValue={item?.startDate}
                                        onChange={(event) => handleChange(index, event)}
                                        name="startDate"
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>End Date</label>
                                    <Input
                                        type="date"
                                        defaultValue={item?.endDate}
                                        onChange={(event) => handleChange(index, event)}
                                        name="endDate"
                                    />
                                </div>
                                <div className="col-span-2 text-xs">
                                    { /* Work Summary */}
                                    <RichTextEditor
                                        defaultValue={item?.workSummary}
                                        index={index}
                                        onRichTextEditorChange={(event) => handleRichTextEditor(event, "workSummary", index)}
                                        onAiGenerate={() => handleAiGenerate(index)}
                                    />
                                </div>
                                
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between '>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={AddNewExperience} className="text-primary">+ Add More Experience</Button>
                    </div>
                    <div className='mt-2 flex justify-end gap-3'>
                        {activeFormIndex > 1 && (
                            <Button onClick={() => setActiveFormindex(activeFormIndex - 1)}>
                                <ArrowLeft size="sm" />
                            </Button>
                        )}
                        <Button
                            disabled={!enabledNext}
                            onClick={() => setActiveFormindex(activeFormIndex + 1)}
                        >
                            Next <ArrowRight />
                        </Button>
                        {isChanged && (
                            <Button disabled={loading} onClick={onSave}>
                                {loading ? <LoaderCircle className='animate-spin'/> : 'Save'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Experience;
