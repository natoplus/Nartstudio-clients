import Head from 'next/head'
import Link from 'next/link'
import SiteLayout from '../components/SiteLayout'

const contactRoutes = [
  {
    number: '01',
    title: 'Start a project',
    detail: 'Share the idea, the intended scope and the questions you are still working through.',
    href: '/start',
    action: 'Open the project brief',
  },
  {
    number: '02',
    title: 'Client support',
    detail: 'For access issues, project updates or help finding the right next step.',
    href: '/help',
    action: 'Visit client support',
  },
  {
    number: '03',
    title: 'Artist collaboration',
    detail: 'Introduce your practice and share a portfolio for the studio to review.',
    href: '/artists/join',
    action: 'Explore collaboration',
  },
]

export default function ContactPage() {
  return (
    <SiteLayout>
      <Head>
        <title>Contact Nartstudio</title>
        <meta name="description" content="Find the right way to contact Nartstudio about a project, client access or creative collaboration." />
      </Head>
      <main id="main-content" className="editorial-page">
        <section className="page-hero">
          <p className="eyebrow"><span /> THE FIRST CONVERSATION</p>
          <h1>Tell us what<br /><em>you need next.</em></h1>
          <p>Choose the route that fits. For a general question, email <a className="text-link" href="mailto:hello@nartstudio.com">hello@nartstudio.com</a>.</p>
        </section>
        <section className="home-section contact-routes">
          <div className="service-grid">
            {contactRoutes.map((route) => (
              <article className="service-card" key={route.number}>
                <span className="card-number">{route.number}</span>
                <h2>{route.title}</h2>
                <p>{route.detail}</p>
                <Link className="text-link" href={route.href}>{route.action} <span aria-hidden="true">↗</span></Link>
              </article>
            ))}
          </div>
          <p className="section-note">Please do not include confidential files or sensitive information in an initial enquiry.</p>
        </section>
      </main>
    </SiteLayout>
  )
}
