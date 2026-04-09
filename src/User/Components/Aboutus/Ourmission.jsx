import React from 'react'

const Ourmission = () => {
  return (
    <div className='flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 text-zinc-800'>
      
      <div className='bg-white/70 p-4 rounded-lg shadow-sm'>
        <h1 className='text-center text-lg font-semibold mb-2'>Our Mission</h1>
        <ul className='list-disc pl-5 space-y-1'>
            <li>Simplify the job search process</li>
            <li>Connect talent with the right opportunities</li>
            <li>Empower companies to hire smarter and faster</li>
        </ul>
      </div>

      <div className='bg-white/70 p-4 rounded-lg shadow-sm'>
        <h1 className='text-center text-lg font-semibold mb-2'>Our Vision</h1>
         <ul className='list-disc pl-5 space-y-1'>
            <li>Bridges the gap between talent and opportunity</li>
            <li>Supports career growth at every stage</li>
            <li>Builds a strong and reliable hiring ecosystem</li>
        </ul>
      </div>

      <div className='bg-white/70 p-4 rounded-lg shadow-sm'>
        <h1 className='text-center text-lg font-semibold mb-2'>What We Offer</h1>
        <ul className='list-disc pl-5 space-y-1'>
            <li>Easy-to-use job search platform</li>
            <li>One-click job applications</li>
            <li>Personalized job recommendations</li>
            <li>Profile management and application tracking</li>
            <li>Access to opportunities across multiple domains</li>
        </ul>
      </div>

      <div className='bg-white/70 p-4 rounded-lg shadow-sm'>
        <h1 className='text-center text-lg font-semibold mb-2'>For Employers</h1>
        <ul className='list-disc pl-5 space-y-1'>
            <li>Post jobs quickly and easily</li>
            <li>Reach a wide pool of qualified candidates</li>
            <li>Streamlined hiring process</li>
            <li>Efficient candidate filtering and management</li>
        </ul>
      </div>

    </div>
  )
}

export default Ourmission