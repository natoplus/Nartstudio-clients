import Head from 'next/head'
import Link from 'next/link'
import SiteLayout from '../components/SiteLayout'
import { services } from '../lib/siteContent'

export default function ServicesPage() {
  return (
    <SiteLayout>
      <Head>
        <title>Creative services | Nartstudio</title>
        <meta name="description" content="Explore Nartstudio's comics, character design, concept art, worldbuilding, story development and animation services." />
      </Head>
      <main id="main-content" className="editorial-page">
        <section className="page-hero">
          <p className="eyebrow"><span /> CREATIVE SERVICES / BUILT AROUND THE IDEA</p>
          <h1>Make the thing<br /><em>only you can make.</em></h1>
          <p>From a single visual direction to a complete story production, choose the discipline that fits your next step—or bring us the question you’re still working out.</p>
          <Link className="button-pill button-pill--light" href="/start">Tell us about your project <span aria-hidden="true">↗</span></Link>
        </section>
        <section className="home-section service-detail-list" aria-label="Nartstudio services">
          <div className="service-grid">
            {services.map((service) => (
              <article className={`service-card service-card--${service.accent}`} id={service.slug} key={service.slug}>
                <span className="card-number">{service.number}</span>
                <span className="service-icon" aria-hidden="true">{service.number}</span>
                <h2>{service.title}</h2>
                <p>{service.detail}</p>
                <ul>
                  {service.deliverables.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <Link className="text-link" href={`/start?service=${encodeURIComponent(service.title)}`}>Discuss this service <span aria-hidden="true">↗</span></Link>
              </article>
            ))}
          </div>
        </section>
        <section className="closing-cta">
          <p className="eyebrow"><span /> THE RIGHT SCOPE STARTS WITH A CONVERSATION</p>
          <h2>Not sure where<br /><em>to begin?</em></h2>
          <p>Tell us the idea, even if it is still taking shape.</p>
          <Link className="button-pill button-pill--light" href="/start">Start a project <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
    </SiteLayout>
  )
}
