import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { ArrowLeft, ArrowRight, Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModal';

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

    const textareaRef = useRef(null);

    useEffect(() => {
        // Sync local state with context state
        if (resumeInfo?.summary) {
            setSummaryInput(resumeInfo.summary);
        }
    }, [resumeInfo?.summary]);

    useEffect(() => {
        // Adjust the textarea height based on its content
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset height to auto to get the scrollHeight
            textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
        }
    }, [summaryInput]);

    const GenerateSummaryFromAI = async () => {
        setIsChanged(true);
        setLoading(true);
    
        if (!resumeInfo?.jobTitle) {
            toast('Please add a job title.');
            setLoading(false);
            return;
        }
    
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
                toast.error("AI did not return a valid summary.Save Details,Refresh and try again.");
                setLoading(false);
                return;
            }
    
            // Check if the parsed response contains valid content
            if (parsedResponse.length > 0 && parsedResponse[0]?.summary) {
                setAiGeneratedSummaryList(parsedResponse);
                toast.success('Summary generated successfully!');
            } else {
                toast.error("AI did not return a valid summary.Save Details,Refresh and try again.");
            }
        } catch (error) {
            console.error("Error generating summary from AI:", error);
            toast.error("There seems to be an issue with the AI service. Please try again or refresh the page.");
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
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                        <label className='text-sm sm:text-base mb-2 sm:mb-0'>Add Summary</label>
                        <Button 
                            type="button" 
                            onClick={GenerateSummaryFromAI} 
                            size="sm" 
                            variant="outline" 
                            className='border-primary text-primary flex items-center gap-1 sm:text-base'
                        >
                            <Brain className='h-4 w-4 sm:h-5 sm:w-5' />
                            <span className=' sm:inline'>Generate using AI</span>
                        </Button>
                    </div>
                    <Textarea 
                        ref={textareaRef}
                        className='mt-5 resize-none overflow-hidden' 
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
