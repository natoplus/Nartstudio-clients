import Head from 'next/head'
import { useMemo, useState } from 'react'
import SiteLayout from '../components/SiteLayout'
import { brands } from '../lib/siteContent'

const filters = ['All', 'Comics', 'Motion', 'Creator tools']

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const visibleBrands = useMemo(
    () => activeFilter === 'All' ? brands : brands.filter((brand) => brand.tags.includes(activeFilter)),
    [activeFilter],
  )

  return (
    <SiteLayout>
      <Head>
        <title>Selected work | Nartstudio</title>
        <meta name="description" content="Explore public-facing original worlds and creative work from Nartstudio." />
      </Head>
      <main id="main-content" className="editorial-page">
        <section className="page-hero">
          <p className="eyebrow"><span /> SELECTED WORLDS / PUBLIC WORK</p>
          <h1>Stories with<br /><em>their own gravity.</em></h1>
          <p>A selection of Nartstudio’s public-facing brands and creative worlds. Private client work is not shown without permission.</p>
        </section>
        <section className="home-section work-index">
          <div className="filter-row" aria-label="Filter work">
            {filters.map((filter) => (
              <button
                className={`filter-chip${activeFilter === filter ? ' is-active' : ''}`}
                key={filter}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="work-gallery work-gallery--editorial">
            {visibleBrands.map((brand, index) => (
              <a className={`work-card work-card--${brand.accent} work-card--index-${index + 1}`} href={brand.href} key={brand.slug} target="_blank" rel="noopener noreferrer">
                <img src={brand.image} alt="" loading="lazy" />
                <span>{brand.category}</span>
                <strong>{brand.name}<i aria-hidden="true">↗</i></strong>
                <p>{brand.description}</p>
              </a>
            ))}
          </div>
          {visibleBrands.length === 0 && <p className="empty-note">No public work is listed in this category yet.</p>}
        </section>
      </main>
    </SiteLayout>
  )
}
