export default function MessengerButton() {
  const handleMessengerClick = () => {
    window.open('https://m.me/61575699530090', '_blank')
  }

  return (
    <div className='relative group'>
      <button
        onClick={handleMessengerClick}
        className='rounded-full bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-white shadow-xl hover:bg-blue-600 w-14 h-14 flex items-center justify-center z-40'
        aria-label='Messenger Chat'
        title='Chat with us on Messenger'
      >
        <div className='bg-white w-7 h-7 rounded-full flex items-center justify-center'>
          <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='#0084FF'>
            <path d='M12.004 2C6.486 2 2 6.028 2 11.041c0 2.859 1.301 5.388 3.37 7.151V22l3.096-1.7c1.065.296 2.197.456 3.538.456 5.518 0 10.004-4.028 10.004-9.041S17.522 2 12.004 2zm.254 13.514-2.56-2.733-5.19 2.733 6.478-6.801 2.515 2.731 5.148-2.731-6.391 6.801z' />
          </svg>
        </div>
      </button>
      <div className='absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center justify-center opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200'>
        <div className='relative bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow-md border border-white/20 w-48 text-center'>
          Chat với Bác sĩ
          <div className='absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-blue-400'></div>
        </div>
      </div>
    </div>
  )
}