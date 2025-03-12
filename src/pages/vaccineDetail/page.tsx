import { Product, Review } from '@/core/types/product.types'

export const vaccines: Product[] = [
  {
    id: 1,
    title: 'Tuberculosis Vaccine',
    srcUrl: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    gallery: [
      'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
      'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
      'https://images.unsplash.com/photo-1618015359417-89be02e0089f'
    ],
    price: 29.99
  },
  {
    id: 2,
    title: 'Tetanus Vaccine',
    srcUrl: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    gallery: [
      'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
      'https://images.unsplash.com/photo-1625833017043-21a7642b9152',
      'https://images.unsplash.com/photo-1625831152275-fa582de8188e'
    ],
    price: 19.99
  },
  {
    id: 3,
    title: 'Hepatitis B Vaccine',
    srcUrl: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    gallery: [
      'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
      'https://images.unsplash.com/photo-1618015359417-89be02e0089f'
    ],
    price: 39.99
  },
  {
    id: 4,
    title: 'Typhoid Vaccine',
    srcUrl: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    gallery: [
      'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
      'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
      'https://images.unsplash.com/photo-1618015359417-89be02e0089f'
    ],
    price: 24.99
  },
  {
    id: 5,
    title: 'Cholera Vaccine',
    srcUrl: 'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
    gallery: [
      'https://images.unsplash.com/photo-1618015359417-89be02e0089f',
      'https://images.unsplash.com/photo-1618015359417-89be02e0089f'
    ],
    price: 22.99
  }
]

export const reviewsData: Review[] = [
  {
    id: 1,
    user: 'John A.',
    content:
      '"I am very satisfied with this vaccine. After receiving the shot, I did not experience any significant side effects and feel much more secure about my health."',
    date: 'February 10, 2024'
  },
  {
    id: 2,
    user: 'Sarah B.',
    content:
      '"The vaccination process was quick and professional. The medical staff provided thorough guidance, which made me feel more confident about getting this vaccine."',
    date: 'February 12, 2024'
  },
  {
    id: 3,
    user: 'Michael C.',
    content:
      '"After receiving the vaccine, I only had mild soreness at the injection site for a day. I am glad to have immunity against this disease now."',
    date: 'February 14, 2024'
  },
  {
    id: 4,
    user: 'Emily D.',
    content:
      '"I have completed my second dose of this vaccine and feel great. Thanks to the healthcare team for their detailed consultation and for helping me understand the benefits of vaccination."',
    date: 'February 16, 2024'
  },
  {
    id: 5,
    user: 'Daniel E.',
    content:
      '"This vaccine has been certified and thoroughly tested for quality. I feel very confident using it to protect myself and my family."',
    date: 'February 18, 2024'
  },
  {
    id: 6,
    user: 'Sophia F.',
    content:
      '"After getting vaccinated, I felt slightly tired on the first day, but everything was fine afterward. It is definitely worth getting for effective disease prevention!"',
    date: 'February 20, 2024'
  }
]
