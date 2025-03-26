import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Calendar, User } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  tag: {
    id: string
    name: string
  }
  createdAt: string
  content: string
  author: string
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Vắc xin COVID-19: Những điều cần biết về các loại vắc xin phổ biến',
    tag: { id: '101', name: 'COVID-19' },
    createdAt: '2024-03-20T12:00:00Z',
    content: `
      <h2 class="text-2xl font-semibold mt-8 mb-4">1. Các loại vắc xin COVID-19 phổ biến</h2>
      <p class="mb-6">Hiện nay có nhiều loại vắc xin COVID-19 đã được phê duyệt và sử dụng rộng rãi trên toàn thế giới. Các loại vắc xin chính bao gồm: Pfizer-BioNTech, Moderna, AstraZeneca, và Johnson & Johnson.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">2. Hiệu quả và thời gian bảo vệ</h2>
      <p class="mb-6">Các nghiên cứu cho thấy vắc xin COVID-19 có hiệu quả cao trong việc ngăn ngừa bệnh nặng và tử vong. Thời gian bảo vệ có thể kéo dài từ 6-12 tháng, tùy thuộc vào loại vắc xin và biến thể virus.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">3. Lịch tiêm chủng</h2>
      <p class="mb-6">Hầu hết các vắc xin COVID-19 yêu cầu 2 liều tiêm, cách nhau 3-4 tuần. Một số loại như Johnson & Johnson chỉ cần 1 liều. Liều tăng cường được khuyến nghị sau 6 tháng.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">4. Tác dụng phụ thường gặp</h2>
      <p class="mb-6">Các tác dụng phụ phổ biến bao gồm: đau tại vị trí tiêm, mệt mỏi, đau đầu, đau cơ, ớn lạnh. Các tác dụng phụ này thường nhẹ và tự khỏi sau 1-2 ngày.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">5. Đối tượng cần thận trọng</h2>
      <p class="mb-6">Một số nhóm đối tượng cần được tư vấn kỹ trước khi tiêm: phụ nữ mang thai, người có bệnh nền, người có tiền sử dị ứng nặng.</p>
    `,
    author: 'Dr. Nguyen Van A'
  },
  {
    id: '2',
    title: 'Lịch tiêm chủng cho trẻ sơ sinh và trẻ nhỏ',
    tag: { id: '102', name: 'Pediatrics' },
    createdAt: '2024-03-19T09:30:00Z',
    content: `
      <h2 class="text-2xl font-semibold mt-8 mb-4">1. Lịch tiêm chủng cơ bản</h2>
      <p class="mb-6">Trẻ sơ sinh cần được tiêm vắc xin viêm gan B ngay sau khi sinh. Trong 6 tháng đầu đời, trẻ cần được tiêm các loại vắc xin cơ bản như: BCG, viêm gan B, bạch hầu-ho gà-uốn ván, bại liệt.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">2. Vắc xin cho trẻ 6-12 tháng</h2>
      <p class="mb-6">Giai đoạn này trẻ cần được tiêm các mũi nhắc lại và bổ sung thêm vắc xin sởi-quai bị-rubella, thủy đậu, viêm màng não mủ.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">3. Vắc xin cho trẻ 1-5 tuổi</h2>
      <p class="mb-6">Trẻ cần được tiêm nhắc lại các vắc xin cơ bản và bổ sung thêm vắc xin viêm gan A, cúm mùa, thương hàn.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">4. Lưu ý khi tiêm chủng</h2>
      <p class="mb-6">Cần theo dõi trẻ sau tiêm, đảm bảo trẻ khỏe mạnh trước khi tiêm, không tiêm khi trẻ đang sốt hoặc có bệnh cấp tính.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">5. Theo dõi sau tiêm</h2>
      <p class="mb-6">Sau tiêm cần theo dõi trẻ ít nhất 30 phút tại cơ sở tiêm chủng, tiếp tục theo dõi tại nhà trong 24-48 giờ.</p>
    `,
    author: 'Dr. Tran Thi B'
  },
  {
    id: '3',
    title: 'Vắc xin cúm mùa: Tại sao nên tiêm phòng hàng năm?',
    tag: { id: '103', name: 'Flu' },
    createdAt: '2024-03-18T15:45:00Z',
    content: `
      <h2 class="text-2xl font-semibold mt-8 mb-4">1. Tại sao cần tiêm vắc xin cúm hàng năm?</h2>
      <p class="mb-6">Virus cúm thường xuyên biến đổi, tạo ra các chủng mới. Vắc xin cúm được cập nhật hàng năm để phù hợp với các chủng virus mới nhất.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">2. Đối tượng cần tiêm phòng</h2>
      <p class="mb-6">Tất cả mọi người từ 6 tháng tuổi trở lên đều nên tiêm vắc xin cúm, đặc biệt là người cao tuổi, trẻ em, phụ nữ mang thai và người có bệnh mạn tính.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">3. Thời điểm tiêm phòng</h2>
      <p class="mb-6">Nên tiêm vắc xin cúm trước mùa cúm (thường là mùa thu-đông). Tuy nhiên, có thể tiêm bất cứ lúc nào trong mùa cúm.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">4. Hiệu quả của vắc xin</h2>
      <p class="mb-6">Vắc xin cúm có thể giảm 40-60% nguy cơ mắc cúm và giảm đáng kể nguy cơ biến chứng nặng.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">5. Tác dụng phụ</h2>
      <p class="mb-6">Tác dụng phụ thường nhẹ: đau tại vị trí tiêm, sốt nhẹ, đau cơ. Các phản ứng nặng rất hiếm gặp.</p>
    `,
    author: 'Dr. Le Van C'
  }
]

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const blogPost = blogPosts.find((post) => post.id === id) || blogPosts[0]

  return (
    <div className='flex-1 h-screen overflow-y-auto scrollbar-hide'>
      <div className='max-w-4xl mx-auto py-8 px-6'>
        <Card className='shadow-lg'>
          <CardContent className='p-8'>
            <div className='mb-8'>
              <h1 className='text-4xl font-bold mb-6 leading-tight'>{blogPost.title}</h1>
              <div className='flex flex-wrap items-center gap-4 mb-6'>
                <Badge variant='default' className='text-sm px-3 py-1'>
                  {blogPost.tag.name}
                </Badge>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Calendar className='h-4 w-4' />
                  {format(new Date(blogPost.createdAt), 'MMMM d, yyyy')}
                </div>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <User className='h-4 w-4' />
                  {blogPost.author}
                </div>
              </div>
              <div className='h-px bg-border' />
            </div>

            <div
              className='prose prose-lg prose-gray max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:leading-relaxed prose-p:mb-6'
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BlogDetails
