import React, { useState } from 'react'
import ContactSection from '@/components/homepage/Contact'
import Footer from '@/components/homepage/Footer'

const ServiceIntro: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className='bg-gray-100 min-h-screen py-30 px-8'>
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
            Trong bối cảnh, thế giới đang phải mang gánh nặng của dịch bệnh phức tạp, ảnh hưởng trực tiếp và sâu rộng
            đến đời sống của loài người. Vắc xin và tiêm chủng là biện pháp phòng bệnh hiệu quả nhấtđể làm giảm tỷ lệ
            mắc bệnh và tỷ lệ tử vong do bệnh truyền nhiễm của nhân loại. Năm 2020, thời điểm mà dịch bệnh covid-19 đang
            diễn biến phức tạp trên toàn cầu, Vax-box ra đời như một xu thế tất yếu của sự phát triển, với mục tiêu góp
            phần đẩy lùi và loại bỏ dịch bệnh ở thời điểm hiện tại, cũng như nâng cao chất lượng cuộc sống cho người dân
            Việt Nam trong tương lai.
          </p>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text  text-center'>
            HỆ THỐNG HÀNG TRĂM TRUNG TÂM TIÊM CHỦNG VAX-BOX: AN TOÀN, UY TÍN, CHẤT LƯỢNG ĐƯỢC HÀNG CHỤC TRIỆU GIA ĐÌNH
            TIN TƯỞNG LỰA CHỌN!
          </h2>

          <img
            src='https://image.anninhthudo.vn/1200x630/Uploaded/2024/xpcwvoxb/2023_05_14/img-2454-1966-719.jpeg'
            alt='Trung tâm tiêm chủng'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />

          <p className='text-lg text-gray-700 leading-relaxed mb-4 mt-6'>
            Là đơn vị dẫn đầu ngành tiêm chủng vắc xin dịch vụ tại Việt Nam, trong gần 1 thập kỷ hình thành và phát
            triển, Hệ thống tiêm chủng Vax-box đã nỗ lực không ngừng nghỉ và đạt nhiều thành tích nổi bật trong hoạt
            động tiêm chủng vắc xin, phòng chống dịch bệnh, nhận được sự tin tưởng yêu mến sử dụng dịch vụ của hàng chục
            triệu người dân trên khắp cả nước. Vax-box nhiều năm liền được vinh danh ở vị trí số 1 trong top 10 công ty
            Dược Việt Nam uy tín trong nhiều năm liền (năm 2023, 2024), nhóm ngành phân phối, kinh doanh Dược phẩm,
            trang thiết bị y tế và vinh dự được đón nhận Bằng khen của Thủ tướng Chính phủ vì những đóng góp xuất sắc
            trong công tác phòng chống dịch bệnh. Sau gần 10 năm đồng hành cùng hệ thống y học dự phòng nước nhà vượt
            mọi khó khăn, thần tốc đẩy mạnh phát triển hệ thống đến mọi miền đất nước, đặc biệt là các địa phương vùng
            sâu vùng xa, gia tăng cơ hội tiếp cận và tỷ lệ tiêm chủng vắc xin trong cộng đồng, đến nay Vax-box đã có
            hàng trăm trung tâm tiêm chủng trải dài trên khắp mọi miền tổ quốc, nỗ lực nâng cao tỷ lệ bao phủ tiêm chủng
            bảo vệ sức khỏe cho trẻ em và người lớn với hơn 11 triệu liều vắc xin các loại, phòng chống hơn 40 bệnh
            truyền nhiễm nguy hiểm. Đặc biệt đáng ghi nhận là nỗ lực đẩy mạnh công tác truyền thông giáo dục cộng đồng
            về vai trò của tiêm chủng vắc xin với trẻ lớn, người lớn, người cao tuổi, người có bệnh nền, bệnh mạn tính
            của hệ thống tiêm chủng Vax-box. Đến nay, tỷ lệ người từ 18 tuổi tiêm chủng vắc xin các loại đã đạt trên 40%
            tổng số khách hàng, góp phần quan trọng trong việc chăm sóc, bảo vệ sức khỏe người lao động, người cao tuổi
            trong cộng đồng.
          </p>
        </section>

        {/* Quy trình tiêm chủng đạt chuẩn */}
        <section className='bg-white rounded-2xl shadow-2xl p-12 mb-10 w-full max-w-5xl'>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
            Quy Trình Tiêm Chủng Đạt Chuẩn
          </h2>
          <p className='text-lg text-gray-700 leading-relaxed mb-6 text-left'>
            Trung tâm Tiêm chủng VAX-BOX áp dụng quy trình tiêm chủng đạt chuẩn, tuân thủ nghiêm ngặt các quy định y tế,
            là lựa chọn phù hợp cho mọi đối tượng. Người dân sẽ được thực hiện đầy đủ các bước quan trọng trong quy
            trình tiêm phòng, bao gồm:
          </p>

          <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
            1. Khám Sàng Lọc Trước Tiêm
          </h3>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Trước khi tiêm vắc xin, bác sĩ sẽ thực hiện khám sàng lọc để đánh giá tình trạng sức khỏe của người tiêm.
            Điều này giúp xác định khả năng tiếp nhận vắc xin, phòng tránh các rủi ro không mong muốn và lựa chọn loại
            vắc xin phù hợp nhất. Bác sĩ cũng sẽ tư vấn kỹ lưỡng về lợi ích và tác dụng phụ có thể gặp phải sau tiêm.
          </p>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Khám sàng lọc trước khi tiêm chủng là một quá trình y tế thiết yếu nhằm đánh giá tình trạng sức khỏe tổng
            quát và xác định mọi nguy cơ có thể ảnh hưởng đến hiệu quả hoặc an toàn của vaccine. Quá trình này bao gồm
            việc thu thập thông tin y tế chi tiết, kiểm tra sức khỏe vật lý, và thực hiện các xét nghiệm cần thiết để
            đảm bảo rằng không có chống chỉ định tiêm chủng.
          </p>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Ngoài việc đánh giá tình hình sức khỏe, khám sàng lọc còn cho phép bác sĩ thảo luận với bệnh nhân về lợi ích
            và rủi ro của việc tiêm chủng. Điều này bao gồm cung cấp thông tin về thành phần của vaccine, khả năng phòng
            ngừa bệnh, và khuyến cáo về việc theo dõi sức khỏe sau khi tiêm.
          </p>

          <img
            src='https://cdn.thuvienphapluat.vn/uploads/tintuc/2023/03/29/kham-sang-loc-truoc-tiem-chung.jpg'
            alt='Khám sàng lọc trước tiêm'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />
          <p className='text-sm italic text-gray-700 text-center mt-4'>* Khám sàng lọc trước khi tiêm chủng.* </p>

          <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
            2. Thực Hiện Quá Trình Tiêm Chủng Đạt Chuẩn An Toàn
          </h3>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Trước khi tiến hành tiêm, nhân viên y tế sẽ kiểm tra kỹ vắc xin, bơm tiêm và các dụng cụ y tế để đảm bảo
            chất lượng và an toàn. Đối với trẻ em, cha mẹ sẽ được xem xét kỹ loại vắc xin trước khi tiêm để đảm bảo đúng
            lịch và đúng loại theo khuyến nghị của bác sĩ. Nhân viên y tế sẽ thực hiện tiêm đúng kỹ thuật để giảm thiểu
            tối đa nguy cơ biến chứng.
          </p>

          <p className='text-lg text-gray-700 mb-4 text-left'>
            An toàn tiêm chủng không chỉ đơn thuần là việc thực hiện đúng kỹ thuật tiêm, mà còn bao gồm cả một hệ thống
            các yếu tố đảm bảo từ khâu bảo quản vaccine đến theo dõi sau tiêm. Khi được thực hiện đúng quy trình, tiêm
            chủng sẽ mang lại hiệu quả bảo vệ cao nhất, giảm tối đa các phản ứng không mong muốn. Ngược lại, nếu không
            tuân thủ các nguyên tắc an toàn, có thể dẫn đến nhiều hậu quả nghiêm trọng, ảnh hưởng đến sức khỏe người
            được tiêm, làm giảm niềm tin của cộng đồng vào hoạt động tiêm chủng.
          </p>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Quy trình tiêm chủng an toàn là một chuỗi các bước được thực hiện một cách có hệ thống, đòi hỏi sự tỉ mỉ và
            tuân thủ nghiêm ngặt các nguyên tắc vô khuẩn.
          </p>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Trước tiên, nhân viên y tế phải thực hiện vệ sinh tay kỹ lưỡng theo quy trình 6 bước của Tổ chức Y tế Thế
            giới. Việc này có thể được thực hiện bằng xà phòng và nước sạch hoặc dung dịch sát khuẩn tay nhanh có chứa
            cồn. Sau đó, nhân viên y tế cần mang găng tay vô khuẩn để đảm bảo không làm nhiễm khuẩn các dụng cụ và vị
            trí tiêm.
          </p>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Công tác chuẩn bị vaccine đòi hỏi sự cẩn trọng cao độ. Nhân viên y tế cần kiểm tra kỹ các thông tin trên lọ
            vaccine như tên vaccine, hạn sử dụng, số lô sản xuất. Đặc biệt quan trọng là việc kiểm tra VVM (Vaccine Vial
            Monitor) – chỉ thị nhiệt độ trên lọ vaccine để đảm bảo vaccine chưa bị hỏng do nhiệt độ. Trong trường hợp
            vaccine dạng đông khô, việc pha hồi chỉnh phải được thực hiện đúng theo hướng dẫn của nhà sản xuất về loại
            dung môi, thể tích và kỹ thuật pha.
          </p>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Vị trí tiêm phải được lựa chọn phù hợp theo từng loại vaccine và độ tuổi của người được tiêm. Đối với trẻ
            nhỏ dưới 12 tháng tuổi, vị trí tiêm thường là mặt trước ngoài đùi. Với trẻ lớn và người lớn, có thể tiêm ở
            cơ delta cánh tay. Vùng da tại vị trí tiêm cần được sát khuẩn bằng cồn 70 độ hoặc cồn iod, thực hiện theo
            hình xoắn ốc từ trong ra ngoài và để khô tự nhiên trong 30 giây.
          </p>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Kỹ thuật tiêm là yếu tố then chốt trong quy trình. Đối với tiêm bắp, kim tiêm phải được đưa vào cơ với góc
            90 độ, sau khi đã kiểm tra không có máu trào ngược vào bơm tiêm. Tốc độ tiêm phải vừa phải, không quá nhanh
            để tránh gây đau và các phản ứng không mong muốn. Đối với tiêm dưới da, góc tiêm là 45 độ và độ sâu kim tiêm
            cần phù hợp với từng đối tượng. Sau khi hoàn thành tiêm, nhân viên y tế phải rút kim nhanh và dứt khoát,
            đồng thời ấn nhẹ vị trí tiêm bằng bông khô vô khuẩn. Không xoa bóp vị trí tiêm vì có thể làm tăng nguy cơ
            phản ứng tại chỗ. Tất cả vật tư tiêm chủng đã sử dụng phải được thu gom và xử lý theo đúng quy định về rác
            thải y tế nguy hại.
          </p>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Bước cuối cùng trong quy trình là ghi chép đầy đủ thông tin về mũi tiêm vào hồ sơ theo dõi tiêm chủng. Thông
            tin cần ghi nhận bao gồm loại vaccine đã tiêm, liều lượng, vị trí tiêm, số lô vaccine và thời gian thực
            hiện. Việc ghi chép chính xác này không chỉ phục vụ cho công tác theo dõi và quản lý mà còn rất quan trọng
            trong trường hợp cần điều tra các phản ứng sau tiêm.
          </p>
          <img
            src='https://bcp.cdnchinhphu.vn/Uploaded/tranthithom/2021_12_08/tiem.jpg'
            alt='Tiêm chủng an toàn'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />
          <p className='text-sm italic text-gray-700 text-center mt-4'>
            *Thần tốc thực hiện chiến dịch tiêm chủng vaccin .*
          </p>

          <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
            3. Theo Dõi Sức Khỏe Sau Tiêm Phòng
          </h3>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Theo dõi sau tiêm là một phần không thể thiếu trong đảm bảo an toàn tiêm chủng. Người được tiêm cần được
            theo dõi ít nhất 30 phút tại cơ sở tiêm chủng để phát hiện và xử trí kịp thời các phản ứng có thể xảy ra. Cơ
            sở tiêm chủng phải có đầy đủ trang thiết bị, thuốc cấp cứu và nhân viên y tế được đào tạo về xử trí phản ứng
            sau tiêm. Người được tiêm cũng cần được hướng dẫn các dấu hiệu cần theo dõi và cách xử trí tại nhà trong
            24-48 giờ sau tiêm.
          </p>
          <img
            src='https://hongngochospital.vn/wp-content/uploads/2021/08/dich-vu-theo-doi-sau-tiem-hong-ngoc.jpg'
            alt='Theo dõi sức khỏe sau tiêm'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />
          <p className='text-sm italic text-gray-700 text-center mt-4'>
            * Bác sĩ triển khai dịch vụ theo dõi và chăm sóc sức khỏe sau tiêm vaccine.*
          </p>
        </section>
        {/* Vắc xin chính hãng */}
        <section className='bg-white rounded-2xl shadow-2xl p-12 mb-10 w-full max-w-5xl'>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
            Luôn có đầy đủ vắc xin chính hãng, thế hệ mới, kể cả loại thường xuyên khan hiếm cho trẻ em và người lớn
          </h2>
          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            Hệ thống trung tâm tiêm chủng Vax-box có hơn 50 loại vắc xin phòng hơn 40 bệnh truyền nhiễm nguy hiểm cho
            người lớn, kể cả các loại vắc xin thế hệ mới, vắc xin thường xuyên khan hiếm trên thị trường.
          </p>
          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            Với uy tín và kinh nghiệm triển khai tiêm chủng nhiều năm, Vax-box đã trở thành đối tác chính thức, toàn
            diện và chiến lược quan trọng với các hãng vắc xin lớn trên thế giới như Glaxosmithkline – Bỉ (GSK), Sanofi
            Pasteur (Pháp), Pfizer (Mỹ), Merck Sharp and Dohme (Mỹ), AstraZeneca (Anh), Sanofi (Pháp), Abbott (Hà Lan),
            Takeda (Nhật Bản)… do đó, Vax-box được quyền đàm phán trực tiếp, nhập khẩu chính hãng tất cả các loại vắc
            xin dành cho trẻ em và người lớn, giúp người dân được tiếp cận đầy đủ các vắc xin thế hệ mới, vắc xin khan
            hiếm và tiêm chủng dịch vụ an toàn, giá hợp lý, góp phần tăng cao tỷ lệ tiêm chủng, bảo vệ sức khỏe cho
            người lớn và tương lai cho trẻ em.
          </p>
          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            Đặc biệt, Vax-box là đơn vị tiêm chủng tại Việt Nam có các loại vắc xin thế hệ mới từ các nhà sản xuất hàng
            đầu thế giới như: Bexsero (Ý) phòng bệnh viêm màng não, viêm phổi do não mô cầu khuẩn nhóm B, Gardasil 9
            (Mỹ) phòng các bệnh ung thư cổ tử cung cho nam và nữ từ 9-45 tuổi, Imojev phòng viêm não Nhật Bản, Prevenar
            13 (Bỉ) phòng các bệnh do phế cầu khuẩn, Menactra (Mỹ) phòng bệnh viêm màng não, viêm phổi do não mô cầu
            khuẩn ACYW, Boostrix (Bỉ) phòng bạch hầu – ho gà – uốn ván…
          </p>

          <img
            src='https://namphuthai.vn/wp-content/uploads/2021/08/image_2021-08-14_001250.png'
            alt='Vaccine chính hãng'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />
          <p className='text-sm italic text-gray-700 text-center mt-4'>
            * Hệ thống kho bảo quản vắc xin đạt chuẩn , đảm bảo lưu trữ và bảo quản các loại vắc xin trong điều kiện tối
            ưu từ 2-8 độ C.*
          </p>
        </section>

        {/* Đội ngũ bác sĩ, y tế chuyên nghiệp */}
        <section className='bg-white rounded-2xl shadow-2xl p-12 mb-10 w-full max-w-5xl'>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
            Đội Ngũ Bác Sĩ, Y Tế Chuyên Nghiệp Trong Quá Trình Thực Hiện Quy Trình Tiêm Chủng
          </h2>

          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            Hệ thống trung tâm tiêm chủng Vax-box là đơn vị tiêm chủng tại Việt Nam thực hiện quy trình tiêm chủng an
            toàn 8 bước khép kín, đảm bảo tất cả các bước thực hiện tiêm chủng được thực hiện đúng cách, được kiểm soát
            nghiêm ngặt nhằm đảm bảo tính an toàn ở mức tối đa.
          </p>
          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            Đội ngũ bác sĩ, điều dưỡng và nhân viên y tế có kinh nghiệm và được đào tạo bài bản trong lĩnh vực tiêm
            chủng.
          </p>
          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            Luôn sẵn sàng hỗ trợ, giải đáp mọi thắc mắc, lo lắng của khách hàng về các loại vắc-xin và các phản ứng sau
            tiêm.
          </p>

          <img
            src='https://lamgiangclinic.com/wp-content/uploads/2024/01/doi-ngu-bac-si.jpg'
            alt='Đội ngũ bác sĩ'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />
          <p className='text-sm italic text-gray-700 text-center mt-4'>
            * Đội ngũ bác sĩ và nhân viên y tế của chúng tôi cam kết mang lại sự an tâm, chăm sóc tận tình cho khách
            hàng trong suốt quá trình tiêm chủng.*
          </p>

          <img
            src='https://bvxuyena.com.vn/wp-content/uploads/2016/01/tiem-ngua-02-1024x734.jpg' // Replace with the URL of the image you want to use
            alt='Đội ngũ bác sĩ'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />
          <p className='text-sm italic text-gray-700 text-center mt-4'>
            * Đội ngũ điều dưỡng viên thành thạo kỹ năng tiêm giảm đau, nhẹ nhàng, tạo tâm lý thoải mái cho Khách hàng*
          </p>
        </section>

        {/* Why choose Vax-box section */}
        <section className='bg-white rounded-2xl shadow-2xl p-12 mb-10 w-full max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text text-center mb-8'>
            Vì sao nên chọn Trung tâm tiêm chủng VAX-BOX?
          </h2>

          <ul className='list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6'>
            {[
              {
                title: 'Khách hàng là người thân',
                img: 'https://www.tiemchungmorong.vn/sites/default/files/a7_5447_2.jpg'
              },
              {
                title: 'Mức giá hợp lý',
                img: 'https://toplist.vn/images/800px/gia-ca-hop-ly-182029.jpg'
              },
              {
                title: 'Vắc xin chất lượng, bảo quản đúng quy định',
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

        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default ServiceIntro
