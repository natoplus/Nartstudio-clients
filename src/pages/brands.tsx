import Head from 'next/head'
import Link from 'next/link'
import SiteLayout from '../components/SiteLayout'
import { brands } from '../lib/siteContent'

export default function BrandsPage() {
  return (
    <SiteLayout>
      <Head>
        <title>Our brands | Nartstudio</title>
        <meta name="description" content="Explore Nartstudio, NCU, Oubyt and Pylothouse: distinct creative worlds in one independent studio ecosystem." />
      </Head>
      <main id="main-content" className="editorial-page">
        <section className="page-hero">
          <p className="eyebrow"><span /> DIFFERENT AUDIENCES / ONE STUDIO ECOSYSTEM</p>
          <h1>Three distinct<br /><em>creative worlds.</em></h1>
          <p>Each brand has its own voice and audience. Together they make room for comics, moving-image stories and tools for independent creators.</p>
        </section>
        <section className="brand-panels">
          {brands.map((brand, index) => (
            <article className={`brand-panel brand-panel--${brand.accent}`} key={brand.slug}>
              <div className="brand-panel-copy">
                <img className="brand-panel-logo" src={brand.logo} alt={`${brand.name} logo`} loading="lazy" />
                <span className="card-number">0{index + 1} / {brand.category}</span>
                <h2>{brand.name}</h2>
                <p>{brand.description}</p>
                <a className="button-pill button-pill--ghost" href={brand.href} target="_blank" rel="noopener noreferrer">
                  Visit {brand.name} <span aria-hidden="true">↗</span>
                </a>
              </div>
              <img src={brand.image} alt="" loading="lazy" />
            </article>
          ))}
        </section>
        <section className="closing-cta">
          <p className="eyebrow"><span /> COLLABORATE WITH THE STUDIO</p>
          <h2>Have an idea<br /><em>of your own?</em></h2>
          <Link className="button-pill button-pill--light" href="/start">Start a project <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
    </SiteLayout>
  )
}
