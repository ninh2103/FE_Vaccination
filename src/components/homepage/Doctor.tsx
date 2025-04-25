export const doctorData = [
  {
    img: 'https://taimuihongsg.com/wp-content/uploads/2018/05/Kim-Bun-ThuongE_taimuihongsg.jpg',
    name: 'Dr. Kim Bun ThươnE',
    specialty: 'Infectious Disease Specialist'
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiUuWEAL-skJiMIo215qR45124XlpmBj_zEZrtev1v1XQoKHw7v5lgPtMgCbhvYYctfFI&usqp=CAU',
    name: 'Dr. Truong The Anh',
    specialty: 'Pediatrician'
  },
  {
    img: 'https://hih.vn/wp-content/uploads/2018/09/%E1%BA%A3nh-6.jpg',
    name: 'Dr. Nguyen Thi Hang',
    specialty: 'Epidemiologist'
  },
  {
    img: 'https://hih.vn/wp-content/uploads/2018/09/tran-thi-trang.jpg',
    name: 'Dr. Tran Thi Trang',
    specialty: 'Immunologist'
  }
]

export default function Doctor() {
  return (
    <div className='container mx-auto py-16 bg-gray-50 dark:bg-gray-900'>
      <div className='text-center'>
        <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>Meet Our Vaccination Experts</h2>
        <p className='text-gray-500 dark:text-gray-400'>
          Our dedicated doctors ensuring safe and effective immunization
        </p>
      </div>
      <div className='mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4'>
        {doctorData.map(({ img, name, specialty }) => (
          <div
            key={name}
            className='bg-white rounded-xl shadow-xl p-6 text-center border border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition duration-300 hover:shadow-xl hover:-translate-y-2 transform'
          >
            <img
              src={img}
              alt={name}
              className='w-32 h-32 mx-auto rounded-full object-cover transition duration-300 hover:scale-105'
            />
            <h3 className='mt-4 text-xl font-bold text-gray-900 dark:text-white'>{name}</h3>
            <p className='text-base text-gray-600 dark:text-gray-300'>{specialty}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
