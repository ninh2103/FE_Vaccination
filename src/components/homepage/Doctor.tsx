export const doctorData = [
  {
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
    name: 'Tiến sĩ William Carter',
    specialty: 'Chuyên gia về bệnh truyền nhiễm',
    socials: ['twitter', 'linkedin']
  },
  {
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
    name: 'Tiến sĩ Sophia Martinez',
    specialty: 'Bác sĩ nhi khoa',
    socials: ['twitter', 'linkedin']
  },
  {
    img: 'https://images.unsplash.com/photo-1622253694238-3b22139576c6',
    name: 'Tiến sĩ Ethan Reynolds',
    specialty: 'Nhà dịch tễ học',
    socials: ['twitter', 'linkedin']
  },
  {
    img: 'https://images.unsplash.com/photo-1582895361887-24daa40c8667',
    name: 'Tiến sĩ Olivia Bennett',
    specialty: 'Bác sĩ miễn dịch học',
    socials: ['twitter', 'facebook']
  }
]

export default function Doctor() {
  return (
    <div className='container mx-auto'>
      <div className='text-center'>
        <h2 className='text-3xl font-bold'>Gặp gỡ các chuyên gia tiêm chủng của chúng tôi</h2>
        <p className='text-gray-500'>Các bác sĩ tận tâm của chúng tôi đảm bảo tiêm chủng an toàn và hiệu quả</p>
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
