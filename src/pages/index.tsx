import Head from 'next/head'
import { useState, type FormEvent } from 'react'
import SiteLayout from '../components/SiteLayout'
import { supabase } from '../lib/supabase'

export default function ClientAccessPage() {
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const requestLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!supabase || sending) return

    setSending(true)
    setMessage(null)
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          shouldCreateUser: false,
        },
      })
      if (error) throw error
      setMessage({
        type: 'success',
        text: 'If this address has client access, a secure sign-in link is on its way. You can close this window after checking your email.',
      })
      setEmail('')
    } catch (error) {
      console.error('Client portal sign-in link request failed:', error)
      setMessage({
        type: 'error',
        text: 'We could not send a sign-in link. Check the email address or contact the studio for help.',
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <SiteLayout>
      <Head>
        <title>Client access | Nartstudio</title>
        <meta name="description" content="Secure access for Nartstudio clients to review their project workspace." />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <main id="main-content" className="access-page">
        <section className="access-intro">
          <p className="eyebrow"><span /> PRIVATE PROJECT ACCESS</p>
          <h1>A clear space<br /><em>to move work forward.</em></h1>
          <p className="lede">The Nartstudio client workspace is designed for focused project communication, review and next steps. Sign in with the email address connected to your client access.</p>
          <div className="access-assurances" aria-label="Workspace access details">
            <span><b>01</b> Invitation-only access</span>
            <span><b>02</b> Email sign-in link</span>
            <span><b>03</b> Project information stays private</span>
          </div>
        </section>

        <section className="access-card" aria-labelledby="access-title">
          <div className="card-index">N / CLIENT WORKSPACE</div>
          <p className="eyebrow">WELCOME BACK</p>
          <h2 id="access-title">Sign in to your workspace.</h2>
          <p className="card-copy">We’ll email you a one-time sign-in link. No password is required.</p>
          {supabase ? (
            <form onSubmit={requestLink}>
              <label htmlFor="client-email">Work email</label>
              <input
                autoComplete="email"
                id="client-email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                required
              />
              <button type="submit" disabled={sending}>
                {sending ? 'Sending secure link…' : 'Email me a sign-in link'}
                <span aria-hidden="true">↗</span>
              </button>
            </form>
          ) : (
            <div className="notice notice-warning" role="status">
              <strong>Sign-in setup is required</strong>
              <p>The portal needs the public Supabase URL and anon key in its deployment environment before secure access can be enabled.</p>
            </div>
          )}
          {message && <p className={`form-message ${message.type}`} role={message.type === 'error' ? 'alert' : 'status'}>{message.text}</p>}
          <p className="access-help">Need access for the first time? <a href="mailto:hello@nartstudio.com?subject=Client%20portal%20access">Ask your Nartstudio contact</a>.</p>
        </section>
      </main>
      <section className="process-strip" aria-label="How client access works">
        <div><span>01 / REQUEST</span><strong>Use your invited email</strong><p>Only existing client accounts can request a sign-in link.</p></div>
        <div><span>02 / VERIFY</span><strong>Open the one-time link</strong><p>Confirm your identity from the inbox for that address.</p></div>
        <div><span>03 / CONTINUE</span><strong>Return to your workspace</strong><p>Project-specific tools appear as workspace services are connected.</p></div>
      </section>
    </SiteLayout>
  )
}
