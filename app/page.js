'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div className="bg-gray-50 text-gray-800 font-sans">

      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 text-gray-100">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to <span className="text-amber-400">PrepPilot</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-300">
          Your AI-powered platform to practice real interviews, generate personalized questions, and get actionable feedback to improve every day.
        </p>
        <img
          src="/aichat.png"
          alt="AI Interview"
          className="mx-auto w-64 md:w-80 mb-6"
          style={{ filter: 'brightness(0.85) saturate(0.9)' }} // soften bright white
        />
        <button
          onClick={() => router.push('/dashboard')}
          className="mt-4 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold rounded-full shadow-md transition"
        >
          Visit Website
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">What can you do with PrepPilot?</h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              img: '/questions.png',
              title: 'AI-Generated Questions',
              desc: 'Get intelligent and contextual interview questions based on your job role, experience, and goals.',
            },
            {
              img: '/interview.png',
              title: 'Mock Interviews',
              desc: 'Practice realistic interviews with timed responses and AI-assistance to simulate actual interview environments.',
            },
            {
              img: '/feedback.png',
              title: 'Smart Feedback',
              desc: 'Receive real-time feedback with tips on how to improve your answers, tone, confidence, and structure.',
            },
          ].map(({ img, title, desc }, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
            >
              <img
                src={img}
                alt={title}
                className="w-32 mx-auto mb-4"
                style={{ filter: 'brightness(0.9) saturate(0.8)' }} // soften images
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
              <p className="text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Improvement Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Improve with Every Session</h2>
          <p className="text-lg text-gray-700 mb-8">
            PrepPilot is more than just practice — it's your smart companion. Track your progress, analyze your performance,
            and grow into the confident professional you're meant to be.
          </p>
          <img
            src="/performance.png"
            alt="Performance"
            className="mx-auto w-64"
            style={{ filter: 'brightness(0.9) saturate(0.85)' }}
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-white">
        <h2 className="text-2xl font-semibold mb-6">Ready to ace your next interview?</h2>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-8 py-4 bg-gray-800 text-white font-bold rounded-full shadow-lg hover:bg-gray-700 transition"
        >
          Visit Website
        </button>
      </section>
    </div>
  )
}
