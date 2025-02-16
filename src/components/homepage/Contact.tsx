import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { PhoneIcon, EnvelopeIcon, CalendarIcon } from '@heroicons/react/24/solid'

export default function ContactSection() {
  return (
    <section className='px-8 py-16'>
      <div className='container mx-auto mb-20 text-center'>
        <h1 className='text-3xl font-bold text-gray-900'>Vaccination Appointment</h1>
        <p className='mx-auto mt-4 w-full text-gray-500 lg:w-5/12'>
          Book your vaccination appointment today. Fill in the form below, and our team will contact you with the
          details.
        </p>
      </div>
      <div>
        <Card className='container mx-auto border border-gray-200'>
          <CardContent className='grid grid-cols-1 md:gap-10 p-6 lg:grid-cols-7'>
            <div className='col-span-3 rounded-lg bg-gray-900 py-8 px-5 text-white md:px-16'>
              <h2 className='text-xl font-semibold'>Contact Information</h2>
              <p className='mt-2 text-gray-400'>
                Our healthcare team is ready to assist you. Book your vaccination appointment now.
              </p>
              <div className='mt-4 flex items-center gap-4'>
                <PhoneIcon className='h-6 w-6' />
                <span>+1(424) 535 3523</span>
              </div>
              <div className='mt-2 flex items-center gap-4'>
                <EnvelopeIcon className='h-6 w-6' />
                <span>support@vaccinecenter.com</span>
              </div>
              <div className='mt-2 flex items-center gap-4'>
                <CalendarIcon className='h-6 w-6' />
                <span>Schedule an Appointment</span>
              </div>
            </div>
            <div className='col-span-4 mt-8 md:mt-0 md:px-10'>
              <form>
                <div className='grid gap-4 lg:grid-cols-2'>
                  <div>
                    <Label>First Name</Label>
                    <Input placeholder='e.g. John' />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input placeholder='e.g. Doe' />
                  </div>
                </div>
                <div className='mt-4'>
                  <Label>Email</Label>
                  <Input placeholder='e.g. john.doe@mail.com' />
                </div>
                <div className='mt-4'>
                  <Label>Preferred Date</Label>
                  <Input type='date' />
                </div>
                <div className='mt-4'>
                  <Label>Vaccine Type</Label>
                  <Input placeholder='e.g. COVID-19, Flu, Hepatitis B' />
                </div>
                <div className='mt-6'>
                  <Label>Additional Notes</Label>
                  <Textarea placeholder='Any health concerns or special requests...' />
                </div>
                <div className='mt-6 flex justify-end'>
                  <Button className='w-full md:w-auto'>Book Appointment</Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
