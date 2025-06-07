'use client';
import { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { ChevronsUpDown } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { generateAiResponse } from '@/utils/GeminiAIModel';
import { LoaderCircle } from "lucide-react";

export default function QuestionsPage() {
  const [questionType, setQuestionType] = useState('');
  const [techStack, setTechStack] = useState('');
  const [number, setNumber] = useState(10);
  const [hrFocusArea, setHrFocusArea] = useState('');
  const [loading, setLoading] = useState(false);
  const [quesAnswerList, setQuesAnswerList] = useState([]);

  const GenerateQuesAns = async (e) => {

    setLoading(true);
    e.preventDefault();

    const InputPrompt = `You are an expert interviewer.
    Generate interview questions and answers in JSON format based on the following inputs:
    - Question Type: ${questionType}  
    - Tech Stack: ${techStack}  
    - HR Focus Area: ${hrFocusArea}  
    - Number of Questions: ${number}
    Rules:
    - Each object must contain exactly two fields: "Question" and "Answer".
    - Do not include any text or explanation outside the JSON.
    - Return an array of JSON objects.
    `;
    const result = await generateAiResponse(InputPrompt);
    const MockJsonResp = (result.text).replace('```json', '').replace('```', '');
    setQuesAnswerList(JSON.parse(MockJsonResp));
    console.log('====================================');
    console.log(JSON.parse(MockJsonResp));
    console.log('====================================');
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-10 items-start">
      <div className="max-w-xl mx-auto mt-10 p-6 border rounded-2xl shadow-sm bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Generate Interview Questions
        </h2>

        <form
          onSubmit={GenerateQuesAns}
          className="space-y-4"
        >
          {/* Question Type */}
          <div className="my-3 required-field">
            <label className="block mb-1 font-medium" htmlFor="questionType">
              Question Type
            </label>
            <Select onValueChange={setQuestionType}>
              <SelectTrigger className="w-full min-w-0">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="behavioral">Behavioral (HR)</SelectItem>
                <SelectItem value="system-design">System Design</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tech Stack (only for technical) */}
          {questionType === 'technical' && (
            <div className="my-3 required-field">
              <label htmlFor="techStack">Tech Stack</label>
              <Input
                id="techStack"
                placeholder="Ex. React, Node.js"
                required
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
              />
            </div>
          )}

          {questionType === 'behavioral' && (
            <div className="my-3 required-field">
              <label htmlFor="hrFocusArea">HR Focus Area</label>
              <Input
                id="hrFocusArea"
                placeholder="Ex. Teamwork, Leadership"
                required
                value={hrFocusArea}
                onChange={(e) => setHrFocusArea(e.target.value)}
              />
            </div>
          )}

          <div className="my-3 required-field">
            <label htmlFor="number">Number of Questions</label>
            <Input
              id="number"
              type="number"
              min="1"
              max="50"
              placeholder="Ex. 10"
              required
              value={number}
              onChange={(e) => setNumber(Number(e.target.value))}
            />
          </div>

          <Button type="submit" disabled={loading}
            className="w-full" >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" />
                Generating from AI
              </>
            ) : (
              "Generate Questions and Answer"
            )}
          </Button>
        </form>
      </div>

      {quesAnswerList.length > 0 && (
        <div className="mt-10 p-5 border rounded-2xl shadow-sm">
          {quesAnswerList.map((item, index) => (
            <Collapsible key={index} className="mt-5">
              <CollapsibleTrigger className='flex justify-between p-2 bg-red-50 rounded-lg my-2 text-left gap-10 w-full'>
                Q{index + 1}: {item.Question} <ChevronsUpDown className='h-5 w-5' />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className=" bg-green-50 text-sm text-green-900 p-2 border rounded-lg">
                    <strong>Answer: </strong>{item.Answer}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}

    </div>

  );
}
