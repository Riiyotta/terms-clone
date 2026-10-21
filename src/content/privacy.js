// /privacy content (CLONE_SPEC_PAGES 5). Section ids and titles are verbatim; ALL body text is ORIGINAL
// placeholder copy sized to the spec's paragraph/list counts and word counts. It is not legal advice and
// must be replaced with the operator's real policy. Bracketed values like [Operator legal name] are placeholders.
// Inline markup: [label](href), `code`, **bold**. Block types: p, ul.

export const privacy = {
  title: 'Privacy Policy',
  updated: { label: '25 September 2026', iso: '2026-09-25' },
  intro:
    'This policy describes the information Terms collects when you use the service, where that information comes from, and the ways we use, share and protect it.',
  sections: [
    {
      id: 'scope',
      title: 'Who we are and what this policy covers',
      blocks: [
        { type: 'p', text: 'Terms is operated by **[Operator legal name]**, an independent design studio. In this policy, “we”, “us” and “our” refer to that operator. The policy applies to the Terms website, the web application, our emails, the connector API and any other place that links to it, whether you hold an account or simply open a contract someone shared with you.' },
        { type: 'p', text: 'For most of the personal information described here, we act as the controller, meaning we decide why and how it is processed. When a business uses Terms to prepare and send its own agreements, that business decides what goes into those documents and who receives them, and in that situation we process the contract contents on its behalf. If you have a question about a contract you received, the sender is usually the best first contact.' },
        { type: 'p', text: 'This policy should be read together with our [Terms of Service](/terms). If anything here is unclear or seems incomplete, write to [support@terms.so](mailto:support@terms.so) and we will gladly explain.' },
      ],
    },
    {
      id: 'information-collected',
      title: 'Information we collect and its sources',
      blocks: [
        {
          type: 'ul',
          items: [
            '**Account details.** When you create an account we receive your name, email address and, if you choose to sign in with Google, the basic profile information Google shares with us. Our authentication provider also keeps session records so you stay signed in across visits.',
            '**Contract content.** The text of drafts and agreements you write, edit, upload or receive, together with titles, version history, attachments and any reference documents you add to help with drafting.',
            '**Comments and messages.** Inline comments, replies, reactions, chat messages with the assistant and the notes that accompany a revision when it is sent to the other parties.',
            '**Signer information.** Names, email addresses, companies and titles entered for each signer, the typed signature itself, and the time, IP address and browser details recorded when a signature is applied to a document.',
            '**Billing information.** If you subscribe to a paid plan, our payment processor collects your card details and billing address. We only receive the plan, status and partial card details.',
            '**Usage information.** Pages and features you use, the number of AI tokens consumed, error reports and similar technical data such as device type, browser version and approximate location derived from your IP address. We use this to keep the service working.',
            '**Connector and email activity.** Requests made with your API keys, including the endpoint, time and result, and messages you send to or receive from the Terms email agent, including any attachments those messages carry with them.',
            '**Information from others.** People who send you a contract provide your name and email address so that you can be invited to review or sign. A teammate may also add you to a shared workspace, which gives us your email address before you have ever signed in.',
          ],
        },
        { type: 'p', text: 'Most of this information comes directly from you or from the people you work with. Technical information is collected automatically as you use the service. We do not buy personal information from data brokers, and we do not combine your information with outside marketing lists or advertising profiles of any kind.' },
        { type: 'p', text: 'You can use some parts of Terms without giving us much at all. Opening a shared contract to read it, for example, only requires the link and records little beyond basic access logs.' },
      ],
    },
    {
      id: 'uses',
      title: 'How we use information',
      blocks: [
        {
          type: 'ul',
          items: [
            'To provide, maintain and improve the service you use.',
            'To deliver contracts to the people you choose and to record their comments, approvals, signatures and the related audit trail.',
            'To generate drafts, edits, summaries and answers when you choose to use the AI features.',
            'To send account notices, signing requests, reminders, receipts and important service updates by email.',
            'To process payments and manage your subscription plan and invoices.',
            'To detect, investigate and prevent abuse, spam, fraud, security incidents and technical failures across the service.',
            'To comply with legal obligations, respond to lawful requests from authorities, and enforce our agreements with you and others.',
          ],
        },
        { type: 'p', text: 'We do not sell personal information, use contract contents for advertising, or allow our providers to train their general models on the documents you create.' },
      ],
    },
    {
      id: 'ai',
      title: 'AI processing and uploaded files',
      blocks: [
        { type: 'p', text: 'When you ask the assistant to draft, revise or answer a question, we send the relevant contract text, your prompt, recent conversation history and any reference files you selected to our AI provider. The provider returns a response, which we display and store alongside the contract. We only send what is needed for the request in front of it, rather than your whole account or unrelated documents.' },
        { type: 'p', text: 'Our AI provider processes these requests under commercial terms that prohibit using the content to train its models. It may keep inputs and outputs for a limited period to monitor for abuse and to meet its own legal duties, after which they are deleted according to its published retention schedule. We review these terms whenever the provider updates them.' },
        { type: 'p', text: 'Files you upload, such as PDFs of existing agreements, are converted to text so they can be searched, quoted and edited. The original file is stored with the contract it belongs to. If you remove an attachment, it stops being available to the assistant immediately, and the stored copy is deleted on the schedule described in the retention section.' },
        { type: 'p', text: 'AI output can be wrong or incomplete. You remain responsible for reviewing anything the assistant writes before you send or sign it, and you should avoid uploading information that is not needed for the task, such as unrelated personal records, health details, identity documents or financial account numbers that the contract does not require.' },
      ],
    },
    {
      id: 'sharing',
      title: 'Who receives information',
      blocks: [
        { type: 'p', text: 'We share personal information only as described below, and only as much as each purpose requires.' },
        {
          type: 'ul',
          items: [
            '**People you invite.** Counterparties and teammates see the contracts, comments and signer details you share with them.',
            '**Service providers.** Companies that host, store, email, authenticate or bill on our behalf.',
            '**AI provider.** For the assistant features described above.',
            '**Connected services.** Agents and tools you authorize with a key.',
            '**Professional advisers.** Lawyers, accountants and auditors bound by confidentiality, when we need their advice.',
            '**Authorities, when legally required.**',
          ],
        },
        { type: 'p', text: 'Our providers may only use the information to perform services for us and must protect it with safeguards at least as strong as our own. A current list of the main providers and what each one handles appears on our About page.' },
        { type: 'p', text: 'If we are involved in a merger, acquisition or sale of assets, personal information may be transferred as part of that transaction. We will tell you before your information becomes subject to a different privacy policy, and you will be able to delete your account first if you prefer.' },
        { type: 'p', text: 'We may disclose information when we believe in good faith that it is required by law, regulation or a valid legal process, or when it is necessary to protect the rights, property or safety of our users, the public or ourselves. Where the law allows, we will notify affected users before responding to a request for their information and will push back on requests that appear overly broad.' },
      ],
    },
    {
      id: 'email-and-links',
      title: 'Signing links, notifications, and the email agent',
      blocks: [
        { type: 'p', text: 'Each contract you send gets a private signing link. Anyone who has the link can open the contract, so treat it like a password and only forward it to people who are meant to review or sign the document.' },
        { type: 'p', text: 'We send email on your behalf when you share a contract, when someone comments, when a signature is due and when a document is completed. These messages include the sender’s name, the contract title and a link, but not the full contract text. We record whether messages were delivered so we can show the status in your dashboard and retry when a delivery fails. You can adjust most notification settings from your account.' },
        { type: 'p', text: 'If you write to the Terms email agent, we read the message and any attachments to create a draft or comment as you asked, then keep the message with that contract.' },
      ],
    },
    {
      id: 'integrations',
      title: 'Services you connect or authorize',
      blocks: [
        { type: 'p', text: 'You can connect outside agents and tools to Terms using API keys. When you create a key, you choose how long it lasts, and you can revoke it whenever you like. A connected service can only reach the contracts and drafts your account can reach, and only through the endpoints we publish.' },
        { type: 'p', text: 'Information a connected service retrieves from Terms is handled under that service’s own terms and privacy policy, not this one. Before you authorize an agent, make sure you understand what it will do with your contracts and who operates it. We log each request made with your keys, including the time, endpoint and outcome, so you can review activity and spot anything you did not expect. If we notice a key being used in a way that looks abusive or unsafe, we may suspend it and let you know. Revoking a key stops future requests but does not recall information already retrieved.' },
        { type: 'p', text: 'Signing in with Google is optional. If you use it, Google tells us your name, email address and profile picture, and confirms that you control the account, and we do not receive your Google password or access to your mail, files or calendar. Our authentication provider stores the connection so you can sign in again quickly. You can disconnect Google from your account settings at any time, after which you will sign in with an emailed code instead. Information we receive from Google is used only to identify you and keep your account secure, and we do not share it with advertisers or use it to build profiles. If you remove Terms from your Google account permissions, we will stop receiving any further updates from Google about your profile.' },
        { type: 'p', text: 'We may add new integrations over time. Each one will explain what it accesses before you turn it on, and none will be enabled without your action. If a future integration needs information beyond what this policy describes, we will update the policy before it becomes available.' },
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies, browser storage, and analytics',
      blocks: [
        { type: 'p', text: 'Terms uses a small number of cookies and browser storage entries that are needed for the service to work. They keep you signed in, protect forms against cross-site request forgery, remember interface preferences such as panel sizes, and hold unsent drafts locally so a refresh does not lose your work.' },
        { type: 'p', text: 'We also collect privacy-friendly analytics to understand which features are used and where people run into trouble. These measurements are aggregated, do not follow you across other websites and are not used to build advertising profiles. We look at counts such as page views and completed signatures. Where the law requires consent for analytics, we ask before collecting it, and you can change your choice later. Blocking these analytics does not affect how Terms works for you in any way.' },
        { type: 'p', text: 'We do not use third-party advertising cookies, social media pixels or cross-site tracking technologies. If you block all cookies in your browser, you will not be able to sign in, but you can still open shared signing links in most cases. Clearing your browser storage removes any locally saved preferences and unsent drafts, so make sure your work is saved before you do it.' },
      ],
    },
    {
      id: 'retention',
      title: 'Retention, deletion, and document records',
      blocks: [
        { type: 'p', text: 'We keep personal information for as long as it is needed for the purposes described in this policy, unless the law requires or allows a longer period. Signed agreements are a special case, because their value depends on an intact record, so the rules below treat them differently from drafts and from general account information.' },
        {
          type: 'ul',
          items: [
            '**Drafts and unsent contracts.** These stay in your account until you delete them. Deleted drafts move to a removed list, where you can restore them for a short period, after which they are permanently erased along with their comments, chat history and attachments. Backups containing them expire within the normal backup cycle.',
            '**Signed agreements.** Once every party has signed, the document, its certificate and audit trail are locked and kept so each party can rely on them. Deleting a signed agreement removes it from your dashboard, but copies remain available to the other parties who signed it, as they are entitled to their own record.',
            '**Account information.** We keep your account details while your account is open. When you close it, we delete or anonymize this information within a reasonable period, except where we must keep certain records.',
            '**Billing records.** Invoices, receipts and payment records are kept for as long as tax and accounting rules in the relevant countries require, which is usually several years.',
            '**Logs and analytics.** Technical logs are kept for a limited time, typically a few weeks, to investigate problems and abuse, then deleted. Aggregated analytics that no longer identify anyone may be kept longer.',
          ],
        },
        { type: 'p', text: 'If you would like something deleted sooner than these periods allow, contact us. We will do our best to help, though we may need to keep certain information when the law requires it or when another party has a legitimate need for a signed record.' },
      ],
    },
    {
      id: 'security',
      title: 'Security',
      blocks: [
        { type: 'p', text: 'We protect information with encryption in transit and at rest, restricted access for staff, separate production environments and regular review of our providers. Signing links use long random tokens, and completed documents are sealed so later changes can be detected.' },
        { type: 'p', text: 'No system is perfectly secure. If we learn of a breach that affects your personal information, we will notify you and the relevant authorities as the law requires, without undue delay.' },
      ],
    },
    {
      id: 'international',
      title: 'International processing and legal bases',
      blocks: [
        { type: 'p', text: 'Terms is run from [Operator country], and our providers operate data centres in several regions, including the United States and the European Union. Your information may therefore be processed outside the country where you live. When we transfer personal information from places with transfer restrictions, we rely on recognised mechanisms such as standard contractual clauses or adequacy decisions, and we expect our providers to do the same.' },
        { type: 'p', text: 'Where data protection laws require a legal basis for processing, we rely on the following. Performing our contract with you covers running your account, delivering documents and providing the AI features you request. Our legitimate interests cover keeping the service secure, understanding how it is used and improving it, balanced against your rights. Legal obligations cover tax records and lawful requests. Consent covers optional analytics where the law requires it.' },
        { type: 'p', text: 'When we process contract contents on behalf of a business customer, that customer is responsible for having a legal basis to share the information with us and with the people it sends documents to through the service, and for answering questions from those people about how it uses their information.' },
      ],
    },
    {
      id: 'rights',
      title: 'Your choices and privacy requests',
      blocks: [
        { type: 'p', text: 'You can review and update most account information directly in Terms. You can also export contracts, delete drafts, revoke API keys, disconnect Google and change notification settings without contacting us, and close your account from settings.' },
        { type: 'p', text: 'Depending on where you live, you may have the right to ask for access to the personal information we hold about you, to correct it, to delete it, to receive a portable copy, to restrict or object to certain processing, and to withdraw consent you have given. These rights have limits; for example, we cannot remove your signature from an agreement other parties rely on.' },
        { type: 'p', text: 'To make a request, email us from the address associated with your account, or explain how you are connected to the information if you do not have an account. We may need to confirm your identity before acting, and we will answer within the time the law allows, usually one month. If the request concerns contract contents controlled by a business customer, we may forward it to that customer and help them respond.' },
        { type: 'p', text: 'You also have the right to complain to a data protection authority, in particular in the country where you live or work, or where you believe a problem occurred. We would appreciate the chance to address your concern first, so please contact us before going to the authority, but you are not required to do so. We will acknowledge your concern quickly and explain what we can do about it.' },
      ],
    },
    {
      id: 'us-privacy',
      title: 'Additional information for US residents',
      blocks: [
        { type: 'p', text: 'Several US states give their residents specific privacy rights. In the past twelve months we have collected the categories of personal information described in this policy, including identifiers, commercial information, internet activity, approximate location and the contents of documents and messages. We collected them from the sources described above, for the business purposes listed in the section on how we use information.' },
        { type: 'p', text: 'We do not sell personal information and do not share it for cross-context behavioural advertising, as those terms are defined in state law. We do not use sensitive personal information to infer characteristics about you. Because we do not sell or share in those senses, we do not offer an opt-out link, but we honour browser privacy signals where applicable.' },
        { type: 'p', text: 'Residents of states with these laws may request access, correction or deletion, and may appoint an authorised agent to make a request for them. We will not treat you differently for exercising these rights, and you can appeal any decision we make by replying to our response. If your appeal is denied, you may contact your state attorney general.' },
      ],
    },
    {
      id: 'children',
      title: 'Children',
      blocks: [
        { type: 'p', text: 'Terms is a business tool and is not directed to children. You must be old enough to form a binding contract where you live to create an account, and in any case at least eighteen. We do not knowingly collect personal information from children. If you believe a child has given us information, please contact [support@terms.so](mailto:support@terms.so) and we will delete it promptly after confirming the request.' },
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      blocks: [
        { type: 'p', text: 'We may update this policy as the service changes or as laws evolve. The date at the top of the page shows when it was last revised. If a change materially affects how we handle your personal information, we will tell you by email or with a notice in the app before it takes effect, and where required we will ask for your consent. Earlier versions are available on request.' },
      ],
    },
    {
      id: 'contact',
      title: 'Contact us',
      blocks: [
        { type: 'p', text: 'For privacy questions or requests, email [support@terms.so](mailto:support@terms.so). You can also write to [Operator legal name] at [Operator postal address]. We read every message and aim to reply within a few business days.' },
      ],
    },
  ],
}
