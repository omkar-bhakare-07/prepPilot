'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { WebcamIcon, Lightbulb } from 'lucide-react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import Link from 'next/link';

function Interview() {
  const params = useParams();
  const interviewId = params?.interviewId;

  const [interviewData, setinterviewData] = useState();
  const [webCamEnabled, setwebCamEnabled] = useState(false);

  useEffect(() => {
    if (interviewId) {
      console.log(interviewId);
      GetInterviewDetails();
    }
  }, [interviewId]);

  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));
    setinterviewData(result[0]);
    console.log(result);
  }

  return (
    <div className='my-10'>
      <h2 className="font-bold text-2xl">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">

          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className='text-lg'><strong>Job Role/Position:</strong> {interviewData?.jobPosition}</h2>
            <h2 className='text-lg'><strong>Job Description/Tech Stack:</strong> {interviewData?.jobDes}</h2>
            <h2 className='text-lg'><strong>Years of Experience:</strong> {interviewData?.jobExperience}</h2>
          </div>

          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb /> <strong>Information</strong></h2>
            <h2 className='mt-3 text-gray-600'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>

        </div>

        <div className="">
          {
            webCamEnabled ? (
              <Webcam
                onUserMedia={() => setwebCamEnabled(true)}
                onUserMediaError={() => setwebCamEnabled(false)}
                mirrored={true}
                style={{
                  height: '18rem',
                  width: '100%',
                  marginTop: '1.75rem',
                  marginBottom: '1.75rem',
                  padding: '5rem',
                  backgroundColor: 'var(--secondary)',
                  borderRadius: '0.5rem',
                  border: '1px solid #e5e7eb'
                }}
              />
            ) : (
              <>
                <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
                <Button variant="ghost" className="w-full" onClick={() => setwebCamEnabled(true)}>Enable Camera and Microphone</Button>
              </>
            )
          }
        </div>
      </div>
      <div className="flex justify-end items-center">
      <Link href={'/dashboard/interview/'+interviewId+'/start'}><Button>Start Interview</Button></Link>
        
      </div>
    </div>

  )
}

export default Interview;
