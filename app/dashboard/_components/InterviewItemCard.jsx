import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({ interview }) {

    const router = useRouter();

    const onStartAgain = () => {
        if (interview?.mockId) {
            router.push('/dashboard/interview/' + interview.mockId)
        }
    }

    const onFeedBack = () => {
        if (interview?.mockId) {
            router.push('/dashboard/interview/' + interview.mockId+'/feedback')
        }
    }

    return (
        <div className='border shadow-sm rounded-lg p-3'>
            <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
            <h2 className="text-sm text-gray-600">{interview?.jobExperience} years of experience</h2>
            <h2 className="text-xs text-gray-400">Interview Date: {interview.createAt}</h2>

            <div className="flex justify-between mt-2 gap-5">
                <Button onClick={onFeedBack} size="sm" variant="outline" className="flex-1">Feedback</Button>
                <Button onClick={onStartAgain} size="sm" className="flex-1">Start Again</Button>
            </div>
        </div>
    )
}

export default InterviewItemCard
