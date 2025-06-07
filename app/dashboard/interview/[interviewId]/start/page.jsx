'use client';

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import QuestionSection from './_components/QuestionSection';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import Link from "next/link";

// Dynamically import webcam-based component to avoid `window` error
const RecordAnswerSection = dynamic(() => import('./_components/RecordAnswerSection'), {
  ssr: false,
});

function StartInterview() {
  const params = useParams();
  const interviewId = params?.interviewId;

  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [recordedAnswers, setRecordedAnswers] = useState([]);
  const [questionStatus, setQuestionStatus] = useState({});

  useEffect(() => {
    if (interviewId) {
      GetInterviewDetails();
    }
  }, [interviewId]);

  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));

    if (result.length > 0) {
      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
      setQuestionStatus({
        0: 'unanswered',
      });
      console.log(jsonMockResp);
    } else {
      console.error('No interview found with this ID');
    }
  };

  const handleAnswerRecorded = (index, isAnswered) => {
    setQuestionStatus((prev) => ({
      ...prev,
      [index]: isAnswered ? 'answered' : 'unanswered',
    }));
  };

  const handleQuestionChange = (index) => {
    setActiveQuestionIndex(index);
  
    setQuestionStatus((prev) => ({
      ...prev,
      [index]: prev[index] === 'answered' ? 'answered' : 'unanswered',
    }));
  };

  return (
    <div className="p-5">
      {/* Use flexbox with min height */}
      <div className="flex flex-col md:flex-row gap-10 min-h-[500px]">
        {/* Question section with fixed top and no scroll */}
        <div className="flex-1 border rounded p-4 self-start">
          <QuestionSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            onQuestionChange={handleQuestionChange }
            questionStatus={questionStatus}
          />
        </div>

        {/* Answer section */}
        <div className="flex-1 flex flex-col border rounded p-4">
          <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
            onAnswerRecorded={handleAnswerRecorded}
          />

          <div className="flex justify-end gap-6 mt-6">
            {activeQuestionIndex > 0 &&
              <Button onClick={() => handleQuestionChange(activeQuestionIndex - 1)}>Previous Question</Button>}
            {activeQuestionIndex !== mockInterviewQuestion.length - 1 &&
              <Button onClick={() => handleQuestionChange(activeQuestionIndex + 1)}>Next Question</Button>}
            {activeQuestionIndex === mockInterviewQuestion.length - 1 &&
              <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                <Button>End Interview</Button>
              </Link>}
          </div>
        </div>
      </div>

    </div>
  );
}

export default StartInterview;
