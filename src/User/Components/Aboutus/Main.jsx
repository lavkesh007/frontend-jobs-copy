import React from 'react'
import Ourmission from './Ourmission'

const Main = () => {
  return (
    <div id='about' className='flex flex-col gap-7 p-4 md:p-8 bg-black/30 rounded-sm'>
        
        <div className='flex flex-col text-center gap-4 md:gap-5'>
            
            <div>
                <h1 className='text-2xl md:text-3xl font-bold text-stone-700 tracking-widest'>
                  About us
                </h1>
            </div>
           
            <div className='text-slate-600 text-sm md:text-lg leading-relaxed px-2 md:px-10'>
                <p>
                  LynkJobs is a modern job portal platform built to seamlessly connect job seekers with employers.
                  <br className='hidden md:block' />
                  We focus on creating meaningful connections that help individuals grow in their careers while enabling companies to find the right talent efficiently.
                </p>

                <p className='mt-2'>
                  At LynkJobs, we believe that the right opportunity can change a life, and the right talent can transform a business.
                </p>
            </div>

        </div>
        
        <div className='mt-2'>
            <Ourmission/>
        </div>
    </div>
  )
}

export default Main