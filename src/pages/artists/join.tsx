import Head from 'next/head'
import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import SiteLayout from '../../components/SiteLayout'

const roles = ['Storyboard', 'Layout', 'Line art', 'Flats / colour', 'Lettering', '3D', 'Animation', 'Writing', 'Concept design']

type ArtistApplication = {
  name: string
  email: string
  country: string
  role: string
  portfolio: string
  software: string
  availability: string
  rates: string
  introduction: string
  consent: boolean
}

const emptyApplication: ArtistApplication = {
  name: '',
  email: '',
  country: '',
  role: '',
  portfolio: '',
  software: '',
  availability: '',
  rates: '',
  introduction: '',
  consent: false,
}

export default function JoinAsArtistPage() {
  const [application, setApplication] = useState(emptyApplication)
  const [draftOpened, setDraftOpened] = useState(false)

  function updateField<K extends keyof ArtistApplication>(key: K, value: ArtistApplication[K]) {
    setApplication((current) => ({ ...current, [key]: value }))
  }

  function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const message = [
      `Name: ${application.name}`,
      `Email: ${application.email}`,
      `Country: ${application.country || 'Not provided'}`,
      `Role: ${application.role}`,
      `Portfolio: ${application.portfolio}`,
      `Software: ${application.software || 'Not provided'}`,
      `Availability: ${application.availability || 'Not provided'}`,
      `Rates: ${application.rates || 'Not provided'}`,
      `Introduction: ${application.introduction}`,
    ].join('\n')
    const subject = encodeURIComponent(`Artist application enquiry: ${application.role}`)
    window.location.href = `mailto:hello@nartstudio.com?subject=${subject}&body=${encodeURIComponent(message)}`
    setDraftOpened(true)
  }

  return (
    <SiteLayout>
      <Head>
        <title>Collaborate with Nartstudio | Artists</title>
        <meta name="description" content="Learn how artists and creative collaborators can introduce their work to Nartstudio." />
      </Head>
      <main id="main-content" className="editorial-page artist-page">
        <section className="page-hero">
          <p className="eyebrow"><span /> FOR ARTISTS / STORYTELLERS / MAKERS</p>
          <h1>Make good work<br /><em>with good people.</em></h1>
          <p>We collaborate with artists across comics, character design, concept development and animation. Tell us where your craft fits and share a portfolio for consideration.</p>
        </section>
        <section className="home-section artist-process-section">
          <div className="section-heading"><div><p className="eyebrow"><span /> HOW COLLABORATION STARTS</p><h2>A careful process.<br /><em>No automatic roles.</em></h2></div></div>
          <div className="process-steps artist-steps">
            <article className="process-step"><span>01</span><h3>Introduce your work</h3><p>Share a portfolio and the kind of creative work you want to do.</p></article>
            <article className="process-step"><span>02</span><h3>Portfolio review</h3><p>The studio reviews submissions and follows up where there is a good fit.</p></article>
            <article className="process-step"><span>03</span><h3>Agree on the details</h3><p>Before an assignment, discuss scope, expectations, agreements and availability.</p></article>
            <article className="process-step"><span>04</span><h3>Invitation to collaborate</h3><p>Submitting this enquiry does not grant artist access or guarantee an assignment.</p></article>
          </div>
        </section>
        <section className="brief-panel glass-card artist-form-panel">
          <div className="brief-topline"><div><span className="card-number">N / COLLABORATOR ENQUIRY</span><h2>Share your practice.</h2></div></div>
          <p className="field-hint">The form opens a draft in your email app so you can review it before sending.</p>
          <form className="brief-form artist-form" onSubmit={submitApplication}>
            <div className="brief-field-grid">
              <div><label htmlFor="artist-name">Name <span>Required</span></label><input id="artist-name" autoComplete="name" value={application.name} onChange={(event) => updateField('name', event.target.value)} required /></div>
              <div><label htmlFor="artist-email">Email <span>Required</span></label><input id="artist-email" type="email" autoComplete="email" value={application.email} onChange={(event) => updateField('email', event.target.value)} required /></div>
              <div><label htmlFor="artist-country">Country / region <span>Optional</span></label><input id="artist-country" autoComplete="country-name" value={application.country} onChange={(event) => updateField('country', event.target.value)} /></div>
              <div><label htmlFor="artist-role">Creative role <span>Required</span></label><select id="artist-role" value={application.role} onChange={(event) => updateField('role', event.target.value)} required><option value="">Choose a role</option>{roles.map((role) => <option key={role}>{role}</option>)}</select></div>
            </div>
            <label htmlFor="artist-portfolio">Portfolio link <span>Required</span></label><input id="artist-portfolio" type="url" value={application.portfolio} onChange={(event) => updateField('portfolio', event.target.value)} placeholder="https://…" required />
            <label htmlFor="artist-software">Tools or software <span>Optional</span></label><input id="artist-software" value={application.software} onChange={(event) => updateField('software', event.target.value)} />
            <div className="brief-field-grid">
              <div><label htmlFor="artist-availability">Availability <span>Optional</span></label><input id="artist-availability" value={application.availability} onChange={(event) => updateField('availability', event.target.value)} placeholder="Current capacity or time zone" /></div>
              <div><label htmlFor="artist-rates">Rates <span>Optional</span></label><input id="artist-rates" value={application.rates} onChange={(event) => updateField('rates', event.target.value)} placeholder="Share if you wish" /></div>
            </div>
            <label htmlFor="artist-introduction">A short introduction <span>Required</span></label><textarea id="artist-introduction" minLength={20} value={application.introduction} onChange={(event) => updateField('introduction', event.target.value)} rows={4} required placeholder="What kind of work do you do, and what would you like to make?" />
            <label className="check-option"><input type="checkbox" checked={application.consent} onChange={(event) => updateField('consent', event.target.checked)} required /><span>I agree that Nartstudio may use these details to review and respond to this collaboration enquiry.</span></label>
            <div className="brief-controls"><button className="button-pill button-pill--light" type="submit">Open application email <span aria-hidden="true">↗</span></button></div>
            {draftOpened && <p className="form-message success" role="status">Your email app should have opened a draft. Your application is not sent until you press Send.</p>}
          </form>
        </section>
      </main>
    </SiteLayout>
  )
}
