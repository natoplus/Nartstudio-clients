# Nartstudio Clients

A standalone Next.js site for Nartstudio's public studio information and invitation-only client access.

## Local development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The access page and support pages can run without authentication configured. The secure sign-in form requires the same Nartstudio Supabase project used by the main site:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Set these values in the local environment and the client-site deployment environment. Never expose a Supabase service-role key in the browser app. Add the portal's local and production URLs to Supabase Auth's allowed redirect URLs; the magic link returns to `/dashboard`.

The sign-in flow uses email one-time links and does not create new users. Client accounts must already be provisioned. The workspace currently confirms the authenticated session but does not expose project records, files, or reviews; those services need authenticated data APIs and row-level access policies before client data is enabled.

## Current pages

- `/` — public studio homepage
- `/studio`, `/services`, `/work`, `/brands`, `/news`, `/contact`, and `/faq` — public studio pages
- `/start` and `/artists/join` — project and artist enquiry forms; each opens a draft email for review and does not submit or store data on the site
- `/signin` — invitation-only email sign-in
- `/dashboard` — session-aware workspace shell
- `/help` — client support routing via email