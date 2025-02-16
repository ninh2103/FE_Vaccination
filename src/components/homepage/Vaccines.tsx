import ProjectCard from '@/components/project-card'

const VACCINATION_INFO = [
  {
    img: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    title: 'COVID-19 Vaccine',
    desc: 'Provides protection against COVID-19 and its variants, helping to reduce the spread of the virus.'
  },
  {
    img: 'https://images.unsplash.com/photo-1625833017043-21a7642b9152',
    title: 'Flu Vaccine',
    desc: 'Annual vaccination to protect against influenza viruses and reduce flu-related complications.'
  },
  {
    img: 'https://images.unsplash.com/photo-1625831152157-2b0e2ca79efa',
    title: 'Hepatitis B Vaccine',
    desc: 'Recommended for infants and adults at risk, preventing serious liver infections caused by hepatitis B virus.'
  },
  {
    img: 'https://images.unsplash.com/photo-1625831152275-fa582de8188e',
    title: 'MMR Vaccine',
    desc: 'Protects against measles, mumps, and rubella, essential for childhood immunization schedules.'
  },
  {
    img: 'https://images.unsplash.com/photo-1611694416641-519e808b2cbb',
    title: 'Polio Vaccine',
    desc: 'Prevents poliomyelitis, a potentially life-threatening disease that can cause paralysis.'
  },
  {
    img: 'https://images.unsplash.com/photo-1633158829551-54d618c269bd',
    title: 'HPV Vaccine',
    desc: 'Protects against human papillomavirus, reducing the risk of cervical and other cancers.'
  },
  {
    img: 'https://images.unsplash.com/photo-1625833017113-6e9a68574292',
    title: 'DTP Vaccine',
    desc: 'Combination vaccine providing protection against diphtheria, tetanus, and pertussis (whooping cough).'
  },
  {
    img: 'https://images.unsplash.com/photo-1618087606218-86087bd4d659',
    title: 'Varicella Vaccine',
    desc: 'Helps prevent chickenpox and its complications, recommended for children and unvaccinated adults.'
  }
]

export function Vaccines() {
  return (
    <section className='py-28 px-8'>
      <div className='container mx-auto mb-20 text-center'>
        <h2 className='text-3xl font-bold text-gray-900'>Vaccination Information</h2>
        <p className='mx-auto w-full px-4 text-gray-500 lg:w-6/12'>
          Stay protected with the latest vaccines available. Here are some essential vaccinations to ensure your health
          and well-being.
        </p>
      </div>
      <div className='container mx-auto grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-4'>
        {VACCINATION_INFO.map((props, idx) => (
          <ProjectCard key={idx} {...props} />
        ))}
      </div>
    </section>
  )
}

export default Vaccines
