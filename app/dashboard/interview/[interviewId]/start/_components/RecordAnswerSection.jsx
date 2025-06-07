"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner"
import { generateAiResponse } from "@/utils/GeminiAIModel";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs"
import moment from "moment";

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData, onAnswerRecorded }) {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false)

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    const answerTranscript = results.map(res => res.transcript).join(" ");
    setUserAnswer(answerTranscript);
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer?.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);
  

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    }
    else {
      startSpeechToText();
    }
  }

  const UpdateUserAnswer = async () => {

    console.log(userAnswer);
    setLoading(true);

    const feedbackPrompt = "Question" + mockInterviewQuestion[activeQuestionIndex]?.Question + ", User Answer:" + userAnswer + ", Depends on question and user answer for given interview question" + " please give us rating for answer and feedback as area of imporvement if any " + "in just 3 to 5 lines to improve it in JSON format with rating field and feedback feed";

    const result = await generateAiResponse(feedbackPrompt);
    const mockJsonResponse = (result.text).replace('```json', '').replace('```', '');
    console.log(mockJsonResponse);
    const jsonFeedbackResp = JSON.parse(mockJsonResponse);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.Question,
      correctAnswer: mockInterviewQuestion[activeQuestionIndex]?.Answer,
      userAnswer: userAnswer,
      feedback: jsonFeedbackResp?.feedback,
      rating: jsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('DD-MM-YYYY')
    })

    if (resp) {
      toast.success("Answer recorded successfully",{className: 'bg-green-500 text-white font-bold',})
      setResults([]);
      if (onAnswerRecorded) {
        onAnswerRecorded(activeQuestionIndex, true);
      }
    }
    setUserAnswer('');

    setResults([]);
    setLoading(false);
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 relative">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          alt="webcam placeholder"
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>

      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <span className="flex gap-2 text-red-600">
            <Mic />
            Stop Recording
          </span>
        ) : (
          "Record Answer"
        )}
      </Button>

    </div>
  );
}

export default RecordAnswerSection;
