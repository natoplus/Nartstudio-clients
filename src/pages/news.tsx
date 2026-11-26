import Head from 'next/head'
import Link from 'next/link'
import SiteLayout from '../components/SiteLayout'

export default function NewsPage() {
  return (
    <SiteLayout>
      <Head>
        <title>Studio notes | Nartstudio</title>
        <meta name="description" content="News and process notes from Nartstudio." />
      </Head>
      <main id="main-content" className="editorial-page">
        <section className="page-hero">
          <p className="eyebrow"><span /> NEWS / PROCESS / NEW WORLDS</p>
          <h1>Notes from<br /><em>the studio.</em></h1>
          <p>We share stories and process notes when the work is ready and cleared for public viewing.</p>
        </section>
        <section className="news-empty glass-card">
          <span className="card-number">THE NEXT CHAPTER</span>
          <h2>Nothing to announce just yet.</h2>
          <p>Explore the worlds already out there, or get in touch about a project of your own.</p>
          <div className="hero-actions">
            <Link className="button-pill button-pill--light" href="/work">Explore public work <span aria-hidden="true">↗</span></Link>
            <Link className="button-pill button-pill--ghost" href="/start">Start a project <span aria-hidden="true">↗</span></Link>
          </div>
        </section>
      </main>
    </SiteLayout>
  )
}
