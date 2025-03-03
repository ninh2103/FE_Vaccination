const BlogCard = ({ title, date, description, image, link }) => (
  <div className='border rounded-lg overflow-hidden shadow-lg'>
    <img src={image} alt={title} className='w-full h-48 object-cover' />
    <div className='p-4'>
      <a href={link}>
        <h3 className='text-xl font-bold dark:text-white hover:text-green-500 transition-colors duration-300 cursor-pointer'>
          {title}
        </h3>
      </a>
      <p className='dark:text-white text-sm'>{date}</p>
      <p className='mt-2 dark:text-white'>{description}</p>
    </div>
  </div>
)

const Blog = () => {
  const blogs = [
    {
      title: 'HOW LONG DOES IS TAKE TO RECOVER FROM DENUE FEVER.... ?',
      date: '10 25',
      description:
        'How long does it take to recover from dengue fever before you can take a bath? Notes you need to know',
      image: 'https://vnvc.vn/wp-content/uploads/2025/02/het-sot-xuat-huyet-bao-lau-thi-duoc-tam.jpg',
      link: '/blog/khoi-sot-xuat-huyet-bao-lau-thi-duoc-tam'
    },
    {
      title: 'HPV – HIGH-RISK SILENT VIRUS AND PREVENTION METHODS...',
      date: '10 22',
      description: 'HPV – A Silently Dangerous Virus and How to Effectively Prevent It What is HPV and why...',
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
    <div className='max-w-[100rem] mx-auto p-4'>
      <h2 className='text-balance text-3xl font-bold xl:text-center mb-2'>Expert Articles on Vaccination & Health</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6'>
        {blogs.map((blog, index) => (
          <BlogCard key={index} {...blog} />
        ))}
      </div>
    </div>
  )
}

export default Blog
