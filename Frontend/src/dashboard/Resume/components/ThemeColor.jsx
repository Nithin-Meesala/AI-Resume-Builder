import React, { useContext, useEffect, useState, useRef } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Circle, LayoutGrid } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Space, Tour } from 'antd';
import './ThemeColor.css';

function ThemeColor() {
    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#000000", "#FF7133", "#15ABAB", "#7133FF", "#FF3371",
        "#8B1B65", "#6C7F93", "#6DB56D", "#2C446F", "#FF5733",
        "#5733FF", "#005842", "#5A33FF", "#FF335A"
    ];
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const [selectedColor, setSelectedColor] = useState();
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [tourOpen, setTourOpen] = useState(false);
    const params = useParams();
    const ref1 = useRef(null);
   

    const onColorSelect = (color) => {
        console.log("Color selected:", color);
        setSelectedColor(color);
        setResumeInfo(prevState => ({
            ...prevState,
            themeColor: color
        }));

        const data = { themeColor: color };
        GlobalApi.UpdateResumeDetail(params?.resumeid, data)
            .then(resp => {
                console.log("Updating the theme color:", resp);
                toast("Theme Color Updated");
            })
            .catch(error => {
                console.error('Error updating theme color:', error);
            });

        // Close the popover after color selection
        setPopoverOpen(false);
    };

    useEffect(() => {
        console.log("Resume info changed:", resumeInfo);
        if (resumeInfo && (!resumeInfo?.themeColor || resumeInfo?.themeColor === null)) {
            console.log("Opening the tour");
            setTourOpen(true);
        } else {
            console.log("Closing the tour because theme color is set");
            setTourOpen(false);
        }
    }, [resumeInfo]);

    

    const steps = [
        {
            title: 'Choose Theme Color',
            target: () => ref1.current,
            className: 'custom-tour-step',
        }
    ];

    return (
        <div>
            <Popover
                open={popoverOpen}
                onOpenChange={(visible) => setPopoverOpen(visible)}
            >
                <PopoverTrigger asChild>
                    <div>
                        <Space>
                            <Button ref={ref1} variant="outline" size="lg" 
                            className='flex gap-2 border-primary hover:scale-105 shadow-lg '>
                                <LayoutGrid /> Theme
                            </Button> &nbsp;
                            <div className='flex' >  &nbsp;<Circle 
                            style={{background:resumeInfo?.themeColor, borderRadius:50}}/></div>
                        </Space>
                        <Tour 
                            open={tourOpen} 
                            onClose={() => setTourOpen(false)} 
                            steps={steps}
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent className='w-72 sm:w-64 p-4'>
                    <h2 className='mb-2 text-sm font-bold'>Select your resume Theme Color</h2>
                    <div className='grid grid-cols-5 gap-3'>
                        {colors.map((item, index) => (
                            <div key={index} onClick={() => onColorSelect(item)}
                                className={`h-5 w-5 rounded-full cursor-pointer
                                hover:border-black border
                                ${selectedColor === item && 'border border-black'}`} style={{ background: item }}>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button variant="solid" size="sm" className='w-full sm:w-auto' onClick={() => setPopoverOpen(false)}>
                            Finish
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default ThemeColor;
