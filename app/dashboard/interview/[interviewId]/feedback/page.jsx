'use client'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Feedback({ params }) {

  const { interviewId } = React.use(params);
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();
  const [avgRating, setAvgRating] = useState();

  useEffect(() => {
    GetFeedback();
  }, [])

  const GetFeedback = async () => {
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);

    if (result.length > 0) {
      const validRatings = result
        .map(item => Number(item.rating))
        .filter(rating => !isNaN(rating));
  
      const sum = validRatings.reduce((acc, rating) => acc + rating, 0);
      const avg = (sum / validRatings.length).toFixed(1);
      setAvgRating(avg);
    } else {
      setAvgRating(0);
    }
  }

  return (
    <div className='p-10'>
      {feedbackList?.length === 0 ?
        <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Record found</h2>
        :
        <>
          <h2 className="text-2xl font-bold text-green-500">Congratulations!</h2>
          <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
          <h2 className="text-primary text-lg my-3">Your overall interview rating: <strong>{avgRating}</strong></h2>
          <h2 className="text-sm text-gray-500   ">Find below interview question with correct answer, Your answer and feedback for improvement</h2>

          {feedbackList && feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-5">
              <CollapsibleTrigger className='flex justify-between p-2 bg-secondary rounded-lg my-2 text-left gap-10 w-full'>{item.question} <ChevronsUpDown className='h-5 w-5' /></CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 border rounded-lg"><strong>Rating: </strong>{item.rating}</h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900"><strong>Your Answer: </strong>{item.userAnswer}</h2>
                  <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900"><strong>Correct Answer: </strong>{item.correctAnswer}</h2>
                  <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary"><strong>Feedback: </strong>{item.feedback}</h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      }

      <Button onClick={() => router.replace('/dashboard')} className="mt-3">Go Home</Button>
    </div>
  )
}

export default Feedback
