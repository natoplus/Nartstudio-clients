import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SiteLayout from '../components/SiteLayout'
import { supabase } from '../lib/supabase'

type AccessState = 'checking' | 'signed-in' | 'signed-out' | 'unavailable'

export default function ClientDashboardPage() {
  const router = useRouter()
  const [access, setAccess] = useState<AccessState>('checking')
  const [email, setEmail] = useState('')
  const [signingOut, setSigningOut] = useState(false)
  const [signOutError, setSignOutError] = useState('')

  useEffect(() => {
    const client = supabase
    if (!client) {
      setAccess('unavailable')
      return
    }

    let active = true
    const loadSession = async () => {
      const { data, error } = await client.auth.getSession()
      if (!active) return
      if (error) {
        console.error('Client portal session lookup failed:', error)
        setAccess('unavailable')
        return
      }
      if (!data.session) {
        setAccess('signed-out')
        return
      }
      setEmail(data.session.user.email ?? '')
      setAccess('signed-in')
    }

    void loadSession()
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      if (!active) return
      if (!session) {
        setAccess('signed-out')
        return
      }
      setEmail(session.user.email ?? '')
      setAccess('signed-in')
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    if (!supabase) return
    setSigningOut(true)
    setSignOutError('')
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Client portal sign-out failed:', error)
      setSignOutError('We could not end this session. Please try again or close this browser window.')
      setSigningOut(false)
      return
    }
    await router.replace('/')
  }

  return (
    <SiteLayout>
      <Head>
        <title>Workspace | Nartstudio Clients</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <main id="main-content" className="workspace-page">
        <div className="workspace-heading">
          <div>
            <p className="eyebrow"><span /> NARTSTUDIO / CLIENTS</p>
            <h1>Your project<br /><em>workspace.</em></h1>
          </div>
          {access === 'signed-in' && (
            <div className="sign-out-wrap">
              <button className="sign-out" type="button" onClick={signOut} disabled={signingOut}>
                {signingOut ? 'Signing out…' : 'Sign out'}
              </button>
              {signOutError && <p className="form-message error" role="alert">{signOutError}</p>}
            </div>
          )}
        </div>

        {access === 'checking' && <div className="notice" role="status">Checking your secure session…</div>}
        {access === 'signed-out' && (
          <div className="notice notice-warning">
            <strong>Sign-in required</strong>
            <p>Use your invited client email to access the workspace.</p>
            <Link href="/">Continue to secure access <span aria-hidden="true">↗</span></Link>
          </div>
        )}
        {access === 'unavailable' && (
          <div className="notice notice-warning" role="alert">
            <strong>Workspace sign-in is unavailable</strong>
            <p>Supabase authentication is not configured for this deployment. Contact the studio if you need current project information.</p>
          </div>
        )}
        {access === 'signed-in' && (
          <>
            <section className="workspace-welcome">
              <p className="eyebrow">SIGNED IN AS</p>
              <h2>{email}</h2>
              <p>Your identity is verified. Project-specific records and review tools are not yet connected to this workspace, so no project details are shown here.</p>
            </section>
            <section className="workspace-grid" aria-label="Workspace services">
              <article className="workspace-tile">
                <span>01 / PROJECT OVERVIEW</span>
                <h2>Project records</h2>
                <p>Project status, milestones and shared files will appear here once the client workspace data service is connected.</p>
                <b className="service-state">NOT CONNECTED</b>
              </article>
              <article className="workspace-tile">
                <span>02 / REVIEW & FEEDBACK</span>
                <h2>Creative reviews</h2>
                <p>Review links and feedback history are not available in this initial portal setup.</p>
                <b className="service-state">NOT CONNECTED</b>
              </article>
            </section>
            <p className="workspace-support">Need an update now? <a href="mailto:hello@nartstudio.com?subject=Project%20workspace%20support">Contact your studio lead</a>.</p>
          </>
        )}
      </main>
    </SiteLayout>
  )
}
