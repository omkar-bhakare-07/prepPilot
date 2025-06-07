'use client';
import React from 'react';
import { Lightbulb, Volume2 } from 'lucide-react';
import { MessageSquareWarning } from 'lucide-react';

function QuestionSection({
    mockInterviewQuestion = [],
    activeQuestionIndex = 0,
    onQuestionChange,
    questionStatus
}) {
    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert("Sorry, your browser doesn't support text-to-speech.");
        }
    };

    return (
        <div className="p-5 border rounded-lg my-3 h-full">
            {/* Question Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {mockInterviewQuestion.map((_, index) => {
                    let statusClass = 'bg-gray-300 text-black';
                    if (questionStatus[index] === 'answered') {
                        statusClass = 'bg-green-500 text-white';
                    } else if (questionStatus[index] === 'unanswered') {
                        statusClass = 'bg-red-500 text-white';
                    }

                    // override with active
                    if (activeQuestionIndex === index) {
                        statusClass = 'bg-primary text-white';
                    }

                    return (
                        <h2
                            key={index}
                            className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${statusClass}`}
                            onClick={() => onQuestionChange(index)}
                        >
                            Question {index + 1}
                        </h2>
                    );
                })}


            </div>

            {/* Active Question */}
            <div className="mt-6 min-h-[120px]">
                <h2 className="text-lg md:text-xl font-semibold">
                    {mockInterviewQuestion[activeQuestionIndex]?.Question}
                </h2>
                <Volume2
                    className="mt-3 cursor-pointer text-blue-500 hover:text-blue-600"
                    onClick={() =>
                        textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.Question)
                    }
                />
            </div>

            <div className="border rounded-lg p-5 bg-blue-100 mt-10">
                <h2 className="flex gap-2 items-center text-primary">
                    <Lightbulb />
                    <strong>Note:</strong>
                </h2>
                <p className="text-sm text-primary mt-2">
                    {process.env.NEXT_PUBLIC_INFORMATION}
                </p>
            </div>

            <div className="border rounded-lg p-5 bg-yellow-100 mt-2">
                <h2 className="flex gap-2 items-center text-yellow-700">
                    <MessageSquareWarning />
                    <strong>Caution:</strong>
                </h2>
                <p className="text-sm text-yellow-700 mt-2">
                    Please wait until your answer is submitted before moving to the next question!
                </p>
            </div>

            <div className="border rounded-lg p-5 mt-2">
                <div className="grid grid-cols-2 gap-6">
                    {/* Current Question */}
                    <div className="flex items-center gap-3">
                        <h2 className="w-fit px-5 py-2 rounded-full text-xs bg-primary md:text-sm text-white flex items-center gap-1">
                            <span>Question</span>
                            <span className="font-bold">1</span>
                        </h2>
                        <p className="text-sm">Current Question</p>
                    </div>

                    {/* Attempted */}
                    <div className="flex items-center gap-3">
                        <h2 className="w-fit px-5 py-2 rounded-full text-xs bg-green-500 md:text-sm text-white flex items-center gap-1">
                            <span>Question</span>
                            <span className="font-bold">1</span>
                        </h2>
                        <p className="text-sm">Answered</p>
                    </div>

                    {/* Unattempted */}
                    <div className="flex items-center gap-3">
                        <h2 className="w-fit px-5 py-2 rounded-full text-xs bg-red-500 md:text-sm text-white flex items-center gap-1">
                            <span>Question</span>
                            <span className="font-bold">1</span>
                        </h2>
                        <p className="text-sm">Unanswered</p>
                    </div>

                    {/* Yet to Visit */}
                    <div className="flex items-center gap-3">
                        <h2 className="w-fit px-5 py-2 rounded-full text-xs bg-gray-300 md:text-sm text-black flex items-center gap-1">
                            <span>Question</span>
                            <span className="font-bold">1</span>
                        </h2>
                        <p className="text-sm">Yet to attempt</p>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default QuestionSection;

