import React, { useState, useEffect } from 'react'
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

const PrivacyPolicy: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)

  // Giả lập độ trễ loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500) // Độ trễ 2 giây để mô phỏng loading

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
      <Header />

      {/* Hero Section */}
      <header className='relative mx-auto mt-[7rem] max-w-5xl rounded-3xl bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 py-16 text-white'>
        <div className='absolute inset-0 rounded-3xl bg-blue-900 opacity-20' />
        <div className='relative z-10 mx-auto max-w-7xl px-4 text-center'>
          <h1 className='mb-4 text-4xl font-extrabold text-white md:text-5xl'>VaxBot Privacy Policy</h1>
          <p className='mx-auto max-w-3xl text-lg text-white md:text-xl'>
            At VaxBot, we are committed to protecting your privacy and ensuring the security of your personal
            information. Learn how we collect, use, and safeguard your data.
          </p>
        </div>
      </header>

      {/* Privacy Policy Content */}
      <section className='py-16'>
        <div className='mx-auto max-w-5xl px-4'>
          {/* Purpose and Scope */}
          <div className='mb-12 rounded-xl bg-gray-50 p-8 shadow-lg transition duration-300 hover:shadow-xl'>
            <h2 className='mb-4 text-3xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
              1. Purpose and Scope
            </h2>
            <p className='text-gray-900 leading-relaxed'>
              This Privacy Policy outlines how VaxBot collects, uses, and protects the personal information of users who
              interact with our vaccination services, website, and mobile app. This policy applies to all customers,
              website visitors, and app users engaging with VaxBot’s flagship center and online platforms.
            </p>
          </div>

          {/* Information Collection */}
          <div className='mb-12 rounded-xl bg-gray-50 p-8 shadow-lg transition duration-300 hover:shadow-xl'>
            <h2 className='mb-4 text-3xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
              2. Information Collection
            </h2>
            <p className='text-gray-900 leading-relaxed'>
              We collect the following types of information to provide and improve our vaccination services:
            </p>
            <ul className='mt-4 list-disc pl-6 text-gray-900 leading-relaxed'>
              <li>
                <strong>Personal Information:</strong> Name, date of birth, gender, address, phone number, email
                address, and identification details provided during registration or appointment booking.
              </li>
              <li>
                <strong>Health Information:</strong> Medical history, vaccination records, and health screening details
                shared during consultations or pre-vaccination assessments.
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type, device information, and usage data collected
                through cookies and analytics tools on our website and app.
              </li>
              <li>
                <strong>Payment Information:</strong> Payment details (e.g., credit card numbers) are processed securely
                through third-party payment gateways and are not stored by VaxBot.
              </li>
            </ul>
          </div>

          {/* Use of Information */}
          <div className='mb-12 rounded-xl bg-gray-50 p-8 shadow-lg transition duration-300 hover:shadow-xl'>
            <h2 className='mb-4 text-3xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
              3. Use of Information
            </h2>
            <p className='text-gray-900 leading-relaxed'>
              VaxBot uses the collected information for the following purposes:
            </p>
            <ul className='mt-4 list-disc pl-6 text-gray-900 leading-relaxed'>
              <li>To schedule and manage vaccination appointments at our flagship center.</li>
              <li>To provide personalized vaccination recommendations and reminders via the VaxBot app.</li>
              <li>To process payments securely and issue vaccination certificates.</li>
              <li>
                To communicate with you regarding appointment updates, health advice, and promotional offers (with your
                consent).
              </li>
              <li>To improve our services, website, and app functionality through data analysis and user feedback.</li>
            </ul>
          </div>

          {/* Information Sharing */}
          <div className='mb-12 rounded-xl bg-gray-50 p-8 shadow-lg transition duration-300 hover:shadow-xl'>
            <h2 className='mb-4 text-3xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
              4. Information Sharing
            </h2>
            <p className='text-gray-900 leading-relaxed'>
              VaxBot does not sell or trade your personal information. We may share your information in the following
              cases:
            </p>
            <ul className='mt-4 list-disc pl-6 text-gray-900 leading-relaxed'>
              <li>
                <strong>With Healthcare Providers:</strong> To coordinate your vaccination and medical care (e.g.,
                sharing records with doctors at our flagship center).
              </li>
              <li>
                <strong>With Trusted Partners:</strong> With third-party service providers (e.g., payment processors,
                analytics providers) who are contractually obligated to protect your data.
              </li>
              <li>
                <strong>For Legal Compliance:</strong> When required by law, such as reporting vaccination data to
                public health authorities as mandated by Vietnamese regulations.
              </li>
            </ul>
          </div>

          {/* Information Security */}
          <div className='mb-12 rounded-xl bg-gray-50 p-8 shadow-lg transition duration-300 hover:shadow-xl'>
            <h2 className='mb-4 text-3xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
              5. Information Security
            </h2>
            <p className='text-gray-900 leading-relaxed'>
              VaxBot employs industry-standard security measures to protect your data, including:
            </p>
            <ul className='mt-4 list-disc pl-6 text-gray-900 leading-relaxed'>
              <li>
                Encryption of sensitive data (e.g., health and payment information) during transmission and storage.
              </li>
              <li>Access controls and authentication protocols to limit data access to authorized personnel only.</li>
              <li>Regular security audits and updates to safeguard against vulnerabilities.</li>
              <li>
                Secure storage of vaccination records at our flagship center, compliant with Vietnamese data protection
                laws.
              </li>
            </ul>
            <p className='mt-4 text-gray-900 leading-relaxed'>
              While we strive to protect your information, no system is completely immune to risks. We encourage users
              to keep their login credentials confidential.
            </p>
          </div>

          {/* User Rights */}
          <div className='mb-12 rounded-xl bg-gray-50 p-8 shadow-lg transition duration-300 hover:shadow-xl'>
            <h2 className='mb-4 text-3xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
              6. User Rights
            </h2>
            <p className='text-gray-900 leading-relaxed'>
              As a VaxBot user, you have the following rights regarding your personal information:
            </p>
            <ul className='mt-4 list-disc pl-6 text-gray-900 leading-relaxed'>
              <li>
                <strong>Access:</strong> Request access to the personal data we hold about you.
              </li>
              <li>
                <strong>Correction:</strong> Request corrections to inaccurate or incomplete data.
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your data, subject to legal retention requirements (e.g.,
                vaccination records).
              </li>
              <li>
                <strong>Opt-Out:</strong> Opt out of marketing communications at any time via email or app settings.
              </li>
            </ul>
            <p className='mt-4 text-gray-900 leading-relaxed'>
              To exercise these rights, please contact us using the information provided below.
            </p>
          </div>

          {/* Policy Updates */}
          <div className='mb-12 rounded-xl bg-gray-50 p-8 shadow-lg transition duration-300 hover:shadow-xl'>
            <h2 className='mb-4 text-3xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
              7. Policy Updates
            </h2>
            <p className='text-gray-900 leading-relaxed'>
              VaxBot may update this Privacy Policy periodically to reflect changes in our practices or legal
              requirements. We will notify users of significant updates via email or app notifications. The updated
              policy will be posted on this page with the effective date.
            </p>
          </div>

          {/* Contact Information */}
          <div className='mb-12 rounded-xl bg-gray-50 p-8 shadow-lg transition duration-300 hover:shadow-xl'>
            <h2 className='mb-4 text-3xl font-bold bg-gradient-to-r from-blue-300 via-teal-400 to-green-400 bg-clip-text text-transparent'>
              8. Contact Information
            </h2>
            <p className='text-gray-900 leading-relaxed'>
              If you have questions or concerns about this Privacy Policy or how your data is handled, please contact
              us:
            </p>
            <ul className='mt-4 list-disc pl-6 text-gray-900 leading-relaxed'>
              <li>
                <strong>Email:</strong> support@vaxbot.com
              </li>
              <li>
                <strong>Phone:</strong> 1900 1900
              </li>
              <li>
                <strong>Address:</strong> 120 Hoang Minh Thao, Hoa Khanh Nam, Lien Chieu, Da Nang
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PrivacyPolicy
