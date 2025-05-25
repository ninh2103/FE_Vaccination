import React, { useState, useEffect } from 'react'

import { LoadingSpinner } from '@/components/ui/loading-spinner'

const PrivacyPolicy: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)

  // Giả lập độ trễ loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500) // Độ trễ 0.5 giây để mô phỏng loading

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className='flex-1 h-screen overflow-y-auto scrollbar-hide flex items-center justify-center'>
        <div className='max-w-4xl mx-auto py-8 px-6'>
          <div className='flex items-center justify-center text-muted-foreground'>
            <LoadingSpinner className='mr-2 h-10 w-10' />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white font-sans'>
      {/* Hero Section */}
      <header className='relative mx-auto mt-[7rem] max-w-5xl rounded-3xl bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 py-16 text-white'>
        <div className='absolute inset-0 rounded-3xl bg-blue-900 opacity-20' />
        <div className='relative z-10 mx-auto max-w-7xl px-4 text-center'>
          <h1 className='mb-4 text-4xl font-extrabold text-white md:text-5xl'>
            Chính sách Bảo mật và Điều khoản Dịch vụ VaxBot
          </h1>
          <p className='mx-auto max-w-3xl text-lg text-white md:text-xl'>
            Tại VaxBot, chúng tôi cam kết bảo vệ quyền riêng tư và đảm bảo an toàn cho thông tin cá nhân của bạn. Tìm
            hiểu cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.
          </p>
        </div>
      </header>

      {/* Nội dung Chính sách và Điều khoản */}
      <section className='py-16'>
        <div className='mx-auto max-w-5xl px-4'>
          {/* Mục đích và Phạm vi */}
          <div className='mb-12 rounded-xl bg-gray-50 p-8 shadow-lg transition duration-300 hover:shadow-xl'>
            <h2 className='mb-4 text-3xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
              1. Mục đích và Phạm vi
            </h2>
            <p className='text-gray-900 leading-relaxed'>
              Chính sách này nêu rõ cách VaxBot thu thập, sử dụng và bảo vệ thông tin cá nhân của người dùng tương tác
              với dịch vụ tiêm chủng, trang web và ứng dụng di động của chúng tôi. Chính sách này áp dụng cho tất cả
              khách hàng, người truy cập trang web và người dùng ứng dụng tương tác với trung tâm chính và các nền tảng
              trực tuyến của VaxBot.
            </p>
          </div>

          {/* Thu thập Thông tin */}
          <div className='mb-12 rounded-xl bg-gray-50 p-8 shadow-lg transition duration-300 hover:shadow-xl'>
            <h2 className='mb-4 text-3xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
              2. Thu thập Thông tin
            </h2>
            <p className='text-gray-900 leading-relaxed'>
              Chúng tôi thu thập các loại thông tin sau để cung cấp và cải thiện dịch vụ tiêm chủng:
            </p>
            <ul className='mt-4 list-disc pl-6 text-gray-900 leading-relaxed'>
              <li>
                <strong>Thông tin Cá nhân:</strong> Họ tên, ngày sinh, giới tính, địa chỉ, số điện thoại, địa chỉ email
                và thông tin định danh được cung cấp trong quá trình đăng ký hoặc đặt lịch hẹn.
              </li>
              <li>
                <strong>Thông tin Y tế:</strong> Lịch sử y tế, hồ sơ tiêm chủng và thông tin sàng lọc sức khỏe được chia
                sẻ trong quá trình tư vấn hoặc đánh giá trước tiêm.
              </li>
              <li>
                <strong>Dữ liệu Kỹ thuật:</strong> Địa chỉ IP, loại trình duyệt, thông tin thiết bị và dữ liệu sử dụng
                được thu thập thông qua cookie và công cụ phân tích trên trang web và ứng dụng.
              </li>
              <li>
                <strong>Thông tin Thanh toán:</strong> Thông tin thanh toán (ví dụ: số thẻ tín dụng) được xử lý an toàn
                qua các cổng thanh toán bên thứ ba và không được VaxBot lưu trữ.
              </li>
            </ul>
          </div>

          {/* Sử dụng Thông tin */}
          <div className='mb-12 rounded-xl bg-gray-50 p-8 shadow-lg transition duration-300 hover:shadow-xl'>
            <h2 className='mb-4 text-3xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
              3. Sử dụng Thông tin
            </h2>
            <p className='text-gray-900 leading-relaxed'>
              VaxBot sử dụng thông tin thu thập được cho các mục đích sau:
            </p>
            <ul className='mt-4 list-disc pl-6 text-gray-900 leading-relaxed'>
              <li>Lên lịch và quản lý các cuộc hẹn tiêm chủng tại trung tâm chính của chúng tôi.</li>
              <li>Cung cấp khuyến nghị và nhắc nhở tiêm chủng cá nhân hóa qua ứng dụng VaxBot.</li>
              <li>Xử lý thanh toán an toàn và cấp chứng nhận tiêm chủng.</li>
              <li>
                Liên lạc với bạn về cập nhật lịch hẹn, tư vấn sức khỏe và ưu đãi khuyến mãi (với sự đồng ý của bạn).
              </li>
              <li>
                Cải thiện dịch vụ, trang web và chức năng ứng dụng thông qua phân tích dữ liệu và phản hồi của người
                dùng.
              </li>
            </ul>
          </div>

          {/* Chia sẻ Thông tin */}
          <div className='mb-12 rounded-xl bg-gray-50 p-8 shadow-lg transition duration-300 hover:shadow-xl'>
            <h2 className='mb-4 text-3xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
              4. Chia sẻ Thông tin
            </h2>
            <p className='text-gray-900 leading-relaxed'>
              VaxBot không bán hoặc trao đổi thông tin cá nhân của bạn. Chúng tôi có thể chia sẻ thông tin của bạn trong
              các trường hợp sau:
            </p>
            <ul className='mt-4 list-disc pl-6 text-gray-900 leading-relaxed'>
              <li>
                <strong>Với Nhà cung cấp Y tế:</strong> Để phối hợp tiêm chủng và chăm sóc y tế của bạn (ví dụ: chia sẻ
                hồ sơ với bác sĩ tại trung tâm chính).
              </li>
              <li>
                <strong>Với Đối tác Tin cậy:</strong> Với các nhà cung cấp dịch vụ bên thứ ba (ví dụ: đơn vị xử lý thanh
                toán, nhà cung cấp phân tích) có nghĩa vụ hợp đồng bảo vệ dữ liệu của bạn.
              </li>
              <li>
                <strong>Tuân thủ Pháp luật:</strong> Khi được yêu cầu bởi pháp luật, chẳng hạn như báo cáo dữ liệu tiêm
                chủng cho cơ quan y tế công cộng theo quy định của Việt Nam.
              </li>
            </ul>
          </div>

          {/* Bảo mật Dữ liệu */}
          <div className='mb-12 rounded-xl bg-gray-50 p-8 shadow-lg transition duration-300 hover:shadow-xl'>
            <h2 className='mb-4 text-3xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
              5. Bảo mật Dữ liệu
            </h2>
            <p className='text-gray-900 leading-relaxed'>
              VaxBot áp dụng các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ dữ liệu của bạn, bao gồm:
            </p>
            <ul className='mt-4 list-disc pl-6 text-gray-900 leading-relaxed'>
              <li>Mã hóa dữ liệu nhạy cảm (ví dụ: thông tin y tế và thanh toán) trong quá trình truyền và lưu trữ.</li>
              <li>
                Kiểm soát truy cập và giao thức xác thực để giới hạn truy cập dữ liệu chỉ cho nhân sự được ủy quyền.
              </li>
              <li>Thực hiện kiểm tra bảo mật định kỳ và cập nhật để bảo vệ khỏi các lỗ hổng.</li>
              <li>Lưu trữ an toàn hồ sơ tiêm chủng tại trung tâm chính, tuân thủ luật bảo vệ dữ liệu của Việt Nam.</li>
            </ul>
            <p className='mt-4 text-gray-900 leading-relaxed'>
              Mặc dù chúng tôi nỗ lực bảo vệ thông tin của bạn, không hệ thống nào hoàn toàn miễn nhiễm với rủi ro.
              Chúng tôi khuyến khích người dùng giữ bí mật thông tin đăng nhập của mình.
            </p>
          </div>

          {/* Quyền của Người dùng */}
          <div className='mb-12 rounded-xl bg-gray-50 p-8 shadow-lg transition duration-300 hover:shadow-xl'>
            <h2 className='mb-4 text-3xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
              6. Quyền của Người dùng
            </h2>
            <p className='text-gray-900 leading-relaxed'>
              Là người dùng VaxBot, bạn có các quyền sau đối với thông tin cá nhân của mình:
            </p>
            <ul className='mt-4 list-disc pl-6 text-gray-900 leading-relaxed'>
              <li>
                <strong>Truy cập:</strong> Yêu cầu truy cập vào dữ liệu cá nhân mà chúng tôi lưu giữ về bạn.
              </li>
              <li>
                <strong>Chỉnh sửa:</strong> Yêu cầu sửa đổi dữ liệu không chính xác hoặc không đầy đủ.
              </li>
              <li>
                <strong>Xóa:</strong> Yêu cầu xóa dữ liệu của bạn, tuân theo các yêu cầu lưu giữ pháp lý (ví dụ: hồ sơ
                tiêm chủng).
              </li>
              <li>
                <strong>Từ chối:</strong> Từ chối nhận thông tin tiếp thị bất kỳ lúc nào qua email hoặc cài đặt ứng
                dụng.
              </li>
            </ul>
            <p className='mt-4 text-gray-900 leading-relaxed'>
              Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi qua thông tin được cung cấp dưới đây.
            </p>
          </div>

          {/* Điều khoản Dịch vụ */}
          <div className='mb-12 rounded-xl bg-gray-50 p-8 shadow-lg transition duration-300 hover:shadow-xl'>
            <h2 className='mb-4 text-3xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
              7. Điều khoản Dịch vụ
            </h2>
            <p className='text-gray-900 leading-relaxed'>
              Bằng cách sử dụng dịch vụ của VaxBot, bạn đồng ý tuân thủ các điều khoản sau:
            </p>
            <ul className='mt-4 list-disc pl-6 text-gray-900 leading-relaxed'>
              <li>
                <strong>Sử dụng Dịch vụ:</strong> Bạn đồng ý sử dụng trang web, ứng dụng và dịch vụ tiêm chủng của
                VaxBot cho các mục đích hợp pháp và theo các hướng dẫn được cung cấp.
              </li>
              <li>
                <strong>Trách nhiệm Người dùng:</strong> Bạn chịu trách nhiệm cung cấp thông tin chính xác trong quá
                trình đăng ký, đặt lịch hẹn và tư vấn y tế.
              </li>
              <li>
                <strong>Hủy bỏ và Hoàn tiền:</strong> Các cuộc hẹn có thể được hủy hoặc thay đổi theo chính sách hủy của
                chúng tôi. Hoàn tiền sẽ được xử lý theo các điều khoản được nêu trong thỏa thuận dịch vụ.
              </li>
              <li>
                <strong>Giới hạn Trách nhiệm:</strong> VaxBot không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh
                từ việc sử dụng dịch vụ của chúng tôi, trừ khi được quy định bởi pháp luật.
              </li>
            </ul>
          </div>

          {/* Chính sách Bảo mật */}
          <div className='mb-12 rounded-xl bg-gray-50 p-8 shadow-lg transition duration-300 hover:shadow-xl'>
            <h2 className='mb-4 text-3xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
              8. Chính sách Bảo mật
            </h2>
            <p className='text-gray-900 leading-relaxed'>
              Chính sách Bảo mật của VaxBot được thiết kế để đảm bảo tính minh bạch trong việc xử lý dữ liệu của bạn:
            </p>
            <ul className='mt-4 list-disc pl-6 text-gray-900 leading-relaxed'>
              <li>
                <strong>Minh bạch:</strong> Chúng tôi cung cấp thông tin rõ ràng về cách dữ liệu của bạn được thu thập,
                sử dụng và chia sẻ.
              </li>
              <li>
                <strong>Đồng ý:</strong> Chúng tôi chỉ thu thập và xử lý dữ liệu với sự đồng ý của bạn hoặc theo yêu cầu
                pháp lý.
              </li>
              <li>
                <strong>Quyền Kiểm soát:</strong> Bạn có quyền kiểm soát dữ liệu cá nhân của mình thông qua các công cụ
                và cài đặt được cung cấp trong ứng dụng VaxBot.
              </li>
            </ul>
          </div>

          {/* Cập nhật Chính sách */}
          <div className='mb-12 rounded-xl bg-gray-50 p-8 shadow-lg transition duration-300 hover:shadow-xl'>
            <h2 className='mb-4 text-3xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
              9. Cập nhật Chính sách
            </h2>
            <p className='text-gray-900 leading-relaxed'>
              VaxBot có thể cập nhật Chính sách Bảo mật và Điều khoản Dịch vụ này định kỳ để phản ánh các thay đổi trong
              hoạt động hoặc yêu cầu pháp lý. Chúng tôi sẽ thông báo cho người dùng về các cập nhật quan trọng qua email
              hoặc thông báo trên ứng dụng. Chính sách cập nhật sẽ được đăng trên trang này kèm theo ngày hiệu lực.
            </p>
          </div>

          {/* Thông tin Liên hệ */}
          <div className='mb-12 rounded-xl bg-gray-50 p-8 shadow-lg transition duration-300 hover:shadow-xl'>
            <h2 className='mb-4 text-3xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
              10. Thông tin Liên hệ
            </h2>
            <p className='text-gray-900 leading-relaxed'>
              Nếu bạn có câu hỏi hoặc thắc mắc về Chính sách Bảo mật, Điều khoản Dịch vụ hoặc cách dữ liệu của bạn được
              xử lý, vui lòng liên hệ với chúng tôi:
            </p>
            <ul className='mt-4 list-disc pl-6 text-gray-900 leading-relaxed'>
              <li>
                <strong>Email:</strong> vaxbot@gmail.com
              </li>
              <li>
                <strong>Điện thoại:</strong> 1900 1900
              </li>
              <li>
                <strong>Địa chỉ:</strong> 120 Hoàng Minh Thảo, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy