import React from 'react'

const ServiceIntro: React.FC = () => {
  return (
    <div className='min-h-screen '>
      <header className='relative top-0 left-0 w-full bg-white p-20 z-10 rounded-lg shadow-lg'>
        <div
          className='absolute rounded-lg shadow-lg  inset-0 w-full h-full bg-cover bg-center'
          style={{
            backgroundImage:
              'url("https://img4.thuthuatphanmem.vn/uploads/2020/07/05/hinh-anh-background-ve-cong-nghe-dep_035955098.jpg")',
            backgroundPosition: 'center',
            filter: 'blur(2px)',
            backgroundSize: 'cover',
            opacity: '1'
          }}
        ></div>
        <div className='flex items-center space-x-12 relative z-20'>
          <h1 className='text-3xl font-extrabold text-white tracking-wider group text-gradient'>
            <span className='relative z-10'>Giới Thiệu</span>
          </h1>
        </div>
      </header>

      <main className='flex flex-col items-center justify-center bg-gray-50 pt-0 pb-10 px-10'>
        {/* Hệ thống hàng trăm trung tâm tiêm chủng */}
        <section className='bg-white rounded-2xl shadow-2xl p-12 mb-10 w-full max-w-5xl'>
          <p className='text-lg text-gray-700 leading-relaxed mb-4 mt-6 text-center italic'>
            Trong bối cảnh thế giới đang gánh chịu những dịch bệnh phức tạp, ảnh hưởng trực tiếp và sâu sắc đến đời sống
            con người. Vắc xin và tiêm chủng là biện pháp phòng ngừa hiệu quả nhất để giảm tỷ lệ mắc bệnh và tử vong do
            các bệnh truyền nhiễm trong nhân loại. Năm 2020, khi đại dịch covid-19 đang diễn biến phức tạp trên toàn
            cầu, Vax-Bot ra đời như một xu hướng phát triển tất yếu, với mục tiêu góp phần đẩy lùi và xóa bỏ dịch bệnh
            trong thời điểm hiện tại, cũng như nâng cao chất lượng cuộc sống cho người dân Việt Nam trong tương lai.
          </p>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text  text-center'>
            HỆ THỐNG TIÊM CHỦNG VAX-BOT: AN TOÀN, UY TÍN, CHẤT LƯỢNG
          </h2>

          <img
            src='https://image.anninhthudo.vn/1200x630/Uploaded/2024/xpcwvoxb/2023_05_14/img-2454-1966-719.jpeg'
            alt='Trung tâm tiêm chủng'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />

          <p className='text-lg text-gray-700 leading-relaxed mb-4 mt-6'>
            Là đơn vị tiên phong trong lĩnh vực dịch vụ tiêm chủng tại Việt Nam. Hệ thống tiêm chủng Vax-Bot đã không
            ngừng nỗ lực và đạt được nhiều thành tựu nổi bật trong hoạt động tiêm chủng, phòng chống dịch bệnh, và đã
            nhận được sự tin tưởng, yêu mến của hàng chục triệu người dân trên cả nước khi sử dụng dịch vụ. Vax-Bot đã
            vinh dự được xếp hạng số 1 trong top 10 công ty dược phẩm uy tín Việt Nam (2023, 2024), trong lĩnh vực phân
            phối và kinh doanh dược phẩm, thiết bị y tế, và đã vinh dự nhận được Bằng khen của Thủ tướng Chính phủ về
            những đóng góp xuất sắc trong công tác phòng chống dịch bệnh. Sau gần 10 năm đồng hành cùng hệ thống y tế dự
            phòng của đất nước vượt qua mọi khó khăn, đẩy mạnh phát triển hệ thống đến mọi miền tổ quốc, đặc biệt là
            vùng sâu vùng xa, tăng cơ hội tiếp cận và tỷ lệ tiêm chủng trong cộng đồng, Vax-Bot hiện có hàng trăm trung
            tâm tiêm chủng trên toàn quốc, phấn đấu tăng tỷ lệ bao phủ vắc xin để bảo vệ sức khỏe cho trẻ em và người
            lớn với hơn 11 triệu liều vắc xin các loại, phòng ngừa hơn 40 bệnh truyền nhiễm nguy hiểm. Đáng chú ý là nỗ
            lực đẩy mạnh truyền thông và giáo dục cộng đồng về vai trò của tiêm chủng cho trẻ lớn, người lớn, người cao
            tuổi, người có bệnh nền, bệnh mãn tính của hệ thống tiêm chủng Vax-bot. Đến nay, tỷ lệ người từ 18 tuổi trở
            lên được tiêm đầy đủ các loại vắc xin đã đạt trên 40% tổng số khách hàng, góp phần quan trọng trong việc
            chăm sóc và bảo vệ sức khỏe cho người lao động và người cao tuổi trong cộng đồng.
          </p>
        </section>

        {/* Quy trình tiêm chủng đạt chuẩn */}
        <section className='bg-white rounded-2xl shadow-2xl p-12 mb-10 w-full max-w-5xl'>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
            Quy Trình Tiêm Chủng Đạt Chuẩn
          </h2>
          <p className='text-lg text-gray-700 leading-relaxed mb-6 text-left'>
            Trung tâm Tiêm chủng VAX-BOT áp dụng quy trình tiêm chủng chuẩn hóa, tuân thủ nghiêm ngặt các quy định y tế,
            và là lựa chọn phù hợp cho mọi đối tượng. Người dân sẽ được thực hiện đầy đủ các bước quan trọng trong quy
            trình tiêm chủng, bao gồm:
          </p>

          <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
            1. Khám Sàng Lọc Trước Tiêm
          </h3>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Trước khi tiêm, bác sĩ sẽ thực hiện khám sàng lọc để đánh giá tình trạng sức khỏe của người được tiêm. Điều
            này giúp xác định khả năng tiếp nhận vắc xin, phòng tránh các rủi ro không mong muốn và lựa chọn loại vắc
            xin phù hợp nhất. Bác sĩ cũng sẽ tư vấn kỹ lưỡng về lợi ích và các tác dụng phụ có thể xảy ra sau khi tiêm.
          </p>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Khám sàng lọc trước tiêm là quy trình y tế cần thiết nhằm đánh giá tình trạng sức khỏe tổng quát và xác định
            các rủi ro có thể ảnh hưởng đến hiệu quả hoặc an toàn của vắc xin. Quy trình này bao gồm việc thu thập thông
            tin y tế chi tiết, thực hiện khám lâm sàng và thực hiện các xét nghiệm cần thiết để đảm bảo không có chống
            chỉ định với việc tiêm chủng.
          </p>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Ngoài việc đánh giá tình trạng sức khỏe, khám sàng lọc còn cho phép bác sĩ thảo luận về lợi ích và rủi ro
            của việc tiêm chủng với bệnh nhân. Điều này bao gồm cung cấp thông tin về thành phần vắc xin, khả năng phòng
            bệnh và các khuyến nghị chăm sóc theo dõi sau tiêm.
          </p>

          <img
            src='https://cdn.thuvienphapluat.vn/uploads/tintuc/2023/03/29/kham-sang-loc-truoc-tiem-chung.jpg'
            alt='Khám sàng lọc trước tiêm'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />
          <p className='text-sm italic text-gray-700 text-center mt-4'>* Khám sàng lọc trước tiêm *</p>

          <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
            2. Thực Hiện Quy Trình Tiêm Chủng Đạt Tiêu Chuẩn An Toàn
          </h3>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Trước khi thực hiện tiêm, nhân viên y tế sẽ kiểm tra kỹ lưỡng vắc xin, bơm kim tiêm và dụng cụ y tế để đảm
            bảo chất lượng và an toàn. Đối với trẻ em, phụ huynh sẽ được xem xét kỹ lưỡng về loại vắc xin trước khi tiêm
            để đảm bảo đúng lịch và loại theo khuyến nghị của bác sĩ. Nhân viên y tế sẽ thực hiện tiêm với kỹ thuật đúng
            để giảm thiểu rủi ro biến chứng.
          </p>

          <p className='text-lg text-gray-700 mb-4 text-left'>
            An toàn tiêm chủng không đơn giản chỉ là thực hiện đúng kỹ thuật tiêm, mà còn bao gồm một hệ thống các yếu
            tố đảm bảo mọi thứ từ bảo quản vắc xin đến theo dõi sau tiêm. Khi được thực hiện đúng cách, tiêm chủng sẽ
            mang lại sự bảo vệ cao nhất và giảm thiểu các phản ứng không mong muốn. Ngược lại, nếu không tuân thủ các
            nguyên tắc an toàn, có thể dẫn đến nhiều hậu quả nghiêm trọng, ảnh hưởng đến sức khỏe người được tiêm, giảm
            lòng tin của cộng đồng vào hoạt động tiêm chủng.
          </p>

          <img
            src='https://bcp.cdnchinhphu.vn/Uploaded/tranthithom/2021_12_08/tiem.jpg'
            alt='Tiêm chủng an toàn'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />
          <p className='text-sm italic text-gray-700 text-center mt-4'>
            * Triển khai nhanh chóng chiến dịch tiêm chủng *
          </p>

          <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
            3. Theo Dõi Sức Khỏe Sau Tiêm
          </h3>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Theo dõi sau tiêm là phần thiết yếu trong việc đảm bảo an toàn tiêm chủng. Người được tiêm cần được theo dõi
            ít nhất 30 phút tại cơ sở tiêm chủng để phát hiện và xử lý kịp thời các phản ứng có thể xảy ra. Cơ sở tiêm
            chủng phải có đầy đủ trang thiết bị, thuốc cấp cứu và nhân viên y tế được đào tạo về xử lý phản ứng sau
            tiêm. Người được tiêm cũng cần được hướng dẫn về các dấu hiệu cần theo dõi và cách xử lý tại nhà trong 24-48
            giờ sau khi tiêm.
          </p>
          <img
            src='https://hongngochospital.vn/wp-content/uploads/2021/08/dich-vu-theo-doi-sau-tiem-hong-ngoc.jpg'
            alt='Theo dõi sức khỏe sau tiêm'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />
          <p className='text-sm italic text-gray-700 text-center mt-4'>
            * Bác sĩ triển khai dịch vụ chăm sóc và theo dõi sức khỏe sau tiêm *
          </p>
        </section>

        {/* Vắc xin chính hãng */}
        <section className='bg-white rounded-2xl shadow-2xl p-12 mb-10 w-full max-w-5xl'>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
            Luôn Có Đầy Đủ Các Loại Vắc Xin Chính Hãng, Thế Hệ Mới, Bao Gồm Cả Những Loại Thường Khan Hiếm Cho Trẻ Em Và
            Người Lớn
          </h2>
          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            Hệ thống trung tâm tiêm chủng Vax-Bot có hơn 50 loại vắc xin để phòng ngừa hơn 40 bệnh truyền nhiễm nguy
            hiểm cho người lớn, bao gồm cả vắc xin thế hệ mới và những loại thường khan hiếm trên thị trường.
          </p>
          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            Với uy tín và nhiều năm kinh nghiệm trong triển khai tiêm chủng, Vax-Bot đã trở thành đối tác chiến lược
            chính thức, toàn diện và quan trọng với các công ty vắc xin lớn trên thế giới như Glaxosmithkline - Bỉ
            (GSK), Sanofi Pasteur (Pháp), Pfizer (Mỹ), Merck Sharp and Dohme (Mỹ), AstraZeneca (Anh), Sanofi (Pháp),
            Abbott (Hà Lan), Takeda (Nhật Bản)... Do đó, Vax-Bot có quyền trực tiếp đàm phán và nhập khẩu tất cả các
            loại vắc xin cho trẻ em và người lớn, giúp người dân có đầy đủ cơ hội tiếp cận với vắc xin thế hệ mới, vắc
            xin khan hiếm và dịch vụ tiêm chủng an toàn với giá cả hợp lý, góp phần tăng tỷ lệ tiêm chủng, bảo vệ sức
            khỏe người lớn và tương lai của trẻ em.
          </p>

          <img
            src='https://namphuthai.vn/wp-content/uploads/2021/08/image_2021-08-14_001250.png'
            alt='Vaccine chính hãng'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />
          <p className='text-sm italic text-gray-700 text-center mt-4'>
            * Hệ thống bảo quản vắc xin đạt chuẩn, đảm bảo lưu trữ và bảo quản vắc xin trong điều kiện tối ưu từ 2-8 độ
            C *
          </p>
        </section>

        {/* Đội ngũ bác sĩ, y tế chuyên nghiệp */}
        <section className='bg-white rounded-2xl shadow-2xl p-12 mb-10 w-full max-w-5xl'>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
            Đội Ngũ Y Tế Chuyên Nghiệp Trong Quy Trình Tiêm Chủng
          </h2>

          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            Hệ thống trung tâm tiêm chủng Vax-Bot là đơn vị tiêm chủng tại Việt Nam thực hiện quy trình tiêm chủng an
            toàn 8 bước khép kín, đảm bảo tất cả các bước tiêm chủng được thực hiện đúng và được kiểm soát chặt chẽ để
            đảm bảo an toàn tối đa.
          </p>
          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            Đội ngũ bác sĩ, điều dưỡng và nhân viên y tế có kinh nghiệm và được đào tạo chuyên sâu trong lĩnh vực tiêm
            chủng.
          </p>
          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            Luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc, lo ngại của khách hàng về vắc xin và phản ứng sau tiêm.
          </p>

          <img
            src='https://lamgiangclinic.com/wp-content/uploads/2024/01/doi-ngu-bac-si.jpg'
            alt='Đội ngũ bác sĩ'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />
          <p className='text-sm italic text-gray-700 text-center mt-4'>
            * Đội ngũ bác sĩ và nhân viên y tế của chúng tôi cam kết mang đến sự yên tâm và chăm sóc tận tình cho khách
            hàng trong suốt quá trình tiêm chủng *
          </p>

          <img
            src='https://bvxuyena.com.vn/wp-content/uploads/2016/01/tiem-ngua-02-1024x734.jpg'
            alt='Đội ngũ bác sĩ'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />
          <p className='text-sm italic text-gray-700 text-center mt-4'>
            * Đội ngũ điều dưỡng thành thạo trong kỹ thuật tiêm giảm đau, nhẹ nhàng, tạo cảm giác thoải mái cho khách
            hàng *
          </p>
        </section>

        {/* Why choose Vax-Bot section */}
        <section className='bg-white rounded-2xl shadow-2xl p-12 mb-10 w-full max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text text-center mb-8'>
            Tại Sao Nên Chọn Trung Tâm Tiêm Chủng Vax-Bot?
          </h2>

          <ul className='list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6'>
            {[
              {
                title: 'Khách hàng là người thân',
                img: 'https://www.tiemchungmorong.vn/sites/default/files/a7_5447_2.jpg'
              },
              {
                title: 'Giá cả hợp lý',
                img: 'https://toplist.vn/images/800px/gia-ca-hop-ly-182029.jpg'
              },
              {
                title: 'Vắc xin chất lượng, bảo quản đúng chuẩn',
                img: 'https://www.docosan.com/blog/wp-content/uploads/2022/06/gia-vacxin-6-trong-1-3.jpg'
              },
              {
                title: 'Đội ngũ bác sĩ, điều dưỡng giàu kinh nghiệm',
                img: 'https://nhakhoavietmy.com.vn/wp-content/uploads/2023/07/Doi-ngu-bac-sy-.jpeg'
              }
            ].map((item, index) => (
              <li
                key={index}
                className='flex flex-col items-center text-center bg-gray-50 rounded-xl p-6 shadow-md transition-shadow'
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className='w-24 h-24 object-cover rounded-full mb-4 border-2 border-blue-500'
                />
                <h3 className='text-xl font-semibold text-transparent bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 bg-clip-text cursor-pointer transition-colors duration-300'>
                  {index + 1}. {item.title}
                </h3>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}

export default ServiceIntro
