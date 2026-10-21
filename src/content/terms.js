// /terms content (CLONE_SPEC_PAGES 5). Section ids and titles are verbatim; ALL body text is ORIGINAL
// placeholder copy sized to the spec's paragraph/list counts and word counts. It is not legal advice and
// must be replaced with the operator's real terms. Bracketed values like [Operator legal name] are placeholders.
// Inline markup: [label](href), `code`, **bold**. Block types: p, ul.

export const terms = {
  title: 'Terms of Service',
  updated: { label: '25 September 2026', iso: '2026-09-25' },
  intro:
    'These terms explain the rules for using Terms, what you can expect from us, and what we expect from you when you create, send or sign documents.',
  sections: [
    {
      id: 'agreement',
      title: 'Your agreement with Terms',
      blocks: [
        { type: 'p', text: 'These Terms of Service form a contract between you and [Operator legal name], the operator of Terms. **By using the service, you agree to these terms.** They cover the website, the web application, our emails, the connector API and any related features we offer. If you do not agree, please do not create an account or use the service to send or sign documents.' },
        { type: 'p', text: 'If you use Terms on behalf of a company or other organisation, you confirm that you are authorised to accept these terms for it, and “you” then refers to that organisation as well as to you personally. Make sure your organisation is comfortable with these terms before you invite colleagues.' },
        { type: 'p', text: 'Our Privacy Policy explains how we handle personal information and forms part of these terms. Some features may come with extra conditions, which we will show you before you use them. If those conditions conflict with these terms, the more specific conditions apply to that feature only.' },
      ],
    },
    {
      id: 'service',
      title: 'What the Service provides',
      blocks: [
        { type: 'p', text: 'Terms is a tool for writing contracts in markdown, sharing them through private links, collecting inline comments and gathering typed electronic signatures. It also offers optional AI features for drafting, editing, summarising and answering questions about documents, plus an API for connected agents.' },
        { type: 'p', text: 'We provide the software and the infrastructure that runs it. We are not a party to the agreements you create, we do not verify the identity of the people who sign them unless a feature says otherwise, and we do not check whether a document is complete, fair or enforceable for your situation.' },
      ],
    },
    {
      id: 'accounts',
      title: 'Accounts, access, and authority',
      blocks: [
        { type: 'p', text: 'You need an account to create and send contracts. Give us accurate information when you sign up, keep your email address current, and protect your sign-in method. You are responsible for activity that happens under your account and through your API keys.' },
        { type: 'p', text: 'Tell us promptly if you believe someone has accessed your account without permission. We may ask you to verify your identity before restoring access or making changes. If you share a workspace with others, the workspace owner controls who can view, edit and send documents, and may remove access when a person leaves the organisation or no longer needs it.' },
        { type: 'p', text: 'When you send a contract for signature, you confirm that you have the authority to do so and that the people you invite are the right signers. We may rely on the instructions you give us without further checks.' },
      ],
    },
    {
      id: 'legal-advice',
      title: 'No legal or professional advice',
      blocks: [
        { type: 'p', text: '**Terms is not a law firm, does not provide legal advice, and nothing in the service, including templates, examples and AI output, creates a lawyer and client relationship or replaces advice from a qualified professional.**' },
        { type: 'p', text: 'Templates and AI suggestions are general starting points. They may not reflect the law where you or your counterparty are located, recent changes in the law, or the particular facts of your arrangement. Using them does not mean we have reviewed or approved your document in any way.' },
        { type: 'p', text: 'For agreements involving significant money, employment, intellectual property, regulated activities or unusual risk, we strongly recommend asking a lawyer to review the document before anyone signs it. You decide what goes into your agreements and whether to rely on them.' },
      ],
    },
    {
      id: 'ai',
      title: 'AI features and your review responsibilities',
      blocks: [
        { type: 'p', text: 'The AI features generate text based on your prompts, the documents you select and recent conversation history. Responses are produced automatically by a third-party model and are not reviewed by a person at Terms before you see them. They can be inaccurate, outdated, incomplete or unsuitable.' },
        { type: 'p', text: 'You must read and check any AI output before you rely on it, include it in a contract, send it to someone or sign a document that contains it. Treat answers about your contracts as a convenient summary that points you to the source, not as a definitive interpretation of what the text means.' },
        { type: 'p', text: 'Your plan includes a monthly allowance of AI tokens. When it runs out, AI features pause until the next period or until you upgrade. We may adjust how the allowance is measured, limit unusually heavy use that affects other users, or switch model providers, as long as the overall service you receive stays substantially the same.' },
      ],
    },
    {
      id: 'electronic-signatures',
      title: 'Electronic signatures and records',
      blocks: [
        { type: 'p', text: 'By signing a document through Terms, you agree to do business electronically and to use a typed electronic signature in place of a handwritten one. You agree that your electronic signature is intended to have the same effect as a signature on paper, to the extent the law where you are allows it.' },
        { type: 'p', text: 'Before signing, each signer is shown a notice explaining that the signature is electronic and is asked to acknowledge it. A signer may decline to sign electronically and ask the sender for another method, which the sender may or may not offer.' },
        { type: 'p', text: 'When a signature is applied, we record the signer’s typed name, the email address the invitation was sent to, the date and time, the IP address and basic browser details. Once every signer has signed, the document is locked and a certificate of completion containing this audit trail is attached to it.' },
        { type: 'p', text: 'Each party can download the signed document and its certificate. We keep a copy as described in our Privacy Policy, but you should save your own copy as well, because we do not guarantee to keep records indefinitely or after an account is closed.' },
        { type: 'p', text: 'Some documents cannot be signed electronically, or need extra formalities such as witnessing, notarisation or a qualified electronic signature. Examples in many places include wills, certain property transfers, some court documents and some consumer notices. It is your responsibility to check whether an electronic signature is appropriate for your document and location. We make no promise that a document signed through Terms will be accepted by any particular court, government office or other party, and you should seek advice where the outcome matters.' },
        { type: 'p', text: 'You need a device with a supported browser and an email address to sign. You can ask the sender for a paper copy of any document you signed through Terms.' },
      ],
    },
    {
      id: 'document-workflow',
      title: 'Sending, revisions, and withdrawal',
      blocks: [
        { type: 'p', text: 'When you send a contract, everyone you invite receives a private link and can read the document, add comments and, when it is ready, sign it. Anyone who obtains the link can open the document, so keep links confidential and send them only to the intended recipients. You can resend or change recipients before signing begins.' },
        { type: 'p', text: 'You can send revisions while a contract is still being negotiated. Each revision is recorded with a summary of what changed, and signers are asked to review the new version before signing. Comments on earlier versions stay visible so everyone can follow the discussion.' },
        { type: 'p', text: 'You can withdraw or void a contract before it is fully signed. Voiding stops any further signatures and records that the document was voided, by whom and when. A voided document cannot be revived; send a new one instead. Voiding a document in Terms does not by itself end any legal obligations that may already exist between the parties.' },
      ],
    },
    {
      id: 'content',
      title: 'Your content and the permission to process it',
      blocks: [
        { type: 'p', text: 'You keep ownership of the documents, comments, files and other material you put into Terms. You are responsible for that content and confirm that you have the rights needed to use it, share it with the people you invite and allow us to process it as described in these terms.' },
        { type: 'p', text: 'You give us a worldwide, non-exclusive, royalty-free permission to host, store, copy, convert, display and transmit your content only as needed to run the service for you and the people you share with. This includes sending relevant content to our AI provider when you use AI features, creating backups, and generating the PDFs and certificates you request. The permission lasts while your content is in the service and for the limited time afterwards needed to complete deletion from our systems and backups.' },
        { type: 'p', text: 'We do not use your content to train AI models and do not allow our providers to do so. We may look at content when you ask for support, when it is needed to investigate abuse or security issues, or when the law requires it. Otherwise, staff access to contract contents is restricted.' },
      ],
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable use',
      blocks: [
        { type: 'p', text: 'You must not use Terms to do the following:' },
        {
          type: 'ul',
          items: [
            'Create, send or sign documents that are fraudulent, deceptive or intended to mislead a signer about what they are agreeing to.',
            'Impersonate another person or organisation, or sign on behalf of someone without their authority.',
            'Send unsolicited messages, harass or threaten recipients, or use signing invitations and comments to distribute spam, malware or phishing links.',
            'Upload content that infringes someone else’s rights, violates privacy laws, or that you are not permitted to share with us or your recipients.',
            'Attempt to gain unauthorised access to accounts, documents or systems, probe or test our security without permission, or interfere with the normal operation of the service for others.',
            'Scrape the service, overload it with automated requests, resell access without permission, or deliberately exceed published API rate limits.',
          ],
        },
        { type: 'p', text: 'We may remove content, pause features or suspend accounts that break these rules, and we may report illegal activity to the relevant authorities. Where it is reasonable to do so, we will tell you what happened and give you a chance to respond first.' },
      ],
    },
    {
      id: 'subscriptions',
      title: 'Plans, billing, renewal, and cancellation',
      blocks: [
        { type: 'p', text: 'Writing, sending, commenting and signing are free. Paid plans increase the monthly AI allowance and are described on our pricing page. Prices are shown before you subscribe and may exclude taxes, which are added at checkout where they apply. Payments are handled by our payment processor under its own terms, and we never see or store your full card number.' },
        { type: 'p', text: '**Paid plans renew automatically each month until you cancel from your account settings.** We charge the card on file at the start of each billing period. If a payment fails, we may retry it, downgrade you to the free plan or pause paid features until the balance is settled. Changing to a higher plan takes effect immediately, and we charge a prorated amount for the rest of the current period. Changing to a lower plan takes effect at the next renewal.' },
        { type: 'p', text: 'You can cancel at any time. Cancellation stops future renewals, and you keep paid features until the end of the period you have already paid for. Unused AI allowance does not roll over between periods and has no cash value. Your contracts remain available on the free plan after a paid plan ends.' },
        { type: 'p', text: 'Except where the law requires otherwise, payments are not refundable, including for partial periods. If you believe you were charged in error, contact us within thirty days and we will review it. Nothing in these terms limits any refund rights you have as a consumer under local law.' },
        { type: 'p', text: 'We may change plan prices or allowances. We will give you at least thirty days’ notice by email before a price increase affects your subscription, and the change will apply from your next renewal after that notice. If you do not agree, you can cancel before the new price starts.' },
      ],
    },
    {
      id: 'third-parties',
      title: 'Email agents, integrations, and third parties',
      blocks: [
        { type: 'p', text: 'The Terms email agent lets you create drafts and comments by email. Messages you send to it are processed automatically, so check the result in the app before relying on it or sending anything on.' },
        { type: 'p', text: 'You can connect outside agents and tools using API keys. A connected service acts on your instructions and can reach whatever your account can reach through our API. You are responsible for choosing services you trust, for the actions they take with your keys, and for revoking keys you no longer need. We do not control third-party services or how they handle information they retrieve from Terms. Changes made by a connected agent are recorded like any other change and remain your responsibility once you send them.' },
        { type: 'p', text: 'The service relies on third-party providers for hosting, storage, authentication, email, payments and AI. If a provider has an outage or changes its offering, parts of Terms may be affected. We will try to keep any disruption short and to let you know.' },
      ],
    },
    {
      id: 'our-property',
      title: 'Our intellectual property and feedback',
      blocks: [
        { type: 'p', text: 'Apart from your content, the service, including its design, software, templates, text and logos, belongs to us or our licensors. Parts of the source code are published under an open-source licence, and your use of that code is governed by that licence. These terms do not give you any other rights in our brand or service.' },
        { type: 'p', text: 'If you send us ideas, suggestions or feedback, we may use them freely to improve Terms without paying you or giving credit. We appreciate it, but please do not send feedback you want to keep confidential or that belongs to someone else.' },
      ],
    },
    {
      id: 'availability',
      title: 'Availability and changes to the Service',
      blocks: [
        { type: 'p', text: 'We work to keep Terms available and reliable, but we do not promise that it will be uninterrupted or error-free. We may need to pause the service for maintenance, upgrades or security reasons, and we will try to schedule planned work at quiet times and announce longer interruptions in advance.' },
        { type: 'p', text: 'Terms is still evolving. We may add, change or remove features over time. If we remove a significant feature you pay for, we will give reasonable notice and, where appropriate, a prorated refund. We will always give you a way to export your signed documents before we discontinue the service as a whole.' },
      ],
    },
    {
      id: 'termination',
      title: 'Suspension, termination, and account closure',
      blocks: [
        { type: 'p', text: 'You can close your account at any time from settings. Before you do, download any documents you want to keep, because closing your account removes your access to them and starts the deletion process described in our Privacy Policy.' },
        { type: 'p', text: 'We may suspend or close your account if you seriously or repeatedly break these terms, if we are required to by law, if your use creates a risk to other users or to the service, or if your account has been inactive for a long period. Where it is reasonable and lawful, we will give you notice and an opportunity to fix the problem first' },
        { type: 'p', text: 'When an account is closed, documents that other parties have signed remain available to those parties, because they are entitled to their own record of the agreement. Sections of these terms that by their nature should continue, such as those on content permissions, disclaimers, limits of liability, indemnity and disputes, continue to apply after closure.' },
      ],
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers',
      blocks: [
        { type: 'p', text: '**To the fullest extent the law allows, the service is provided “as is” and “as available”, without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose, title and non-infringement, and any warranties arising from course of dealing.**' },
        { type: 'p', text: 'We do not warrant that the service will meet your needs, that documents created with it will be legally valid or enforceable, that AI output will be accurate, or that the service will be free of errors, viruses or interruptions. You use the service and rely on its output at your own discretion and risk, including when you decide to send or sign.' },
        { type: 'p', text: 'Some places do not allow certain warranties to be excluded. In those places, the exclusions above apply only as far as the law permits.' },
      ],
    },
    {
      id: 'liability',
      title: 'Limitation of liability',
      blocks: [
        { type: 'p', text: 'To the fullest extent the law allows, we are not liable for indirect, incidental, special, consequential or punitive damages, or for lost profits, revenue, data, goodwill or business opportunities, arising from or related to your use of the service, even if we were told such damages were possible.' },
        { type: 'p', text: 'Our total liability for all claims relating to the service is **limited to** the greater of the amount you paid us for the service in the twelve months before the event giving rise to the claim, or one hundred US dollars. This limit applies whatever the legal theory, whether contract, tort, negligence, strict liability or otherwise, and even if a remedy fails of its essential purpose.' },
        { type: 'p', text: 'Nothing in these terms limits liability that cannot be limited by law, such as liability for fraud, for death or personal injury caused by negligence, or for gross negligence or wilful misconduct where those exclusions are not permitted. If you are a consumer, you may have additional rights that these terms do not affect.' },
      ],
    },
    {
      id: 'business-indemnity',
      title: 'Responsibility for third-party claims',
      blocks: [
        { type: 'p', text: 'If you use Terms for business purposes, you agree to defend and compensate us, and our employees, contractors and suppliers, against claims, losses, damages, fines and reasonable legal costs brought by a third party that arise from your content, from the documents you send or sign through the service, from your breach of these terms, or from your violation of the law or of someone else’s rights. This includes claims from signers or counterparties about the substance of an agreement you created, and claims about connected services you authorised to act on your behalf.' },
        { type: 'p', text: 'We will tell you promptly about any claim covered by this section, give you reasonable control of its defence and settlement, and cooperate with you at your expense. You may not settle a claim in a way that admits fault on our behalf or imposes obligations on us without our written agreement. This section does not apply to consumers using Terms for personal purposes, to the extent the law does not allow it.' },
      ],
    },
    {
      id: 'disputes',
      title: 'Governing law and disputes',
      blocks: [
        { type: 'p', text: 'These terms are governed by the laws of [Governing jurisdiction], without regard to its conflict of law rules. If a dispute arises, please contact us first so we can try to resolve it informally. Most concerns can be settled quickly that way, and we will make a genuine effort to do so within thirty days of hearing from you before either side starts formal proceedings.' },
        { type: 'p', text: 'If a dispute cannot be resolved informally, it will be decided by the courts located in [Governing jurisdiction], and both parties agree to the jurisdiction of those courts. Either party may still seek urgent relief from any competent court to protect confidential information or intellectual property rights.' },
        { type: 'p', text: 'If you are a consumer, you may also have the right to bring proceedings in the courts where you live, and the mandatory consumer protection laws of your country continue to apply.' },
      ],
    },
    {
      id: 'changes',
      title: 'Changes to these Terms and notices',
      blocks: [
        { type: 'p', text: 'We may update these terms from time to time, for example when we add features, change our pricing or need to reflect new laws. The date at the top of the page shows when they were last revised, and earlier versions are available on request by email to our support team. We will not apply changes retroactively.' },
        { type: 'p', text: 'If a change materially affects your rights or obligations, we will notify you by email or with a notice in the app at least thirty days before it takes effect, unless the change is needed sooner for legal or security reasons. If you keep using Terms after a change takes effect, you accept the updated terms. If you disagree, stop using the service.' },
        { type: 'p', text: 'We will send notices to the email address on your account or show them in the app, and they are effective when sent or displayed. You can send notices to us at the address in the contact section. Notices about legal disputes should also be sent by post to our registered address.' },
      ],
    },
    {
      id: 'general',
      title: 'General provisions',
      blocks: [
        { type: 'p', text: 'These terms, together with the Privacy Policy and any feature-specific conditions, are the entire agreement between you and us about the service. If any part of them is found unenforceable, the rest remains in effect, and the unenforceable part will be applied as closely as possible to its intent.' },
        { type: 'p', text: 'If we do not enforce a right straight away, we have not waived it. You may not transfer your rights or obligations under these terms without our written consent, but we may transfer ours as part of a merger, acquisition or sale of the service, provided the new operator honours these terms. Neither party is responsible for delays caused by events beyond its reasonable control.' },
        { type: 'p', text: 'Nothing in these terms creates a partnership, employment or agency relationship. No one other than you and us has rights under these terms, except where they say otherwise. Headings are for convenience only and do not affect meaning.' },
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      blocks: [
        { type: 'p', text: 'Questions about these terms can be sent to [support@terms.so](mailto:support@terms.so) or by post to [Operator legal name], [Operator postal address]. We aim to reply within a few business days.' },
      ],
    },
  ],
}
