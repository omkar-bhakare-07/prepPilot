'use client'

import React from 'react';

export default function QuestionsPage() {
  return (
    <div className='p-10'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="flex flex-col gap-2">
            <section className="max-w-xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">How to Generate an AI Interview:</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>Navigate to your <span className="font-medium">dashboard</span>.</li>
                <li>
                  Click on
                  <button className="mx-2 px-2 py-1 bg-gray-300 border-red-900 rounded-md text-gray-900">+ Add New</button>
                  to create a new interview.
                </li>
                <li>
                  Fill in the details: <span className="italic">Job Position</span>, <span className="italic">Job Description</span>,
                  <span className="italic">Years of Experience</span>, and <span className="italic">Number of Questions</span>.
                </li>
                <li>
                  Click
                  <button className="mx-2 px-2 py-1 bg-primary text-white rounded-md transition">Visit Interview Page</button>
                  to review the interview and proceed.
                </li>
                <li>
                  On the interview page, you’ll see a summary of all the filled details. Review them and click
                  <button className="mx-2 px-2 py-1 bg-primary text-white rounded-md transition">Start Interview</button>
                  to begin your interview.
                </li>
              </ol>
              <p className="mt-6 text-lg font-semibold text-green-700">Congratulations! Your interview has now started.</p>
            </section>
          </div>
        </div>

        <div>
          <section className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">How to Generate Questions:</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Visit to <span className="font-medium">Questions</span>.</li>
              <li>
                Select the question type: <span className="font-medium">Technical</span>, <span className="font-medium">Behavioral (HR)</span>, or
                <span className="font-medium"> System Design</span>.
              </li>
              <li>
                If you choose <span className="italic">Technical</span>, enter the relevant
                <span className="font-medium ml-1">Tech Track</span>; if you choose <span className="italic">HR</span>, enter the
                <span className="font-medium ml-1">HR Focus Area</span>.
              </li>
              <li>
                Select the <span className="font-medium">Number of Questions</span>, then click
                <button className="ml-2 px-2 py-1 bg-primary text-white rounded-md transition">Generate Questions & Answer</button>.
              </li>
              <li>
                The questions and answers will be generated by AI and displayed on the screen.
              </li>
            </ol>
          </section>

        </div>
      </div>

    </div>
  );
}
