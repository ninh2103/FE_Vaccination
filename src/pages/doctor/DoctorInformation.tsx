'use client'

import { useState } from 'react'
import { Calendar, Award } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'

export default function FeaturedDoctor() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className='min-h-screen flex flex-col bg-white'>
      {/* Header */}
      <div className='sticky top-0 z-50 bg-white shadow-sm'>
        <Header />
      </div>

      {/* Main Section */}
      <section className='pt-24 pb-16 md:pt-28 md:pb-20'>
        <div className='container mx-auto px-4 max-w-6xl'>
          {/* Doctor Header Section */}
          <div className='flex flex-col md:flex-row gap-10 md:gap-16 items-start mb-16'>
            {/* Doctor Image */}
            <div className='w-48 h-72 md:w-64 md:h-96 flex-shrink-0'>
              <img
                src='https://images.unsplash.com/photo-1612349317150-e413f6a5b16d'
                alt='Dr. Sarah Johnson'
                className='w-full h-full rounded-2xl object-cover shadow-lg transition-transform duration-300 hover:scale-105'
              />
            </div>

            {/* Doctor Info */}
            <div className='flex-1 space-y-6'>
              <Badge className='bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-white text-sm py-1 px-4 rounded-full shadow-sm'>
                Medical Director
              </Badge>
              <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
                Dr. Sarah Johnson
              </h1>
              <p className='text-xl text-gray-600'>MD, Immunology Specialist</p>
              <p className='text-gray-700 text-lg leading-relaxed'>
                Dr. Sarah Johnson is a board-certified immunologist with over 15 years of experience in vaccination and
                immunology. She leads our medical team with a patient-centered approach, ensuring the highest standards
                of care and safety.
              </p>
            </div>
          </div>

          {/* Tabs Section */}
          <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100'>
            <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
              <TabsList className='flex flex-wrap gap-3 bg-transparent border-b border-gray-200 mb-8'>
                <TabsTrigger
                  value='overview'
                  className='px-6 py-3 text-gray-700 font-semibold rounded-lg border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 transition-all duration-300 hover:bg-blue-50'
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value='experience'
                  className='px-6 py-3 text-gray-700 font-semibold rounded-lg border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 transition-all duration-300 hover:bg-blue-50'
                >
                  Experience
                </TabsTrigger>
                <TabsTrigger
                  value='education'
                  className='px-6 py-3 text-gray-700 font-semibold rounded-lg border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 transition-all duration-300 hover:bg-blue-50'
                >
                  Education
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value='overview' className='space-y-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  <div className='flex items-start gap-5'>
                    <div className='h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-md'>
                      <Award className='h-6 w-6 text-white' />
                    </div>
                    <div>
                      <p className='font-semibold text-gray-800 text-lg'>Board Certified</p>
                      <p className='text-gray-600'>American Board of Allergy and Immunology</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-5'>
                    <div className='h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-md'>
                      <Calendar className='h-6 w-6 text-white' />
                    </div>
                    <div>
                      <p className='font-semibold text-gray-800 text-lg'>15+ Years Experience</p>
                      <p className='text-gray-600'>Specialized in Vaccination</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value='experience' className='space-y-8'>
                <div className='space-y-8'>
                  <div className='flex items-start gap-5'>
                    <div className='h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-md'>
                      <Calendar className='h-6 w-6 text-white' />
                    </div>
                    <div>
                      <p className='font-semibold text-gray-800 text-lg'>Medical Director</p>
                      <p className='text-blue-600 font-medium'>VaccineCare Center</p>
                      <p className='text-gray-600'>2018 - Present</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-5'>
                    <div className='h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-md'>
                      <Calendar className='h-6 w-6 text-white' />
                    </div>
                    <div>
                      <p className='font-semibold text-gray-800 text-lg'>Chief Immunologist</p>
                      <p className='text-blue-600 font-medium'>National Health Institute</p>
                      <p className='text-gray-600'>2012 - 2018</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-5'>
                    <div className='h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-md'>
                      <Calendar className='h-6 w-6 text-white' />
                    </div>
                    <div>
                      <p className='font-semibold text-gray-800 text-lg'>Research Fellow</p>
                      <p className='text-blue-600 font-medium'>University Medical Center</p>
                      <p className='text-gray-600'>2008 - 2012</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value='education' className='space-y-8'>
                <div className='space-y-8'>
                  <div className='flex items-start gap-5'>
                    <div className='h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-md'>
                      <Calendar className='h-6 w-6 text-white' />
                    </div>
                    <div>
                      <p className='font-semibold text-gray-800 text-lg'>Fellowship in Immunology</p>
                      <p className='text-blue-600 font-medium'>Stanford University Medical Center</p>
                      <p className='text-gray-600'>2006 - 2008</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-5'>
                    <div className='h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-md'>
                      <Calendar className='h-6 w-6 text-white' />
                    </div>
                    <div>
                      <p className='font-semibold text-gray-800 text-lg'>Residency in Internal Medicine</p>
                      <p className='text-blue-600 font-medium'>Johns Hopkins Hospital</p>
                      <p className='text-gray-600'>2003 - 2006</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-5'>
                    <div className='h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-md'>
                      <Calendar className='h-6 w-6 text-white' />
                    </div>
                    <div>
                      <p className='font-semibold text-gray-800 text-lg'>Doctor of Medicine (MD)</p>
                      <p className='text-blue-600 font-medium'>Harvard Medical School</p>
                      <p className='text-gray-600'>1999 - 2003</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
