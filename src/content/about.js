// /about long-form copy (CLONE_SPEC_PAGES 1). ORIGINAL placeholder text sized to the spec's word counts.
// Inline markup: [label](href), `code`, **bold** (see src/components/RichText.jsx).

export const headline = ['Built by a studio', 'that signs a lot.'] // verbatim

// Lead sentence (16w, 2 links) + muted continuation (27w)
export const intro = {
  lead: 'Terms is an independent, open-source project from [Family Office](https://familyoffice.is), a design studio run by [Diego Segura](https://diegosegura.me).',
  rest: 'We trade agreements with clients every week, and we wanted a calmer way to write, discuss and sign them without leaving the browser or paying per envelope.',
}

// Lead sentence (15w) + muted continuation (41w, 1 link)
export const safety = {
  lead: 'Terms is a side project run by a small team, and nobody has audited it.',
  rest: 'If you plan to rely on it for something important, we encourage you to [investigate the source code](https://github.com/diego-segura/terms2) for yourself first. The table below lists each outside service the app depends on and describes exactly what data it handles for us.',
}

export const tableHead = ['Area', 'What we do'] // verbatim

// Row labels verbatim; cell text is placeholder sized to the spec's word counts.
export const rows = [
  {
    label: 'Hosting',
    body: 'The web app and its API run on [Vercel](https://vercel.com), served over HTTPS from their managed edge network.',
  },
  {
    label: 'Database',
    body: 'Contracts, comments, signatures and account records live in a Postgres database hosted by [Neon](https://neon.tech). Data is encrypted at rest, and daily backups follow the provider’s standard retention schedule.',
  },
  {
    label: 'Access',
    body: 'Sign-in is handled by [Clerk](https://clerk.com), which stores your email address, session details and any linked Google identity. We never see or keep your password. People you send a contract to can open it through a private link without creating an account, and they only reach the documents that were shared with them. Workspace owners decide who else can view, edit or send each agreement, and can revoke it anytime.',
  },
  {
    label: 'Signing',
    body: 'Each signature is recorded with the signer’s full typed name, email address, timestamp and IP address. Once the last party signs, the document is locked and a certificate of completion with the full audit trail is attached to it.',
  },
  {
    label: 'AI drafting',
    body: 'When you use the drafting or question features, the relevant contract text and your prompt are sent to [Anthropic](https://anthropic.com) to generate a response. We use their commercial API, under which inputs are not used to train models, and requests are kept only as long as their published policies require for abuse and safety review. Uploaded reference files and attachments are processed the same way. Our [Privacy Policy](/privacy) explains retention and deletion in more detail, and the [API reference](/docs) documents what connected agents can read or change on your behalf.',
  },
  {
    label: 'Email',
    body: 'Signing requests, reminders and completion notices are delivered through [Resend](https://resend.com). Messages contain a secure link rather than the document, and replies to those emails can be routed back into the contract thread.',
  },
  {
    label: 'Payments',
    body: 'Paid plans are billed through [Stripe](https://stripe.com). Card details go to them and never touch our servers.',
  },
]
