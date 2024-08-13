import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { BrainIcon, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { EditorProvider, Editor, Toolbar, BtnUndo, BtnRedo, BtnBold, BtnItalic, BtnUnderline, BtnStrikeThrough, BtnNumberedList, BtnBulletList, BtnLink, Separator } from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';
import { Tooltip } from 'antd';

const PROMPT = 'Based on my position as a {positionTitle}, provide two to three points about my experience in ul li format and add a medium-sized dot in black color in front of each li. Keep the font size of text small. Do not give in JSON, curly braces, and arrays output, just give in HTML tags.';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue, onAiGenerate }) {
    const [value, setValue] = useState(defaultValue);
    const { resumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);

    const BothFun = async () => {
        handleAiGenerate();
        await GenerateSummaryFromAI();
    };

    const handleAiGenerate = () => {
        if (onAiGenerate) {
            onAiGenerate(index);
        }
    };

    const GenerateSummaryFromAI = async () => {
        setLoading(true);
        
        if (!resumeInfo.experience[index].workTitle) {
            toast('Please add a position title.');
            setLoading(false);
            return;
        }
    
        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].workTitle);
        console.log("Prompt sent to AI:", prompt);
    
        try {
            const result = await AIChatSession.sendMessage(prompt);
            const resp = await result.response.text();
            console.log("AI Response Text:", resp);
    
            // Check if the response is not empty or undefined
            if (resp && resp.trim()) {
                const formattedResponse = resp.replace('[', "").replace(']', "").replace('{', "").replace('}', "");
                setValue(formattedResponse);
                onRichTextEditorChange({ target: { value: formattedResponse } }, index);
                toast.success('Summary generated successfully!');
            } else {
                toast.error('AI did not return a valid summary.Save Details,Refresh and try again.');
            }
        } catch (error) {
            console.error("Error generating summary from AI:", error);
            toast.error("There seems to be an issue with the AI service. Please try again or refresh the page.");
        } finally {
            setLoading(false);
        }
    };
    

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
