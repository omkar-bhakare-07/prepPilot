// 'use client'
// import React from 'react'
// import { Lightbulb, Volume2 } from 'lucide-react';

// function QuestionSection({ mockInterviewQuestion = [], activeQuestionIndex = 0, onQuestionChange }) {
//     const textToSpeech = (text) => {
//         if ('speechSynthesis' in window) {
//             const speech = new SpeechSynthesisUtterance(text);
//             window.speechSynthesis.speak(speech);
//         } else {
//             alert("Sorry your browser doesn't support text to speech");
//         }
//     }

//     if (mockInterviewQuestion.length === 0) {
//         return <p>Loading questions...</p>;
//     }

//     return (
//         <div className='p-5 border rounded-lg my-3'>
//             {/* Question number buttons */}
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//                 {mockInterviewQuestion.map((question, index) => (
//                     <button
//                         key={index}
//                         onClick={() => onQuestionChange(index)}
//                         className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer 
//                           ${activeQuestionIndex === index ? 'bg-primary text-white' : 'bg-secondary'}`}
//                         type="button"
//                         aria-current={activeQuestionIndex === index ? 'true' : 'false'}
//                     >
//                         Question {index + 1}
//                     </button>
//                 ))}
//             </div>

//             {/* Active question text */}
//             <h2 className='my-5 md:text-md text-lg'>
//                 {mockInterviewQuestion[activeQuestionIndex]?.Question || "No question available"}
//             </h2>

//             {/* Text to speech icon */}
//             <Volume2
//                 className='cursor-pointer'
//                 onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.Question)}
//             />

//             {/* Note section */}
//             <div className="border rounded-lg p-5 bg-blue-100 mt-20">
//                 <h2 className='flex gap-2 items-center text-primary'>
//                     <Lightbulb />
//                     <strong>Note: </strong>
//                 </h2>
//                 <p className="text-sm text-primary my-2">{process.env.NEXT_PUBLIC_INFORMATION}</p>
//             </div>
//         </div>
//     )
// }

// export default QuestionSection;


'use client';
import React from 'react';
import { Lightbulb, Volume2 } from 'lucide-react';

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
                {/* {mockInterviewQuestion.map((question, index) => {
                    let status = questionStatus[index];
                    let className = '';

                    if (activeQuestionIndex === index) {
                        className = 'bg-primary text-white';
                    } else if (status === 'answered') {
                        className = 'bg-green-200 text-green-800';
                    } else if (status === 'unanswered') {
                        className = 'bg-red-200 text-red-800';
                    } else {
                        className = 'bg-gray-200'; 
                    }

                    return (
                        <h2
                            key={index}
                            onClick={() => onQuestionChange(index)}
                            className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${className}`}
                        >
                            Question #{index + 1}
                        </h2>
                    );
                })} */}

                {mockInterviewQuestion.map((_, index) => {
                    let statusClass = 'bg-gray-300 text-black'; // default (unvisited)

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
                            Question #{index + 1}
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

            {/* Info */}
            <div className="border rounded-lg p-5 bg-blue-100 mt-10">
                <h2 className="flex gap-2 items-center text-primary">
                    <Lightbulb />
                    <strong>Note:</strong>
                </h2>
                <p className="text-sm text-primary mt-2">
                    {process.env.NEXT_PUBLIC_INFORMATION}
                </p>
            </div>
        </div>
    );
}

export default QuestionSection;

