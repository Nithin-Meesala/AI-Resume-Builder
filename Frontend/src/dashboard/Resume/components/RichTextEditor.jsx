import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { BrainIcon, Loader2Icon, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { EditorProvider, Editor, Toolbar, BtnBold, BtnItalic, BtnUndo, BtnRedo, Separator, BtnUnderline, BtnStrikeThrough, BtnNumberedList, BtnBulletList, BtnLink, BtnClearFormatting, BtnStyles } from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';
import { Tooltip } from 'antd';

const PROMPT = 'Based on my position as a {positionTitle} , provide two to three points about my experience in ul li format and add a medium sized dot in black color in front of each li. Keep font size of text to small. Do not give in json, curly braces and arrays output just give in html tags'

function RichTextEditor({ onRichTextEditorChange, index, defaultValue, onAiGenerate }) {
    const [value, setValue] = useState(defaultValue);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);

    const BothFun = async () => {
        handleAiGenerate();
        await GenerateSummaryFromAI();
    }

    const handleAiGenerate = () => {
        // Call the provided function when AI generate button is clicked
        if (onAiGenerate) {
            onAiGenerate(index);
        }
    };

    const GenerateSummaryFromAI = async () => {
        setLoading(true);
        if (!resumeInfo.experience[index].workTitle) {
            toast('Please Add position Title');
            setLoading(false);
            return;
        }
        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].workTitle);
        console.log(prompt);
        const result = await AIChatSession.sendMessage(prompt);
        const resp = await result.response.text();
        console.log("AI Response Text: ", resp);
        setValue(resp.replace('[', "").replace(']', "").replace('{', "").replace('}', ""));
        onRichTextEditorChange({ target: { value: resp } }, index);
        setLoading(false);
    }

    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-xs'>Summary</label>
                <Tooltip title="Generate summary using AI">
                <Button 
                    onClick={BothFun} 
                    className="flex gap-2 border-primary text-primary h-[28px] sm:h-[32px] md:h-[36px] lg:h-[40px] px-2 sm:px-3 md:px-4 lg:px-5"
                    variant="outline" 
                    size="sm"
                >
                    {loading ? <LoaderCircle className='animate-spin'/> : <><BrainIcon className='h-4 w-4'/>Generate using AI</>}
                </Button>
                </Tooltip>
            </div>
            <EditorProvider>
                <Editor 
                    value={value} 
                    onChange={(e) => { setValue(e.target.value); onRichTextEditorChange(e); }}
                >
                    <Toolbar>
                        <BtnUndo />
                        <BtnRedo />
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
}

export default RichTextEditor;
