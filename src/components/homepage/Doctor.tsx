import { useListUserQuery } from '@/queries/useUser'

export default function Doctor() {
  const { data: usersData } = useListUserQuery({
    page: 1,
    items_per_page: 100,
    search: ''
  })

  const doctorData = usersData?.data.filter((user) => user.role.name === 'DOCTOR')

  return (
    <div className='container mx-auto'>
      <div className='text-center'>
        <h2 className='text-3xl font-bold'>Gặp Gỡ Chuyên Gia Tiêm Chủng</h2>
        <p className='text-gray-500'>Đội ngũ bác sĩ chuyên nghiệp đảm bảo an toàn và hiệu quả</p>
      </div>
      <div className='mt-24 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4'>
        {doctorData?.map(({ avatar, name }) => (
          <div key={name} className='rounded-lg shadow-lg p-4 text-center'>
            <img
              src={avatar || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}
              alt={name}
              className='w-32 h-32 mx-auto rounded-full object-cover'
            />
            <h3 className='mt-4 text-lg font-semibold'>{name}</h3>
            <p className='text-gray-500'>Bác sĩ</p>
          </div>
        ))}
      </div>
    </div>
  )
}
