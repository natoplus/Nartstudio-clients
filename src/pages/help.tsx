import Head from 'next/head'
import Link from 'next/link'
import SiteLayout from '../components/SiteLayout'

const supportTopics = [
  ['Access & sign-in', 'Trouble requesting or opening a secure sign-in link.'],
  ['Project information', 'Questions about a brief, milestone, deliverable or review.'],
  ['Files & feedback', 'Help sharing feedback or locating a project file.'],
]

export default function ClientHelpPage() {
  return (
    <SiteLayout>
      <Head>
        <title>Client support | Nartstudio</title>
        <meta name="description" content="Get help with Nartstudio client portal access and project communication." />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <main id="main-content" className="help-page">
        <section className="page-hero">
          <p className="eyebrow"><span /> CLIENT SUPPORT</p>
          <h1>A real person,<br /><em>when you need one.</em></h1>
          <p>For access issues, project questions or delivery coordination, contact your studio lead. Including your project name and the email used for your account helps us route the request.</p>
          <a className="primary-link" href="mailto:hello@nartstudio.com?subject=Client%20portal%20support&body=Project%20name%3A%0AAccount%20email%3A%0AHow%20we%20can%20help%3A">
            Email client support <span aria-hidden="true">↗</span>
          </a>
        </section>
        <section className="support-topics">
          <div className="section-heading">
            <p className="eyebrow">SUPPORT ROUTING</p>
            <h2>What can we help with?</h2>
          </div>
          {supportTopics.map(([title, detail], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{title}</h3><p>{detail}</p></div>
              <a href={`mailto:hello@nartstudio.com?subject=${encodeURIComponent(`Client support: ${title}`)}`} aria-label={`Email about ${title}`}>↗</a>
            </article>
          ))}
        </section>
        <div className="help-back"><Link href="/">Return to client access <span aria-hidden="true">↗</span></Link></div>
      </main>
    </SiteLayout>
  )
}
