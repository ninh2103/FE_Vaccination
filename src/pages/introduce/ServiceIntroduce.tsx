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
            In the context, the world is burdened by complex epidemics, directly and deeply affecting human life.
            Vaccines and vaccinations are the most effective preventive measures to reduce the rate of disease and
            mortality due to infectious diseases in humanity. In 2020, when the covid-19 epidemic is complicating
            globally, Vax-box was born as an inevitable trend of development, with the goal of contributing to repelling
            and eliminating the epidemic at the present time, as well as improving the quality of life for Vietnamese
            people in the future.
          </p>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text  text-center'>
            VAX-BOX VACCINATION SYSTEM: SAFE, REPUTABLE, QUALITY
          </h2>

          <img
            src='https://image.anninhthudo.vn/1200x630/Uploaded/2024/xpcwvoxb/2023_05_14/img-2454-1966-719.jpeg'
            alt='Trung tâm tiêm chủng'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />

          <p className='text-lg text-gray-700 leading-relaxed mb-4 mt-6'>
            As a leading unit in the vaccination service industry in Vietnam. The Vax-box vaccination system has made
            continuous efforts and achieved many outstanding achievements in vaccination activities, disease prevention,
            and has received the trust and love of tens of millions of people across the country for using its services.
            Vax-box has been honored for many consecutive years as the number 1 company in the top 10 prestigious
            Vietnamese pharmaceutical companies (2023, 2024), in the distribution and trading of pharmaceuticals,
            medical equipment, and has been honored to receive a Certificate of Merit from the Prime Minister for its
            outstanding contributions to disease prevention. After nearly 10 years of accompanying the country's
            preventive medicine system to overcome all difficulties, rapidly promoting the development of the system to
            all regions of the country, especially remote areas, increasing access opportunities and vaccination rates
            in the community, Vax-box now has hundreds of vaccination centers across the country, striving to increase
            vaccination coverage rates to protect the health of children and adults with more than 11 million doses of
            various vaccines, preventing more than 40 dangerous infectious diseases. Particularly noteworthy is the
            effort to promote communication and education of the community about the role of vaccination for older
            children, adults, the elderly, people with underlying diseases, chronic diseases of the Vax-box vaccination
            system. Up to now, the rate of people aged 18 and over receiving all types of vaccines has reached over 40%
            of the total number of customers, contributing significantly to the care and protection of the health of
            workers and the elderly in the community.
          </p>
        </section>

        {/* Quy trình tiêm chủng đạt chuẩn */}
        <section className='bg-white rounded-2xl shadow-2xl p-12 mb-10 w-full max-w-5xl'>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
            Standard Vaccination Process
          </h2>
          <p className='text-lg text-gray-700 leading-relaxed mb-6 text-left'>
            VAX-BOX Vaccination Center applies a standardized vaccination process, strictly adhering to medical
            regulations, and is a suitable choice for all subjects. People will be able to fully perform the important
            steps in the vaccination process, including:
          </p>

          <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
            1. Pre-Vaccination Screening
          </h3>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Before vaccination, the doctor will perform a screening examination to assess the health status of the
            person being vaccinated. This helps determine the ability to receive the vaccine, prevent unwanted risks and
            choose the most suitable vaccine. The doctor will also carefully advise on the benefits and side effects
            that may occur after vaccination.
          </p>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Pre-vaccination screening is an essential medical process that assesses general health status and identifies
            any risks that may affect the effectiveness or safety of a vaccine. It involves collecting detailed medical
            information, performing a physical examination, and performing necessary tests to ensure that there are no
            contraindications to vaccination.
          </p>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            In addition to assessing health status, screening also allows the doctor to discuss the benefits and risks
            of vaccination with the patient. This includes providing information about the vaccine's ingredients, its
            ability to prevent disease, and recommendations for follow-up care after vaccination.
          </p>

          <img
            src='https://cdn.thuvienphapluat.vn/uploads/tintuc/2023/03/29/kham-sang-loc-truoc-tiem-chung.jpg'
            alt='Khám sàng lọc trước tiêm'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />
          <p className='text-sm italic text-gray-700 text-center mt-4'>* Pre-vaccination screening* </p>

          <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
            2. Implementing the Vaccination Process to Meet Safety Standards
          </h3>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Before administering the injection, medical staff will carefully check the vaccine, syringe and medical
            equipment to ensure quality and safety. For children, parents will be carefully reviewed for the type of
            vaccine before administering the injection to ensure the correct schedule and type as recommended by the
            doctor. Medical staff will perform the injection with the correct technique to minimize the risk of
            complications.
          </p>

          <p className='text-lg text-gray-700 mb-4 text-left'>
            Vaccination safety is not simply a matter of performing the injection technique correctly, but also includes
            a system of factors ensuring everything from vaccine storage to post-injection monitoring. When performed
            correctly, vaccination will provide the highest protection and minimize unwanted reactions. On the contrary,
            if safety principles are not followed, it can lead to many serious consequences, affecting the health of the
            vaccinated person, reducing public confidence in vaccination activities.
          </p>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            The safe vaccination process is a series of steps carried out systematically, requiring meticulousness and
            strict adherence to aseptic principles..
          </p>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            First, health care workers must perform thorough hand hygiene according to the World Health Organization's
            6-step procedure. This can be done with soap and water or an alcohol-based hand sanitizer. Health care
            workers must then wear sterile gloves to ensure that they do not contaminate the instruments and injection
            site.
          </p>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Vaccine preparation requires extreme caution. Medical staff need to carefully check the information on the
            vaccine vial such as the vaccine name, expiry date, and batch number. It is especially important to check
            the VVM (Vaccine VialMonitor) -the temperature indicator on the vaccine vial to ensure that the vaccine has
            not been damaged by temperature. In the case of freeze-dried vaccines, reconstitution must be carried out in
            accordance with the manufacturer's instructions on the type of solvent, volume, and reconstitution
            technique.
          </p>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            The injection site must be selected appropriately according to the type of vaccine and the age of the person
            being vaccinated. For children under 12 months of age, the injection site is usually the anterior outer
            thigh. For older children and adults, the injection can be in the deltoid muscle of the arm. The skin at the
            injection site must be disinfected with 70-degree alcohol or iodine alcohol, in a spiral from the inside out
            and allowed to dry naturally for 30 seconds.
          </p>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Injection technique is a key factor in the procedure. For intramuscular injection, the needle must be
            inserted into the muscle at a 90-degree angle, after checking that there is no blood reflux into the
            syringe. The injection speed must be moderate, not too fast, to avoid pain and unwanted reactions. For
            subcutaneous injection, the injection angle is 45 degrees and the needle depth must be appropriate for each
            subject. After completing the injection, the medical staff must quickly and firmly withdraw the needle,
            while gently pressing the injection site with a sterile dry cotton pad. Do not massage the injection site as
            this may increase the risk of local reactions. All used vaccination materials must be collected and disposed
            of in accordance with regulations on hazardous medical waste.
          </p>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            The final step in the process is to record all information about the injection in the vaccination record.
            The information to be recorded includes the type of vaccine administered, dose, injection site, vaccine lot
            number and time of administration. This accurate recording is not only for monitoring and management
            purposes but is also important in case of post-vaccination reactions that need to be investigated.
          </p>
          <img
            src='https://bcp.cdnchinhphu.vn/Uploaded/tranthithom/2021_12_08/tiem.jpg'
            alt='Tiêm chủng an toàn'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />
          <p className='text-sm italic text-gray-700 text-center mt-4'>
            *Rapid implementation of vaccination campaign *
          </p>

          <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
            3. Health Monitoring After Vaccination
          </h3>
          <p className='text-lg text-gray-700 mb-4 text-left'>
            Post-vaccination monitoring is an essential part of ensuring vaccination safety. The vaccinated person needs
            to be monitored for at least 30 minutes at the vaccination facility to detect and promptly handle any
            reactions that may occur. The vaccination facility must have adequate equipment, emergency medicines and
            medical staff trained in handling post-vaccination reactions. The vaccinated person also needs to be
            instructed on the signs to watch for and how to handle them at home in the 24-48 hours after vaccination.
          </p>
          <img
            src='https://hongngochospital.vn/wp-content/uploads/2021/08/dich-vu-theo-doi-sau-tiem-hong-ngoc.jpg'
            alt='Theo dõi sức khỏe sau tiêm'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />
          <p className='text-sm italic text-gray-700 text-center mt-4'>
            * Doctors deploy post-vaccination health care and monitoring services*
          </p>
        </section>
        {/* Vắc xin chính hãng */}
        <section className='bg-white rounded-2xl shadow-2xl p-12 mb-10 w-full max-w-5xl'>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
            Always have full range of genuine, new generation vaccines, including those that are often scarce for
            children and adults.
          </h2>
          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            The Vax-box vaccination center system has more than 50 types of vaccines to prevent more than 40 dangerous
            infectious diseases for adults, including new generation vaccines and vaccines that are often scarce on the
            market.
          </p>
          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            With its prestige and many years of experience in implementing vaccination, Vax-box has become an official,
            comprehensive and important strategic partner with major vaccine companies in the world such as
            Glaxosmithkline - Belgium (GSK), Sanofi Pasteur (France), Pfizer (USA), Merck Sharp and Dohme (USA),
            AstraZeneca (UK), Sanofi (France), Abbott (Netherlands), Takeda (Japan) ... Therefore, Vax-box has the right
            to directly negotiate and import all types of vaccines for children and adults, helping people have full
            access to new generation vaccines, scarce vaccines and safe and reasonably priced vaccination services,
            contributing to increasing the vaccination rate, protecting the health of adults and the future of children.
          </p>
          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            In particular, Vax-box is a vaccination unit in Vietnam with new generation vaccines from the world's
            leading manufacturers such as: Bexsero (Italy) to prevent meningitis and pneumonia caused by group B
            meningococcus, Gardasil 9 (USA) to prevent cervical cancer for men and women aged 9-45, Imojev to prevent
            Japanese encephalitis, Prevenar 13 (Belgium) to prevent diseases caused by pneumococcus, Menactra (USA) to
            prevent meningitis and pneumonia caused by ACYW meningococcus, Boostrix (Belgium) to prevent diphtheria -
            whooping cough - tetanus...
          </p>

          <img
            src='https://namphuthai.vn/wp-content/uploads/2021/08/image_2021-08-14_001250.png'
            alt='Vaccine chính hãng'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />
          <p className='text-sm italic text-gray-700 text-center mt-4'>
            * Standard vaccine storage system, ensuring storage and preservation of vaccines in optimal conditions from
            2-8 degrees Celsius.\*
          </p>
        </section>

        {/* Đội ngũ bác sĩ, y tế chuyên nghiệp */}
        <section className='bg-white rounded-2xl shadow-2xl p-12 mb-10 w-full max-w-5xl'>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text'>
            Professional Medical Team During Vaccination Procedure
          </h2>

          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            The Vax-box vaccination center system is a vaccination unit in Vietnam that implements a closed 8-step safe
            vaccination process, ensuring that all vaccination steps are performed correctly and are strictly controlled
            to ensure maximum safety.
          </p>
          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            The team of doctors, nurses and medical staff are experienced and well-trained in the field of vaccination.
          </p>
          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            Always ready to support and answer all questions and concerns of customers about vaccines and
            post-vaccination reactions.
          </p>

          <img
            src='https://lamgiangclinic.com/wp-content/uploads/2024/01/doi-ngu-bac-si.jpg'
            alt='Đội ngũ bác sĩ'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />
          <p className='text-sm italic text-gray-700 text-center mt-4'>
            * Our team of doctors and medical staff are committed to providing peace of mind and dedicated care to
            customers throughout the vaccination process.*
          </p>

          <img
            src='https://bvxuyena.com.vn/wp-content/uploads/2016/01/tiem-ngua-02-1024x734.jpg' // Replace with the URL of the image you want to use
            alt='Đội ngũ bác sĩ'
            className='w-full h-auto mt-6 rounded-lg shadow-lg'
          />
          <p className='text-sm italic text-gray-700 text-center mt-4'>
            * A team of nurses proficient in pain-relieving injections, gentle, creating a comfortable feeling for
            customers*
          </p>
        </section>

        {/* Why choose Vax-box section */}
        <section className='bg-white rounded-2xl shadow-2xl p-12 mb-10 w-full max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-transparent bg-clip-text text-center mb-8'>
            Why choose VAX-BOX Vaccination Center?
          </h2>

          <ul className='list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6'>
            {[
              {
                title: 'Customers are relatives',
                img: 'https://www.tiemchungmorong.vn/sites/default/files/a7_5447_2.jpg'
              },
              {
                title: 'Reasonable price',
                img: 'https://toplist.vn/images/800px/gia-ca-hop-ly-182029.jpg'
              },
              {
                title: 'Quality vaccines, properly preserved',
                img: 'https://www.docosan.com/blog/wp-content/uploads/2022/06/gia-vacxin-6-trong-1-3.jpg'
              },
              {
                title: 'Experienced team of doctors and nurses',
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
