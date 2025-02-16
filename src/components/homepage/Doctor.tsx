export const doctorData = [
  {
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
    name: 'Dr. William Carter',
    specialty: 'Infectious Disease Specialist',
    socials: ['twitter', 'linkedin']
  },
  {
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
    name: 'Dr. Sophia Martinez',
    specialty: 'Pediatrician',
    socials: ['twitter', 'linkedin']
  },
  {
    img: 'https://images.unsplash.com/photo-1622253694238-3b22139576c6',
    name: 'Dr. Ethan Reynolds',
    specialty: 'Epidemiologist',
    socials: ['twitter', 'linkedin']
  },
  {
    img: 'https://images.unsplash.com/photo-1582895361887-24daa40c8667',
    name: 'Dr. Olivia Bennett',
    specialty: 'Immunologist',
    socials: ['twitter', 'facebook']
  }
]

export default function Doctor() {
  return (
    <div className='container mx-auto'>
      <div className='text-center'>
        <h2 className='text-3xl font-bold'>Meet Our Vaccination Experts</h2>
        <p className='text-gray-500'>Our dedicated doctors ensuring safe and effective immunization</p>
      </div>
      <div className='mt-24 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4'>
        {doctorData.map(({ img, name, specialty }) => (
          <div key={name} className='rounded-lg shadow-lg p-4 text-center'>
            <img src={img} alt={name} className='w-32 h-32 mx-auto rounded-full object-cover' />
            <h3 className='mt-4 text-lg font-semibold'>{name}</h3>
            <p className='text-gray-500'>{specialty}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
