"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { generateAiResponse } from '@/utils/GeminiAIModel';
import { LoaderCircle } from "lucide-react";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment';
import { useRouter } from 'next/navigation';


function AddNewInterview() {

    const [openDialog, setopenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [numberOfQuesions, setNumberOfQuestins] = useState();
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setjsonResponse] = useState([]);
    const { user } = useUser();
    const router = useRouter();

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        const InputPrompt = `Job position : ${jobPosition}, Job description: ${jobDesc}, Year of Experience : ${jobExperience}, Depend on this information please give me ${numberOfQuesions}interview questions with Answers in JSON format. Give Question and Answer as field in JSON`;


        const result = await generateAiResponse(InputPrompt);
        const MockJsonResp = (result.text).replace('```json', '').replace('```', '');
        console.log(JSON.parse(MockJsonResp));
        setjsonResponse(MockJsonResp);

        if (MockJsonResp) {
            const resp = await db.insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    jsonMockResp: MockJsonResp,
                    jobPosition: jobPosition,
                    jobDes: jobDesc,
                    jobExperience: jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createAt: moment().format('DD/MM/YYYY')
                }).returning({ mockId: MockInterview.mockId });

            console.log("Inserted ID :", resp);
            if(resp){
                setopenDialog(false);
                router.push(`/dashboard/interview/${resp[0]?.mockId}`);
            }
        }
        else {
            console.log("Error while Inserted into DB");
        }

        setLoading(false);
    }

    return (
        <div>
            <div className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all" onClick={() => setopenDialog(true)}>
                <h2 className="text-lg text-center">+ Add New</h2>
            </div>

            <Dialog open={openDialog} onOpenChange={setopenDialog}>
                <DialogContent className="w-full sm:max-w-2xl">

                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about your job interview</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div className="">
                                    <h2 className="">
                                        Add details about your job position/role, job description and year of experience
                                    </h2>

                                    <div className="mt-7 my-3">
                                        <label htmlFor="">Job Role/Job Position</label>
                                        <Input placeholder="Ex. Full Stack Developer" required onChange={(event) => setJobPosition(event.target.value)} />
                                    </div>

                                    <div className="my-3">
                                        <label htmlFor="">Job Description/ Tech Stack(In Short)</label>
                                        <Textarea placeholder="Ex. ReactJs, NodeJs, Springboot, MySQL etc." required onChange={(event) => setJobDesc(event.target.value)} />
                                    </div>

                                    <div className="my-3">
                                        <label htmlFor="">Years of Experience</label>
                                        <Input placeholder="Ex. 5" type="number" max="50" required onChange={(event) => setJobExperience(event.target.value)} />
                                    </div>

                                    <div className="my-3">
                                        <label htmlFor="">Number of Questions</label>
                                        <Input placeholder="Ex. 10" type="number" max="50" required onChange={(event) => setNumberOfQuestins(event.target.value)} />
                                    </div>
                                </div>

                                <div className="flex gap-5 justify-end">
                                    <Button type="button" variant="ghost" onClick={() => setopenDialog(false)} >Cancel</Button>
                                    <Button type="submit" disabled={loading}  >
                                        {loading ? (
                                            <>
                                                <LoaderCircle className="animate-spin" />
                                                Generating from AI
                                            </>
                                        ) : (
                                            "Start Interview"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview
