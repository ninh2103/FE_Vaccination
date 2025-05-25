import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ProjectCardProps {
  img: string
  title: string
  desc: string
}

export function ProjectCard({ img, title, desc }: ProjectCardProps) {
  return (
    <Card className='shadow-none w-80'>
      <CardHeader className='mx-0 mt-0 mb-6 h-48 p-0'>
        <img src={img} alt={title} className='h-full w-full object-cover' />
      </CardHeader>
      <CardContent className='p-0'>
        <a href='#' className='text-gray-900 transition-colors hover:text-gray-800'>
          <h5 className='mb-2 text-lg font-semibold dark:text-white'>{title}</h5>
        </a>
        <p className='mb-6 text-sm text-gray-500 dark:text-white'>{desc}</p>
        <Button variant='outline' className='dark:bg-white dark:text-black' size='sm'>
          Learn more
        </Button>
      </CardContent>
    </Card>
  )
}
