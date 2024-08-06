import React, { useContext, useEffect, useState, useRef } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
// For theme Pop Up Tour
import { Space, Tour } from 'antd';

function ThemeColor() {
    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#000000", "#FF7133", "#15ABAB", "#7133FF", "#FF3371",
        "#8B1B65", "#6C7F93", "#6DB56D", "#2C446F", "#FF5733",
        "#5733FF", "#005842", "#5A33FF", "#FF335A", "#335AFF"
    ];

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [selectedColor, setSelectedColor] = useState();
    const [open, setOpen] = useState(false);
    const params = useParams();
    const ref1 = useRef(null);

    const onColorSelect = (color) => {
        setSelectedColor(color);
        setResumeInfo(prevState => ({
            ...prevState,
            themeColor: color
        }));
        const data = { themeColor: color };
    
        GlobalApi.UpdateResumeDetail(params?.resumeid, data).then(resp => {
            console.log("Updating the theme color:", resp);
            toast("Theme Color Updated");
        }).catch(error => {
            console.error('Error updating theme color:', error);
        });
    };
    

    

    useEffect(() => {
        if (resumeInfo) {
            if (resumeInfo?.themeColor === undefined || resumeInfo?.themeColor === null) {
                setOpen(true);
            } else {
                setOpen(false);
            }
        }
    }, [resumeInfo]);

    const steps = [
        {
            title: 'Choose Theme Color',
            description: 'Set your resume Theme Color from here.',
            target: () => ref1.current,
        }
    ];

    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <div>
                        <Space>
                            <Button ref={ref1} variant="outline" size="lg" 
                            className='flex gap-2 border-primary hover:scale-105  shadow-lg '>
                                <LayoutGrid /> Theme
                            </Button>
                        </Space>
                        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
                    </div>
                </PopoverTrigger>
                <PopoverContent>
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
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default ThemeColor;
