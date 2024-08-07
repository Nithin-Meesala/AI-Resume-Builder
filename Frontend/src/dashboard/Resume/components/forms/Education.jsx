import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { ArrowLeft, LoaderCircle, Trash2Icon } from 'lucide-react';
import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';


const formField = {
    id: null, // Unique identifier for each education entry
    universityName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: ''
};

function Education({ enabledNext }) {
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { activeFormIndex, setActiveFormindex } = useContext(ResumeInfoContext);
    const [educationalList, setEducationalList] = useState(() => resumeInfo?.education?.length > 0 ? resumeInfo.education.map(item => ({ ...item, id: item.id || Date.now() + Math.random() })) : [{ ...formField, id: Date.now() }]);
    const [isChanged, setIsChanged] = useState(false);

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        setEducationalList(prevList => {
            const newList = [...prevList];
            newList[index] = { ...newList[index], [name]: value };
            return newList;
        });
        setIsChanged(true);
    };

    const AddNewEducation = useCallback(() => {
        setEducationalList(prevList => [...prevList, { ...formField, id: Date.now() + Math.random() }]);
        setIsChanged(true);
    }, []);

    const RemoveEducation = useCallback((index) => {
        setEducationalList(prevList => prevList.filter((_, i) => i !== index));
        setIsChanged(true);
    }, []);

    const onSave = useCallback(() => {
        setLoading(true);
        const data = {
            
                education: educationalList.map(({ id, ...rest }) => rest)
        }
        GlobalApi.UpdateResumeDetail(params?.resumeid, data).then(resp => {
            setLoading(false);
            setIsChanged(false);
            toast("Creating Resume");
            
            enabledNext(true);
        }).catch(error => {
            setLoading(false);
            toast('Server error, please try again');
        });
    }, [educationalList, params?.resumeid, enabledNext]);

    const active = useCallback(() => {
        setActiveFormindex(activeFormIndex + 1);
    }, [activeFormIndex, setActiveFormindex]);

    const twofunc = useCallback(() => {
        
        onSave();
       
            active();
        
    }, [onSave,active]);

    useEffect(() => {
        if (isChanged) {
            setResumeInfo(prev => ({
                ...prev,
                education: educationalList
            }));
        }
    }, [educationalList, isChanged, setResumeInfo]);

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-5'>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add your Educational Details</p>
            <div>
                {educationalList.map((item, index) => (
                    <div key={item.id}>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div className='grid '>
                                <label>University Name</label>
                                <Input
                                    value={item.universityName}
                                    onChange={(e) => handleChange(e, index)}
                                    name="universityName"
                                />
                            </div>
                            {/* CGPA DIV NEW ADDITION */}
                            <div>
                                <label>CGPA or Percentage</label>
                                <Input
                                    value={item.score}
                                    onChange={(e) => handleChange(e, index)}
                                    name="score"
                                />
                            </div>
                            
                            {/* CGPA DIV NEW ADDITION */}
                            <div>
                                <label>Degree</label>
                                <Input
                                    value={item.degree}
                                    onChange={(e) => handleChange(e, index)}
                                    name="degree"
                                />
                            </div>
                            <div>
                                <label>Major</label>
                                <Input
                                    value={item.major}
                                    onChange={(e) => handleChange(e, index)}
                                    name="major"
                                />
                            </div>
                            <div>
                                <label>Start Date</label>
                                <Input
                                    value={item.startDate}
                                    onChange={(e) => handleChange(e, index)}
                                    name="startDate"
                                    type="date"
                                />
                            </div>
                            <div>
                                <label>End Date</label>
                                <Input
                                    value={item.endDate}
                                    onChange={(e) => handleChange(e, index)}
                                    name="endDate"
                                    type="date"
                                />
                            </div>
                            <div className='col-span-2'>
                                <label>Description</label>
                                <Textarea
                                    value={item.description}
                                    onChange={(e) => handleChange(e, index)}
                                    name="description"
                                />
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => RemoveEducation(index)}
                                className="text-red-600 col-span-2 gap-1 "
                            >
                                <Trash2Icon /> Remove Education
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2'>
                    <Button
                        variant="outline"
                        onClick={AddNewEducation}
                        className="text-primary"
                    >
                        + Add 
                    </Button>
                </div>
                <div className='mt-2 flex justify-end gap-3'>
                    {activeFormIndex > 1 && (
                        <Button onClick={() => setActiveFormindex(activeFormIndex - 1)}>
                            <ArrowLeft size="sm" />
                        </Button>
                    )}
                    <Button disabled={loading} onClick={twofunc}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Finish'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Education;


