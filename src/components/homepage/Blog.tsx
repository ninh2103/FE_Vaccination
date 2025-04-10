import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import 'swiper/swiper-bundle.css'

const BlogCard = ({ title, date, description, image, link }) => {
  // Hàm cắt ngắn description nếu quá dài
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  // Cắt ngắn title và description để đảm bảo chiều cao đồng đều
  const truncatedTitle = truncateText(title, 50) // Giới hạn title 50 ký tự
  const truncatedDescription = truncateText(description, 100) // Giới hạn description 100 ký tự

  return (
    <div className='border rounded-lg overflow-hidden shadow-lg h-full flex flex-col'>
      <img src={image} alt={title} className='w-full h-48 object-cover' />
      <div className='p-4 flex flex-col flex-grow'>
        <a href={link}>
          <h3 className='text-xl font-bold dark:text-white hover:text-green-500 transition-colors duration-300 cursor-pointer line-clamp-2'>
            {truncatedTitle}
          </h3>
        </a>
        <p className='dark:text-white text-sm mt-1'>{date}</p>
        <p className='mt-2 dark:text-white flex-grow line-clamp-3'>{truncatedDescription}</p>
      </div>
    </div>
  )
}

const Blog = () => {
  const blogs = [
    {
      title: 'HOW LONG DOES IS TAKE TO RECOVER FROM DENUE FEVER.... ?',
      date: '10 25',
      description:
        'How long does it take to recover from dengue fever ....',
      image: 'https://vnvc.vn/wp-content/uploads/2025/02/het-sot-xuat-huyet-bao-lau-thi-duoc-tam.jpg',
      link: '/blog/khoi-sot-xuat-huyet-bao-lau-thi-duoc-tam'
    },
    {
      title: 'HPV – HIGH-RISK SILENT VIRUS AND PREVENTION METHODS...',
      date: '10 22',
      description: 'HPV – A Silently Dangerous Virus ...',
      image: 'https://vnvc.vn/wp-content/uploads/2024/11/vnvc-co-du-vac-xin-hpv.jpg',
      link: '/blog/hpv-viruss'
    },
    {
      title: '10 REASONS YOU SHOULD CHOOSE VAX-BOX TO VACCINATE...',
      date: '05 30',
      description: '1st: Vax-Box vaccination and medical service center...',
      image:
        'https://bizweb.dktcdn.net/100/524/140/files/464821244-3966396143604819-6230181539781010370-n.jpg?v=1730080483781',
      link: '/blog/ly-do-chon-vaxbox'
    },
    {
      title: 'DOES MEASLES VACCINE CAUSE MORE FEVER?',
      date: '05 28',
      description: 'Measles vaccine Does measles vaccination have measles?...',
      image: 'https://vnvc.vn/wp-content/uploads/2024/12/kham-sang-loc-truoc-tiem-1.jpg',
      link: '/blog/tiem-vacxin-soi'
    }
  ]

  return (
    <section className='py-12 px-8 w-full relative'>
      <div className='container mx-auto'>
      <h2 className='text-3xl font-bold text-center'>Expert Articles on Vaccination & Health</h2>
        <div className='relative mb-8'>
          
          <div className='absolute top-0 right-0'>
            <Link to='/blog'>
              <Button variant='outline' size='sm'>
                Show All
              </Button>
            </Link>
          </div>
        </div>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          loop={true}
          modules={[Autoplay]}
          className='w-full'
        >
          {blogs.map((blog, index) => (
            <SwiperSlide key={index} className='p-4'>
              <BlogCard {...blog} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Blog