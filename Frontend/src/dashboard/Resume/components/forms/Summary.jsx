import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { ArrowLeft, ArrowRight, Brain, Loader, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModal';
import { ScaleLoader } from 'react-spinners';

const prompt = "Job Title:{jobTitle}, Depends on job title give a summary for my resume within 5-6 lines in JSON format with field experience level and summary with experience level for fresher, Mid Level, Experienced";

function Summary({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { activeFormIndex, setActiveFormindex } = useContext(ResumeInfoContext);
    const [summaryInput, setSummaryInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isChanged, setIsChanged] = useState(false); // Track changes
    const params = useParams();
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);

    useEffect(() => {
        // Sync local state with context state
        if (resumeInfo?.summary) {
            setSummaryInput(resumeInfo.summary);
        }
    }, [resumeInfo?.summary]);

    const GenerateSummaryFromAI = async () => {
        setIsChanged(true);
        setLoading(true);
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
        console.log("Generated Prompt: ", PROMPT);

        try {
            const result = await AIChatSession.sendMessage(PROMPT);
            const responseText = await result.response.text();
            console.log("AI Response Text: ", responseText);

            // Wrap the responseText in an array brackets if it's not already an array
            const formattedResponseText = `[${responseText}]`;

            // Parse the response as a JSON array
            let parsedResponse;
            try {
                parsedResponse = JSON.parse(formattedResponseText);
                console.log("Parsed Response: ", parsedResponse);
            } catch (parseError) {
                console.error("Failed to parse JSON response:", parseError);
                setLoading(false);
                return;
            }

            // Assuming the response is a list of summaries
            setAiGeneratedSummaryList(parsedResponse);
            toast('Summary generated!');
        } catch (error) {
            console.error("Error generating summary from AI:", error);
        } finally {
            setLoading(false);
        }
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
          
                summary: summaryInput
            
        };

        GlobalApi.UpdateResumeDetail(params?.resumeid, data).then(resp => {
            console.log("API Response: ", resp);
            enabledNext(true);
            setLoading(false);
            setIsChanged(false); // Reset change flag
            toast("Details Updated");
        }, (error) => {
            console.error("API Error: ", error);
            setLoading(false);
        });
    };

    const handleTextareaChange = (e) => {
        const updatedSummary = e.target.value;
        setSummaryInput(updatedSummary);
        setIsChanged(true); // Mark as changed

        // Update the context state to reflect the change immediately
        setResumeInfo({
            ...resumeInfo,
            summary: updatedSummary
        });
    };

    const useAISuggestion = (suggestion, index) => {
        setSummaryInput(suggestion);
        setIsChanged(true); // Mark as changed
        setSelectedSuggestion(index); // Mark the selected suggestion

        // Update the context state with AI-generated summary
        setResumeInfo({
            ...resumeInfo,
            summary: suggestion
        });
    };

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-5'>
                <h2 className='font-bold text-lg'>Summary Details</h2>
                <p>Add Summary for your job Title</p>
                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summary</label>
                        <Button type="button" onClick={GenerateSummaryFromAI} size="sm" variant="outline" className='border-primary text-primary flex gap-1'>
                            <Brain className='h-4 w-4' />Generate using AI
                        </Button>
                    </div>
                    <Textarea 
                        className='mt-5'  
                        onChange={handleTextareaChange} 
                        value={summaryInput} 
                    />
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
                            <Button type="submit" disabled={loading}>
                                {loading ? <LoaderCircle className='animate-spin'/> : 'Save'}
                            </Button>
                        )}
                    </div>
                </form>
            </div>
            {aiGeneratedSummaryList.length > 0 && (
                <div className='my-5'>
                    <h2 className='font-bold text-lg'>AI Suggestions</h2>
                    {aiGeneratedSummaryList?.map((item, index) => (
                        <div key={index} className='my-5'>
                            <div className='flex justify-between my-3 p-3 border-b-2 border-primary rounded-[5px]'>
                                <h2 className='font-bold my-1'>Level: {item?.experience_level}</h2>
                                <Button 
                                    onClick={() => useAISuggestion(item?.summary, index)} 
                                    size="sm"
                                >
                                    {selectedSuggestion === index ? 'Selected' : 'Use'}
                                </Button> 
                            </div>
                            <p className='p-2'>{item?.summary}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Summary;
