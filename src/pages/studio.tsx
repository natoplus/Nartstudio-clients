import Head from 'next/head'
import Link from 'next/link'
import SiteLayout from '../components/SiteLayout'
import { processStages, studioValues } from '../lib/siteContent'

export default function StudioPage() {
  return (
    <SiteLayout>
      <Head>
        <title>Studio | Nartstudio</title>
        <meta name="description" content="Meet Nartstudio: an independent creative studio making original stories, visual worlds and moving-image work." />
      </Head>
      <main id="main-content" className="editorial-page">
        <section className="page-hero page-hero--studio">
          <p className="eyebrow"><span /> INDEPENDENT / STORY-LED / CURIOUS</p>
          <h1>We make room<br /><em>for worlds to grow.</em></h1>
          <p>Nartstudio is an independent creative studio working across original comics, character design, visual development and motion. We bring story and image together, then build a process that keeps the work clear from first conversation to handoff.</p>
          <div className="hero-actions">
            <Link className="button-pill button-pill--light" href="/start">Start a conversation <span aria-hidden="true">↗</span></Link>
            <Link className="button-pill button-pill--ghost" href="/work">Explore selected work <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="studio-hero-art"><img src="/studio-atlas.svg" alt="" /></div>
        </section>

        <section className="home-section values-section">
          <div className="section-heading">
            <div><p className="eyebrow"><span /> HOW WE APPROACH THE WORK</p><h2>Make it meaningful.<br /><em>Make it together.</em></h2></div>
            <p className="section-aside">Our own worlds and client projects share the same care: clear intent, a thoughtful process and respect for the people making the work.</p>
          </div>
          <div className="benefit-grid">
            {studioValues.map((value) => (
              <article className="glass-card benefit-card" key={value.number}>
                <span className="card-number">{value.number}</span>
                <h3>{value.title}</h3>
                <p>{value.detail}</p>
                <span className="card-mark" aria-hidden="true">✳</span>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section timeline-section">
          <div className="section-heading">
            <div><p className="eyebrow"><span /> A SHARED PATH</p><h2>From the first<br /><em>idea to the handoff.</em></h2></div>
          </div>
          <div className="process-steps">
            {processStages.map((stage) => (
              <article className="process-step" key={stage.number}>
                <span>{stage.number}</span><h3>{stage.title}</h3><p>{stage.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="closing-cta">
          <p className="eyebrow"><span /> A GOOD PLACE TO BEGIN</p>
          <h2>Tell us what<br /><em>you’re imagining.</em></h2>
          <p>We’ll help turn the first conversation into a useful next step.</p>
          <Link className="button-pill button-pill--light" href="/start">Start a project <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
    </SiteLayout>
  )
}
