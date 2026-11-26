import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState, type FormEvent } from 'react'
import { useRouter } from 'next/router'
import SiteLayout from '../components/SiteLayout'

type ProjectBrief = {
  projectType: string
  idea: string
  references: string
  existingIp: string
  tone: string
  formats: string
  volume: string
  deadline: string
  budget: string
  nda: boolean
  name: string
  email: string
  company: string
  country: string
  contact: string
  consent: boolean
}

const projectTypes = [
  'Comic',
  'Character design',
  'Concept art',
  'Worldbuilding',
  'Story development',
  'Animation',
  'Other',
]

const stepNames = ['Project type', 'The idea', 'Scope & schedule', 'About you', 'Review']

const emptyBrief: ProjectBrief = {
  projectType: '',
  idea: '',
  references: '',
  existingIp: '',
  tone: '',
  formats: '',
  volume: '',
  deadline: '',
  budget: '',
  nda: false,
  name: '',
  email: '',
  company: '',
  country: '',
  contact: 'Email',
  consent: false,
}

export default function StartProjectPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [brief, setBrief] = useState(emptyBrief)
  const [draftOpened, setDraftOpened] = useState(false)

  useEffect(() => {
    if (!router.isReady || typeof router.query.service !== 'string') return
    const requestedService = router.query.service
    const matchedType = projectTypes.find((type) => requestedService.toLowerCase().includes(type.toLowerCase()))
    setBrief((current) => ({
      ...current,
      projectType: matchedType ?? current.projectType,
      idea: current.idea || `I'm interested in discussing ${requestedService}.`,
    }))
  }, [router.isReady, router.query.service])

  function updateField<K extends keyof ProjectBrief>(key: K, value: ProjectBrief[K]) {
    setBrief((current) => ({ ...current, [key]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (step < stepNames.length - 1) {
      setStep((current) => current + 1)
      return
    }

    const details = [
      `Project type: ${brief.projectType}`,
      `Idea: ${brief.idea}`,
      `References: ${brief.references || 'Not provided'}`,
      `Existing IP: ${brief.existingIp || 'Not provided'}`,
      `Tone / direction: ${brief.tone || 'Not provided'}`,
      `Formats: ${brief.formats || 'Not provided'}`,
      `Volume: ${brief.volume || 'Not provided'}`,
      `Deadline: ${brief.deadline || 'Not provided'}`,
      `Budget range: ${brief.budget || 'Not provided'}`,
      `NDA requested: ${brief.nda ? 'Yes' : 'No'}`,
      `Name: ${brief.name}`,
      `Email: ${brief.email}`,
      `Company: ${brief.company || 'Not provided'}`,
      `Country: ${brief.country || 'Not provided'}`,
      `Preferred contact: ${brief.contact}`,
    ].join('\n')
    const subject = encodeURIComponent(`New project enquiry: ${brief.projectType}`)
    window.location.href = `mailto:hello@nartstudio.com?subject=${subject}&body=${encodeURIComponent(details)}`
    setDraftOpened(true)
  }

  return (
    <SiteLayout>
      <Head>
        <title>Start a project | Nartstudio</title>
        <meta name="description" content="Share your idea with Nartstudio and outline the project, scope and next steps." />
      </Head>
      <main id="main-content" className="editorial-page start-page">
        <section className="page-hero start-intro">
          <p className="eyebrow"><span /> START A PROJECT / FIRST CONVERSATION</p>
          <h1>Tell us what<br /><em>you’re imagining.</em></h1>
          <p>Give us enough context to understand the idea. Nothing is sent until you review the brief and choose to send the email draft.</p>
        </section>

        <section className="brief-panel glass-card" aria-labelledby="brief-title">
          <div className="brief-topline">
            <div><span className="card-number">N / PROJECT ENQUIRY</span><h2 id="brief-title">{stepNames[step]}</h2></div>
            <span className="brief-step-count">0{step + 1} / 0{stepNames.length}</span>
          </div>
          <div className="brief-progress" role="progressbar" aria-label="Project enquiry progress" aria-valuemin={1} aria-valuemax={stepNames.length} aria-valuenow={step + 1}>
            <span style={{ width: `${((step + 1) / stepNames.length) * 100}%` }} />
          </div>
          <div className="brief-step-list" aria-label="Enquiry steps">
            {stepNames.map((name, index) => <span className={index === step ? 'is-current' : index < step ? 'is-complete' : ''} key={name}>{name}</span>)}
          </div>

          <form className="brief-form" onSubmit={handleSubmit}>
            {step === 0 && (
              <fieldset>
                <legend>What kind of project are you exploring?</legend>
                <p className="field-hint">Choose the closest starting point. We can refine the scope together.</p>
                <div className="project-type-grid">
                  {projectTypes.map((type, index) => (
                    <label className={`project-type-option${brief.projectType === type ? ' is-selected' : ''}`} key={type}>
                      <input type="radio" name="projectType" value={type} required checked={brief.projectType === type} onChange={() => updateField('projectType', type)} />
                      <span>0{index + 1}</span><strong>{type}</strong>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 1 && (
              <fieldset>
                <legend>Give us the shape of the idea.</legend>
                <p className="field-hint">A few sentences are enough for a first conversation.</p>
                <label htmlFor="brief-idea">What are you hoping to make? <span>Required</span></label>
                <textarea id="brief-idea" value={brief.idea} onChange={(event) => updateField('idea', event.target.value)} minLength={20} required rows={5} placeholder="The story, the audience, the feeling—or the question you need help solving…" />
                <label htmlFor="brief-references">Reference links <span>Optional</span></label>
                <input id="brief-references" type="url" value={brief.references} onChange={(event) => updateField('references', event.target.value)} placeholder="https://…" />
                <label htmlFor="brief-ip">Existing IP, characters or world <span>Optional</span></label>
                <input id="brief-ip" value={brief.existingIp} onChange={(event) => updateField('existingIp', event.target.value)} placeholder="Tell us what already exists" />
                <label htmlFor="brief-tone">Tone or visual direction <span>Optional</span></label>
                <input id="brief-tone" value={brief.tone} onChange={(event) => updateField('tone', event.target.value)} placeholder="A few words to help set the atmosphere" />
              </fieldset>
            )}

            {step === 2 && (
              <fieldset>
                <legend>Set the scope and timing.</legend>
                <p className="field-hint">These are starting points, not a quote or a commitment.</p>
                <label htmlFor="brief-formats">Formats or intended use <span>Optional</span></label>
                <input id="brief-formats" value={brief.formats} onChange={(event) => updateField('formats', event.target.value)} placeholder="Print, digital, short film, pitch deck…" />
                <label htmlFor="brief-volume">Approximate volume <span>Optional</span></label>
                <input id="brief-volume" value={brief.volume} onChange={(event) => updateField('volume', event.target.value)} placeholder="Pages, characters, scenes, minutes…" />
                <div className="brief-field-grid">
                  <div><label htmlFor="brief-deadline">Target timeline <span>Optional</span></label><select id="brief-deadline" value={brief.deadline} onChange={(event) => updateField('deadline', event.target.value)}><option value="">Not decided</option><option>As soon as practical</option><option>Within 1–3 months</option><option>Within 3–6 months</option><option>Flexible</option></select></div>
                  <div><label htmlFor="brief-budget">Budget range <span>Optional</span></label><input id="brief-budget" value={brief.budget} onChange={(event) => updateField('budget', event.target.value)} placeholder="Share a range, or prefer to discuss" /></div>
                </div>
                <label className="check-option"><input type="checkbox" checked={brief.nda} onChange={(event) => updateField('nda', event.target.checked)} /><span>An NDA may be needed before sharing confidential materials.</span></label>
              </fieldset>
            )}

            {step === 3 && (
              <fieldset>
                <legend>Who should we reply to?</legend>
                <p className="field-hint">We’ll use these details only to follow up about this enquiry.</p>
                <div className="brief-field-grid">
                  <div><label htmlFor="brief-name">Name <span>Required</span></label><input id="brief-name" autoComplete="name" value={brief.name} onChange={(event) => updateField('name', event.target.value)} required /></div>
                  <div><label htmlFor="brief-email">Email <span>Required</span></label><input id="brief-email" type="email" autoComplete="email" value={brief.email} onChange={(event) => updateField('email', event.target.value)} required /></div>
                  <div><label htmlFor="brief-company">Company <span>Optional</span></label><input id="brief-company" autoComplete="organization" value={brief.company} onChange={(event) => updateField('company', event.target.value)} /></div>
                  <div><label htmlFor="brief-country">Country / region <span>Optional</span></label><input id="brief-country" autoComplete="country-name" value={brief.country} onChange={(event) => updateField('country', event.target.value)} /></div>
                </div>
                <label htmlFor="brief-contact">Preferred contact method</label>
                <select id="brief-contact" value={brief.contact} onChange={(event) => updateField('contact', event.target.value)}><option>Email</option><option>Video call after email</option></select>
              </fieldset>
            )}

            {step === 4 && (
              <fieldset>
                <legend>Review before you send.</legend>
                <p className="field-hint">The next button opens a draft in your email app. Nothing is sent automatically.</p>
                <dl className="brief-review">
                  <div><dt>Project</dt><dd>{brief.projectType}</dd></div>
                  <div><dt>Idea</dt><dd>{brief.idea}</dd></div>
                  <div><dt>Scope</dt><dd>{brief.formats || 'To discuss'} · {brief.volume || 'Volume not set'}</dd></div>
                  <div><dt>Timing / budget</dt><dd>{brief.deadline || 'Flexible'} · {brief.budget || 'To discuss'}</dd></div>
                  <div><dt>Contact</dt><dd>{brief.name} · {brief.email}</dd></div>
                  <div><dt>NDA</dt><dd>{brief.nda ? 'May be needed' : 'Not requested yet'}</dd></div>
                </dl>
                <label className="check-option"><input type="checkbox" checked={brief.consent} onChange={(event) => updateField('consent', event.target.checked)} required /><span>I agree that Nartstudio may use these details to respond to this project enquiry.</span></label>
                {draftOpened && <p className="form-message success" role="status">Your email app should have opened a draft. Send it there when you’re ready; if it did not open, email hello@nartstudio.com with your project details.</p>}
              </fieldset>
            )}

            <div className="brief-controls">
              <button className="button-pill button-pill--ghost" type="button" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>Back</button>
              <button className="button-pill button-pill--light" type="submit">{step === stepNames.length - 1 ? 'Open email draft' : 'Continue'} <span aria-hidden="true">↗</span></button>
            </div>
          </form>
          <p className="form-privacy-note">This draft is created in your email app; it is not stored in a web database. Please do not include sensitive or confidential files here.</p>
        </section>
      </main>
    </SiteLayout>
  )
}
