import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { ArrowRight, ArrowLeft, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

function PersonalDetail({ enabledNext }) {
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { activeFormIndex, setActiveFormindex } = useContext(ResumeInfoContext);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const { showLinkedIn, setShowLinkedIn } = useContext(ResumeInfoContext);
    const { showGitHub, setShowGitHub } = useContext(ResumeInfoContext);

    useEffect(() => {
        console.log(params);
    }, []);

    const handleInputChange = (e) => {
        enabledNext(false);
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setResumeInfo({
            ...resumeInfo,
            [name]: value
        });

        setIsChanged(true); // Mark as changed
    };

    const handleToggleChange = (type) => {
        if (type === 'linkedin') {
            setShowLinkedIn(!showLinkedIn);
            setResumeInfo({
                ...resumeInfo,
                showLinkedIn: !showLinkedIn
            });
        } else if (type === 'github') {
            setShowGitHub(!showGitHub);
            setResumeInfo({
                ...resumeInfo,
                showGitHub: !showGitHub
            });
        }
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);

        // Include toggle states in the formData
        const data = {
            ...formData,
            showLinkedIn,
            showGitHub,
        };

        GlobalApi.UpdateResumeDetail(params?.resumeid, data).then(resp => {
            enabledNext(true);
            setLoading(false);
            setIsChanged(false); // Reset change flag
            toast("Details Updated");
            console.log(resp);
        }).catch((error) => {
            setLoading(false);
        });
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-5'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p>Get started with the basic information</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-1 sm:grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} />
                    </div>
                    <div className='lg:col-span-1 sm:col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle} onChange={handleInputChange} />
                    </div>
                    <div className='lg:col-span-1 sm:col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input name="address" defaultValue={resumeInfo?.address} required onChange={handleInputChange} />
                    </div>
                    <div className='lg:col-span-1 sm:col-span-2'>
                        <label className='text-sm'>Phone</label>
                        <Input name="phone" defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
                    </div>
                    <div className='lg:col-span-1 sm:col-span-2'>
                        <label className='text-sm'>Email</label>
                        <Input name="email" defaultValue={resumeInfo?.email} required onChange={handleInputChange} />
                    </div>
                    <div className='lg:col-span-1 sm:col-span-2'>
                        <div className='mt-2 mb-2 flex gap-2 items-center'>
                            <Switch 
                                checked={showLinkedIn}
                                onChange={() => handleToggleChange('linkedin')}
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                size="small"
                            />
                            <p className='text-sm'>LinkedIn</p>
                        </div>
                        <div>
                            <label className='text-sm'>LinkedIn Username</label>
                            <Input name="linkedinusername" defaultValue={resumeInfo?.linkedinusername} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className='text-sm'>LinkedIn URL</label>
                            <Input name="linkedinurl" defaultValue={resumeInfo?.linkedinurl} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className='lg:col-span-1 sm:col-span-2'>
                        <div className='mt-2 mb-2 flex gap-2 items-center'>
                            <Switch 
                                checked={showGitHub}
                                onChange={() => handleToggleChange('github')}
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                size="small"
                            />
                            <p className='text-sm'>GitHub</p>
                        </div>
                        <div>
                            <label className='text-sm'>GitHub Username</label>
                            <Input name="githubusername" defaultValue={resumeInfo?.githubusername} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className='text-sm'>GitHub URL</label>
                            <Input name="githuburl" defaultValue={resumeInfo?.githuburl} onChange={handleInputChange} />
                        </div>
                    </div>
                </div>
                <div className='mt-3 flex flex-col sm:flex-row justify-end gap-3'>
                    {activeFormIndex > 1 && <Button onClick={() => setActiveFormindex(activeFormIndex - 1)}>
                        <ArrowLeft size="sm" />
                    </Button>}
                    <Button disabled={!enabledNext} onClick={() => setActiveFormindex(activeFormIndex + 1)}>
                        Next <ArrowRight />
                    </Button>
                    {isChanged && (
                        <Button type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default PersonalDetail;
