import Head from 'next/head'
import Link from 'next/link'
import SiteLayout from '../components/SiteLayout'
import { brands, processStages, services, studioValues } from '../lib/siteContent'

export default function ClientHomePage() {
  return (
    <SiteLayout>
      <Head>
        <title>Nartstudio Clients — Worlds that move</title>
        <meta name="description" content="Explore Nartstudio's original worlds, creative services and thoughtful project process. Start a project or access your private workspace." />
        <meta property="og:title" content="Nartstudio Clients — Worlds that move" />
        <meta property="og:description" content="Original worlds, thoughtful craft and a clearer path from first brief to final delivery." />
        <meta property="og:type" content="website" />
      </Head>
      <main id="main-content" className="home-page">
        <section className="hero-section">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-shape hero-shape--ring" aria-hidden="true" />
          <div className="hero-shape hero-shape--panel" aria-hidden="true" />
          <div className="hero-shape hero-shape--orb" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow"><span /> ORIGINAL COMICS & ANIMATION STUDIO</p>
            <h1>We build<br /><em>worlds that move.</em></h1>
            <p>Original stories, bold visual worlds and carefully made creative work—developed with the right people, one clear stage at a time.</p>
            <div className="hero-actions">
              <Link className="button-pill button-pill--light" href="/start">Start a project <span aria-hidden="true">↗</span></Link>
              <Link className="button-pill button-pill--ghost" href="/work">See our work <span aria-hidden="true">↓</span></Link>
            </div>
          </div>
          <div className="hero-caption"><span>INDEPENDENT CREATIVE STUDIO</span><span>STORIES / WORLDS / MOTION</span></div>
          <a className="hero-scroll" href="#studio-intro" aria-label="Scroll to explore"><span />SCROLL TO EXPLORE</a>
        </section>

        <section className="studio-stats" aria-label="Nartstudio at a glance">
          <div><span>STUDIO</span><strong>Independent by design</strong></div>
          <div><span>CRAFT</span><strong>Stories, images & motion</strong></div>
          <div><span>PROCESS</span><strong>Clear stages, thoughtful reviews</strong></div>
          <div><span>CLIENT SPACE</span><strong>Private access by invitation</strong></div>
        </section>

        <section className="home-section intro-section" id="studio-intro">
          <div className="section-lead">
            <p className="eyebrow"><span /> A STUDIO FOR STORIES WITH A POINT OF VIEW</p>
            <h2>Make the idea<br /><em>impossible to ignore.</em></h2>
          </div>
          <div className="intro-copy">
            <p>Nartstudio brings story, character and image together to make original creative work. We build our own worlds and collaborate with clients who want to make something with its own identity.</p>
            <Link className="text-link" href="/studio">Meet the studio <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="home-section worlds-section" id="work">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> SELECTED WORLDS & WORK</p>
              <h2>Different worlds.<br /><em>One curious studio.</em></h2>
            </div>
            <Link className="button-pill button-pill--ghost" href="/brands">Explore the ecosystem <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="world-fan">
            {brands.map((brand, index) => (
              <a
                className={`world-card world-card--${brand.accent} world-card--${index + 1}`}
                href={brand.href}
                key={brand.slug}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={brand.image} alt="" loading="lazy" />
                <span className="world-card-category">{brand.category}</span>
                <span className="world-card-copy"><strong>{brand.name}</strong><span>{brand.description}</span></span>
                <span className="world-card-open" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <p className="section-note">A glimpse into our original brands and public-facing studio work. Private client work is shared only with permission.</p>
        </section>

        <section className="home-section benefits-section">
          <div className="section-heading section-heading--center">
            <div>
              <p className="eyebrow"><span /> THE WORK, MADE CLEARER</p>
              <h2>Good work comes<br /><em>from good process.</em></h2>
              <p className="section-subtitle">A considered creative partnership gives the idea room to grow—and gives everyone a clear next step.</p>
            </div>
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
          <div className="benefit-shape benefit-shape--one" aria-hidden="true" />
          <div className="benefit-shape benefit-shape--two" aria-hidden="true" />
        </section>

        <section className="home-section services-section" id="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> WHAT WE MAKE</p>
              <h2>From the first spark<br /><em>to the final frame.</em></h2>
            </div>
            <p className="section-aside">Bring us a starting point or a world already in motion. We’ll shape the right creative team and process around it.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <Link className={`service-card service-card--${service.accent}`} href={`/services#${service.slug}`} key={service.slug}>
                <span className="card-number">{service.number}</span>
                <span className="service-icon" aria-hidden="true">{service.number === '01' ? '▤' : service.number === '02' ? '◉' : service.number === '03' ? '✳' : service.number === '04' ? '◎' : service.number === '05' ? '↗' : '◌'}</span>
                <h3>{service.title}</h3>
                <p>{service.short}</p>
                <span className="service-link">Explore service <span aria-hidden="true">↗</span></span>
              </Link>
            ))}
          </div>
          <div className="section-end-link"><Link className="text-link" href="/services">See all services <span aria-hidden="true">↗</span></Link></div>
        </section>

        <section className="process-band">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> A SHARED PATH FORWARD</p>
              <h2>Good momentum,<br /><em>without the guesswork.</em></h2>
            </div>
            <p className="section-aside">The right checkpoints keep creative decisions visible and the project moving with purpose.</p>
          </div>
          <div className="process-steps">
            {processStages.map((stage) => (
              <article className="process-step" key={stage.number}>
                <span>{stage.number}</span>
                <h3>{stage.title}</h3>
                <p>{stage.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section brands-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> OUR CREATIVE ECOSYSTEM</p>
              <h2>Three doors<br /><em>into the worlds.</em></h2>
            </div>
            <Link className="text-link" href="/brands">Meet the brands <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="brand-list">
            {brands.map((brand) => (
              <a className={`brand-row brand-row--${brand.accent}`} href={brand.href} key={brand.slug} target="_blank" rel="noopener noreferrer">
                <span className="brand-row-category">{brand.category}</span>
                <strong>{brand.name}</strong>
                <span className="brand-row-description">{brand.description}</span>
                <span className="brand-row-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className="artist-callout">
          <div className="artist-callout-copy">
            <p className="eyebrow"><span /> FOR ARTISTS & STORYTELLERS</p>
            <h2>Bring your craft<br /><em>into the picture.</em></h2>
            <p>We work with thoughtful creative collaborators across story, drawing, design and motion. Tell us what you do and share a portfolio for consideration.</p>
            <Link className="button-pill button-pill--light" href="/artists/join">Explore artist collaboration <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="artist-preview" aria-hidden="true">
            <div className="preview-top"><span>CREATIVE COLLABORATION</span><span>01—04</span></div>
            <div className="preview-orbit"><span /><i /><b /></div>
            <div className="preview-bottom"><span>STORY</span><span>IMAGE</span><span>MOTION</span></div>
          </div>
        </section>

        <section className="home-section client-preview-section">
          <div className="client-preview-copy">
            <p className="eyebrow"><span /> A QUIETER PLACE FOR THE DETAILS</p>
            <h2>Your project,<br /><em>in clear view.</em></h2>
            <p>Invited clients can sign in to follow project updates and find the next step. Access is private, and project records appear only when the studio connects them to your workspace.</p>
            <div className="hero-actions">
              <Link className="button-pill button-pill--light" href="/signin">Client sign in <span aria-hidden="true">↗</span></Link>
              <Link className="button-pill button-pill--ghost" href="/start">Start a project <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div className="dashboard-preview" aria-hidden="true">
            <div className="dashboard-preview-bar"><span /><span /><span /><b>PROJECT / OVERVIEW</b><i>PRIVATE</i></div>
            <div className="dashboard-preview-content">
              <div><span>PROJECT STAGE</span><strong>Made clear, together.</strong><p>A considered process from brief to delivery.</p></div>
              <div className="preview-progress"><span>BRIEF</span><i /><span>STYLE</span><i /><span>MAKE</span><i /><span>DELIVER</span></div>
              <div className="preview-glass-card"><span>YOUR NEXT STEP</span><strong>Review the direction</strong><small>Feedback stays connected to the work.</small></div>
            </div>
          </div>
        </section>

        <section className="news-teaser">
          <div>
            <p className="eyebrow"><span /> NOTES FROM THE STUDIO</p>
            <h2>New work, when<br /><em>it’s ready to share.</em></h2>
            <p>We publish stories and process notes only when the work is cleared for public viewing.</p>
          </div>
          <Link className="button-pill button-pill--ghost" href="/news">Studio notes <span aria-hidden="true">↗</span></Link>
        </section>

        <section className="closing-cta">
          <p className="eyebrow"><span /> START WITH A CONVERSATION</p>
          <h2>Have a world<br /><em>in mind?</em></h2>
          <p>Share what you’re imagining. We’ll work out the right next step together.</p>
          <Link className="button-pill button-pill--light" href="/start">Start a project <span aria-hidden="true">↗</span></Link>
          <div className="closing-orbit closing-orbit--one" aria-hidden="true" />
          <div className="closing-orbit closing-orbit--two" aria-hidden="true" />
        </section>
      </main>
    </SiteLayout>
  )
}
