import Head from 'next/head'
import Link from 'next/link'
import SiteLayout from '../components/SiteLayout'

const questions = [
  ['How do I start a project?', 'Use the project enquiry to outline your idea and timing. It opens a draft in your email app so you can review it before sending.'],
  ['How does client access work?', 'The workspace is invitation-only. If your account has already been provisioned, request a one-time sign-in link using the same email address.'],
  ['Can I share confidential material in the enquiry?', 'Please do not include confidential files or sensitive information in the initial enquiry. If an NDA is needed, mention it and the studio can discuss the right next step.'],
  ['How do artists apply?', 'Share your portfolio and preferred creative role through the artist enquiry. Applications are reviewed by the studio; submission does not automatically grant portal access or guarantee an assignment.'],
  ['When will project files appear in the workspace?', 'The secure workspace is being prepared for project records and review tools. Until those services are connected, no project files or private project data are displayed there.'],
]

export default function FAQPage() {
  return (
    <SiteLayout>
      <Head>
        <title>Frequently asked questions | Nartstudio</title>
        <meta name="description" content="Answers about starting a project, client access, privacy and artist collaboration at Nartstudio." />
      </Head>
      <main id="main-content" className="editorial-page faq-page">
        <section className="page-hero">
          <p className="eyebrow"><span /> THE DETAILS / MADE A LITTLE CLEARER</p>
          <h1>Questions worth<br /><em>asking early.</em></h1>
          <p>Here are a few useful things to know before you start a project, request portal access or introduce your work.</p>
        </section>
        <section className="faq-list">
          {questions.map(([question, answer], index) => (
            <details className="faq-item" key={question}>
              <summary><span>0{index + 1}</span><strong>{question}</strong><i aria-hidden="true">+</i></summary>
              <p>{answer}</p>
            </details>
          ))}
        </section>
        <section className="faq-contact">
          <p className="eyebrow"><span /> STILL HAVE A QUESTION?</p>
          <h2>We’re happy to<br /><em>talk it through.</em></h2>
          <Link className="button-pill button-pill--light" href="/help">Contact client support <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
    </SiteLayout>
  )
}
