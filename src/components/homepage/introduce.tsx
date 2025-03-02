import React from 'react';
import { FaCheckCircle, FaPhoneAlt, FaEnvelope, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Section: React.FC<{ title: string; content: React.ReactNode; imageUrl?: string }> = ({ title, content, imageUrl }) => {
  return (
    <section className='bg-white rounded-2xl shadow-2xl p-10 mb-10 flex flex-col lg:flex-row items-center transition-transform duration-300 hover:scale-105'>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className='w-full lg:w-1/3 h-auto object-cover rounded-2xl mb-4 lg:mb-0 lg:mr-8 shadow-lg'
        />
      )}
      <div className='flex-1'>
        <h2 className='text-4xl font-extrabold text-blue-800 mb-6'>{title}</h2>
        <div className='text-lg text-gray-700 leading-relaxed'>{content}</div>
      </div>
    </section>
  );
};

const SectionList: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <ul className='list-none p-0'>
      {items.map((item, index) => (
        <li key={index} className='flex items-center py-3 text-lg text-gray-700'>
          <FaCheckCircle className='text-green-500 mr-3 text-xl' /> {item}
        </li>
      ))}
    </ul>
  );
};

const ContactInfo: React.FC<{ contactMethods: { email: string; phone: string; facebookLink: string } }> = ({ contactMethods }) => {
  return (
    <section className='bg-blue-200 p-10 rounded-2xl shadow-lg text-center'>
      <h2 className='text-4xl font-extrabold text-blue-800 mb-6'>Liên Hệ</h2>
      <p className='text-lg text-gray-700 mb-3'>
        <FaEnvelope className='inline-block mr-2 text-blue-600' />
        <span className='font-bold'>{contactMethods.email}</span>
      </p>
      <p className='text-lg text-gray-700 mb-3'>
        <FaPhoneAlt className='inline-block mr-2 text-blue-600' />
        <span className='font-bold'>{contactMethods.phone}</span>
      </p>
      <a
        href={contactMethods.facebookLink}
        target='_blank'
        rel='noopener noreferrer'
        className='text-lg font-bold text-blue-700 flex items-center justify-center mt-3 hover:text-blue-900 transition-colors'
      >
        <FaFacebook className='mr-2 text-2xl' /> Facebook
      </a>
    </section>
  );
};

const RegisterInstructions: React.FC = () => {
  return (
    <section className='bg-white rounded-2xl shadow-2xl p-10 mb-10'>
      <h2 className='text-4xl font-extrabold text-blue-800 mb-6'>Hướng Dẫn Đặt Vaccine</h2>
      <div className='text-lg text-gray-700 leading-relaxed'>
        <p className='mb-4'>Để Đặt vaccine, bạn có thể thực hiện theo các bước sau:</p>
        <ol className='list-decimal pl-6'>
          <li>Đăng nhập vào tài khoản của bạn hoặc tạo tài khoản mới.</li>
          <li>Chọn loại vaccine bạn muốn đặt.</li>
          <li>Xác nhận thông tin và hoàn tất đăng ký.</li>
        </ol>
        <p className='mt-4'>Sau khi hoàn tất đăng ký, bạn sẽ nhận được thông tin chi tiết về lịch tiêm và các bước tiếp theo.</p>
      </div>
      <div className='text-center mt-8'>
        <a
          href='#'
          className='bg-green-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-green-600 transition duration-300'
          
        >
         <Link to='/register'>Đặt mua vắc xin</Link>
        </a>
      </div>
    </section>
  );
};

const Introduce: React.FC = () => {
  const contactMethods = {
    email: 'ledaianh172003@gmail.com',
    phone: '+84 335 728 612',
    facebookLink: 'https://www.facebook.com/share/12Hkutp9D8p/'
  };

  return (
    <div className='bg-gray-50 min-h-screen p-10'>
      <header className='text-center mb-16'>
        <h1 className='text-5xl font-extrabold text-blue-800 mb-4'>Giới Thiệu Hệ Thống Tiêm Chủng</h1>
        <p className='text-2xl text-gray-600'>Hệ thống tiêm chủng vắc xin hàng đầu Việt Nam</p>
      </header>

      <main>
        <Section
          title='Hệ Thống Tiêm Chủng'
          content={
            <p>
              Vaccine là một chế phẩm sinh học giúp cơ thể nhận diện và bảo vệ chống lại các tác nhân gây bệnh như vi
              khuẩn hoặc virus. Tiêm chủng là một trong những biện pháp quan trọng nhất trong việc phòng ngừa các bệnh
              truyền nhiễm. Việc tiêm vaccine giúp cơ thể phát triển khả năng miễn dịch mà không phải trải qua bệnh tật.
              Tiêm vaccine giúp giảm nguy cơ mắc bệnh và bảo vệ sức khỏe cộng đồng.
            </p>
          }
          imageUrl='https://data.voh.com.vn/voh/thumbnail/2020/10/14/vacxin-3.jpg'
        />
        <Section
          title='Các Loại Vắc Xin'
          content={<SectionList items={['Vaccine phòng Covid-19', 'Vaccine phòng cúm', 'Vaccine phòng sởi, rubella', 'Vaccine phòng viêm gan B', 'Vaccine phòng viêm phổi do phế cầu', 'Vaccine phòng HPV', 'Vaccine phòng thủy đậu', 'Vaccine phòng bạch hầu, ho gà, uốn ván']} />}
          imageUrl='https://scitechdaily.com/images/COVID-19-Vaccines.jpg'
        />
        <Section
          title='Lợi Ích Tiêm Chủng'
          content={<SectionList items={['Giảm nguy cơ mắc các bệnh nguy hiểm hay gặp ở trẻ nhỏ.', 'Giảm thiểu các rủi ro như biến chứng, di chứng, tử vong.', 'Giúp trẻ phát triển toàn diện và khỏe mạnh.', 'Bảo vệ cộng đồng khỏi các dịch bệnh lây lan.', 'Tăng cường hệ miễn dịch cho cơ thể...', 'Giảm tải cho hệ thống y tế khi phòng ngừa các dịch bệnh lớn.']} />}
          imageUrl='https://i.ytimg.com/vi/uIxVpblBnxE/maxresdefault.jpg'
        />
        <Section
          title='Giá Vắc Xin Ưu Đãi'
          content={
            <p>
              Chúng tôi cam kết mang đến cho bạn giá vắc xin ưu đãi và hợp lý, phù hợp với mọi đối tượng. Giá vắc xin được
              bình ổn trên toàn quốc, giúp bạn dễ dàng tiếp cận dịch vụ tiêm chủng mà không lo về chi phí.
            </p>
          }
          imageUrl='https://img.gotit.vn/gotit_website_photos/4/Deal2023/abc.gif'
        />
        <Section
          title='Các Cơ Sở Tiêm Chủng'
          content={
            <p>
              Bạn có thể đến các cơ sở y tế, bệnh viện, phòng khám hoặc các trung tâm tiêm chủng uy tín để nhận vaccine.
              Việc tiêm chủng phải được thực hiện tại các cơ sở đảm bảo chất lượng và an toàn.
            </p>
          }
          imageUrl='https://cdn.thuvienphapluat.vn/phap-luat/2022-2/TV/230415/co-so-tiem-chung-9.jpg'
        />
        <Section
          title='Đội Ngũ Bác Sĩ và Điều Dưỡng'
          content={
            <p>
              Đội ngũ bác sĩ và điều dưỡng của chúng tôi đều là những chuyên gia có chuyên môn cao, được đào tạo bài bản
              và có nhiều năm kinh nghiệm trong lĩnh vực tiêm chủng. Tất cả quy trình tiêm chủng đều được thực hiện theo
              các tiêu chuẩn an toàn nghiêm ngặt.
            </p>
          }
          imageUrl='https://lamgiangclinic.com/wp-content/uploads/2024/01/doi-ngu-bac-si.jpg'
        />
        {/* Add the Register Instructions Section */}
        <RegisterInstructions />
        <ContactInfo contactMethods={contactMethods} />
      </main>

      <footer className='text-center py-8 bg-blue-800 text-white mt-16 rounded-2xl shadow-2xl'>
        <p className='text-xl'>&copy; 2025  - Tất cả quyền lợi được bảo lưu</p>
      </footer>
    </div>
  );
};

export default Introduce;
