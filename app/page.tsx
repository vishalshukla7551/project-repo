'use client'
import { useState } from 'react'

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skill: '',
    portfolio: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    const result = await res.json()
    if (res.ok) {
      setSubmitted(true)
    } else {
      alert(result.error)
    }
  }

  if (submitted) {
    return (
      <div className="flex justify-center items-center h-screen bg-green-100">
        <h2 className="text-2xl font-semibold text-green-800">Thank you for signing up! 🚀</h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 via-pink-100 to-yellow-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Join GigFloww</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Skill Category</label>
            <input
              type="text"
              name="skill"
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Portfolio Link</label>
            <input
              type="url"
              name="portfolio"
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}
