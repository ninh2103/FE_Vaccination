import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

type FaqItem = {
  question: string
  answer: string
}

const faqsData: FaqItem[] = [
  {
    question: 'What is this vaccine used for?',
    answer:
      'This vaccine is designed to provide immunity against specific diseases by stimulating the body’s immune response.'
  },
  {
    question: 'What are the possible side effects of this vaccine?',
    answer:
      'Common side effects include mild fever, soreness at the injection site, and fatigue. Serious side effects are rare but should be reported to a healthcare professional.'
  },
  {
    question: 'Who is eligible to receive this vaccine?',
    answer:
      'This vaccine is recommended for individuals within a specific age group or risk category. Please consult with a healthcare provider for eligibility criteria.'
  },
  {
    question: 'How many doses are required for full immunity?',
    answer:
      'The number of doses required depends on the type of vaccine. Some vaccines require a single dose, while others need multiple doses or booster shots for maximum protection.'
  },
  {
    question: 'Can I receive this vaccine if I have allergies?',
    answer:
      'If you have a history of severe allergic reactions, consult with a doctor before receiving the vaccine to determine if it is safe for you.'
  },
  {
    question: 'Where can I get vaccinated?',
    answer:
      'You can receive the vaccine at hospitals, clinics, or authorized vaccination centers. Check with local health authorities for available locations.'
  }
]

const FaqContent = () => {
  return (
    <section>
      <h3 className='text-xl sm:text-2xl font-bold dark:text-white mb-5 sm:mb-6'>Frequently asked questions</h3>
      <Accordion type='single' collapsible>
        {faqsData.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx + 1}`}>
            <AccordionTrigger className='text-left'>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

export default FaqContent
