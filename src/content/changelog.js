// Changelog content (CLONE_SPEC_PAGES 3). Dates and titles are verbatim; bodies are ORIGINAL placeholder copy.
// Commit SHAs are PLACEHOLDERS (the spec does not record them) - replace with real short SHAs from
// https://github.com/diego-segura/terms2 before shipping, or the links will 404.

export const COMMIT_BASE = 'https://github.com/diego-segura/terms2/commit/'

export const intro = 'New features, fixes and improvements. Updated as we ship. Newest first.'

export const note = 'Dates mark when changes were merged, and every item links to the commits behind it.'

export const releases = [
  {
    "label": "October 5, 2026",
    "date": "2026-10-05",
    "entries": [
      {
        "title": "The homepage previews match the app.",
        "body": "The demos on the homepage now use the same components as the real editor, so what you see before signing up is what you get.",
        "commits": [
          "73816cf"
        ]
      }
    ]
  },
  {
    "label": "October 4, 2026",
    "date": "2026-10-04",
    "entries": [
      {
        "title": "A chat prompt that shows what it is working with.",
        "body": "The chat box now lists the contract, attachments and references it will read, so you know exactly what context goes into each reply.",
        "commits": [
          "9168e2c"
        ]
      },
      {
        "title": "Edit or cancel a queued change.",
        "body": "Messages waiting behind a running request can be edited or removed before they are sent.",
        "commits": [
          "c94f57b"
        ]
      },
      {
        "title": "Terms feels more at home on your phone.",
        "body": "Spacing, tap targets and sheet transitions were tuned for small screens across the dashboard, editor and signing views.",
        "commits": [
          "9a05de0"
        ]
      },
      {
        "title": "A tidier editor chat.",
        "body": "Tool calls and status lines collapse into a single quiet row, leaving more room for the conversation itself.",
        "commits": [
          "4edadb5"
        ]
      },
      {
        "title": "Attached files stay with their message.",
        "body": "Files you drop into a message remain pinned to that message in history instead of floating at the top of the thread.",
        "commits": [
          "ffc0c83"
        ]
      }
    ]
  },
  {
    "label": "October 1, 2026",
    "date": "2026-10-01",
    "entries": [
      {
        "title": "Simplified templates experience.",
        "body": "Templates now open straight into a draft with fewer steps, and the picker groups them by the kind of work they cover.",
        "commits": [
          "ea935fa",
          "aed1661"
        ]
      },
      {
        "title": "Improved Q&A with the AI contract editor.",
        "body": "Answers about a contract quote the relevant clause more reliably and say plainly when the document does not cover a question.",
        "commits": [
          "45ef3fb"
        ]
      },
      {
        "title": "See Terms in action on the homepage.",
        "body": "Three short looping demos on the homepage walk through drafting, asking questions and commenting with a counterparty.",
        "commits": [
          "80eed55"
        ]
      },
      {
        "title": "Claude usage in Analytics.",
        "body": "The analytics view breaks down AI usage by day and by feature, making it easier to see where your allowance goes.",
        "commits": [
          "9e7fc8b"
        ]
      },
      {
        "title": "Edit contract titles right in the preview.",
        "body": "Click the title above any preview to rename the contract without opening the editor.",
        "commits": [
          "8c4eee7"
        ]
      },
      {
        "title": "Simpler comment replies.",
        "body": "Replying to a comment now happens inline in the thread, with one field and one button.",
        "commits": [
          "e0b0c53"
        ]
      },
      {
        "title": "Void a contract without sending an email.",
        "body": "You can void a sent contract quietly when the other side already knows, and the record still notes when and why it happened.",
        "commits": [
          "784db5b"
        ]
      },
      {
        "title": "Less waiting around the app.",
        "body": "Lists, previews and the editor load in parallel and cache what they can, so most pages appear noticeably faster.",
        "commits": [
          "a592ba2",
          "9339b83"
        ]
      }
    ]
  },
  {
    "label": "September 30, 2026",
    "date": "2026-09-30",
    "entries": [
      {
        "title": "Bring your existing agreements into Terms.",
        "body": "Upload signed agreements you already have and keep them searchable next to the contracts you create here.",
        "commits": [
          "2d0a68b",
          "bf197e6",
          "b917f31"
        ]
      },
      {
        "title": "Ask questions with the source at hand.",
        "body": "Every answer links back to the passage it relied on, opening the document scrolled to the right spot.",
        "commits": [
          "ee4f8d1",
          "9b955be",
          "d5487ac"
        ]
      },
      {
        "title": "Pick up a conversation where you left off.",
        "body": "Chat history is saved per contract, so returning to a draft brings back the earlier discussion.",
        "commits": [
          "ed7ce83"
        ]
      },
      {
        "title": "More control over reference documents.",
        "body": "Choose which reference files the assistant should read for a draft, and remove ones that no longer apply.",
        "commits": [
          "1f528d4"
        ]
      },
      {
        "title": "A smoother experience on your phone.",
        "body": "Keyboard handling, scrolling and sticky toolbars behave more predictably on mobile browsers.",
        "commits": [
          "82adb6c"
        ]
      },
      {
        "title": "More natural conversations about your contracts.",
        "body": "The assistant keeps track of earlier turns and follows up without asking you to restate what you already said.",
        "commits": [
          "24f4adc"
        ]
      },
      {
        "title": "A tidier workspace.",
        "body": "Sidebar sections were consolidated and rarely used actions moved into menus to cut visual noise.",
        "commits": [
          "36f97b0"
        ]
      }
    ]
  },
  {
    "label": "September 27, 2026",
    "date": "2026-09-27",
    "entries": [
      {
        "title": "Let your agents work on drafts.",
        "body": "Connected agents can create and revise personal drafts through the API, leaving every change for you to review.",
        "commits": [
          "763e493",
          "8827539"
        ]
      },
      {
        "title": "Download a PDF before anyone signs.",
        "body": "Export a clean PDF of any draft for offline review or to share with someone outside Terms.",
        "commits": [
          "9a9cae0"
        ]
      },
      {
        "title": "Update signers without rewriting the agreement.",
        "body": "Change a signer's name, email or company from the sidebar while the contract body stays untouched.",
        "commits": [
          "c8bf057",
          "62207d6"
        ]
      },
      {
        "title": "Better recovery when an AI request stops.",
        "body": "If a response is interrupted, the partial reply is kept and a retry continues from that point.",
        "commits": [
          "9fc8413"
        ]
      }
    ]
  },
  {
    "label": "September 25, 2026",
    "date": "2026-09-25",
    "entries": [
      {
        "title": "Connect your agent to Terms.",
        "body": "A new connectors page issues API keys and explains how external agents can read and draft contracts on your behalf.",
        "commits": [
          "cd3804f"
        ]
      },
      {
        "title": "Clearer privacy and terms pages.",
        "body": "The legal pages were rewritten in plainer language and now include a table of contents for quicker scanning.",
        "commits": [
          "166a612"
        ]
      }
    ]
  },
  {
    "label": "September 23, 2026",
    "date": "2026-09-23",
    "entries": [
      {
        "title": "Simplified templates experience.",
        "body": "Starting from a template takes one click, and placeholders are highlighted so nothing gets missed.",
        "commits": [
          "b425365"
        ]
      },
      {
        "title": "Drop files straight into chat.",
        "body": "Drag a PDF or document onto the chat to attach it, with no separate upload dialog.",
        "commits": [
          "260309e"
        ]
      },
      {
        "title": "Keep removed contracts out of the way.",
        "body": "Deleted and voided contracts move to their own filter instead of crowding the main list.",
        "commits": [
          "0518a78"
        ]
      }
    ]
  },
  {
    "label": "September 15, 2026",
    "date": "2026-09-15",
    "entries": [
      {
        "title": "Pricing that fits on your phone.",
        "body": "Plan cards stack cleanly on narrow screens and keep the upgrade button within easy reach.",
        "commits": [
          "48e9fcd",
          "d55b4d0"
        ]
      },
      {
        "title": "A clearer view of how Terms is used.",
        "body": "Internal dashboards now track sends, signatures and AI requests, helping us spot problems sooner.",
        "commits": [
          "9e11061"
        ]
      }
    ]
  },
  {
    "label": "September 14, 2026",
    "date": "2026-09-14",
    "entries": [
      {
        "title": "Update signer details through chat.",
        "body": "Ask the assistant to change a signer and it fills in the fields for you to confirm.",
        "commits": [
          "242f385"
        ]
      },
      {
        "title": "Drafts that know today's date.",
        "body": "Generated drafts use the current date for effective dates and deadlines instead of a placeholder.",
        "commits": [
          "f679391"
        ]
      },
      {
        "title": "Clearer contract status and completed records.",
        "body": "Status labels were simplified, and fully signed contracts show a single completed record with the certificate attached.",
        "commits": [
          "0921d77"
        ]
      }
    ]
  },
  {
    "label": "September 10, 2026",
    "date": "2026-09-10",
    "entries": [
      {
        "title": "Set up a contract through conversation.",
        "body": "Describe the parties, price and timeline in chat and the assistant fills the setup form as you go.",
        "commits": [
          "a077b95"
        ]
      },
      {
        "title": "More room to work on mobile.",
        "body": "Panels collapse into sheets on small screens, giving the document the full width of the display.",
        "commits": [
          "96898e3"
        ]
      },
      {
        "title": "Undo a deleted comment.",
        "body": "A short undo prompt appears after you remove a comment, in case you clicked too quickly.",
        "commits": [
          "09c908b"
        ]
      },
      {
        "title": "Give the AI the whole conversation.",
        "body": "The assistant can now read the full comment history on a contract when proposing an edit.",
        "commits": [
          "8bfd582"
        ]
      }
    ]
  },
  {
    "label": "September 9, 2026",
    "date": "2026-09-09",
    "entries": [
      {
        "title": "One editor for drafts and sent contracts.",
        "body": "Drafts and sent contracts open in the same editor, with revision controls appearing only once a contract has gone out.",
        "commits": [
          "f1d5857"
        ]
      },
      {
        "title": "Turn feedback into changes with AI.",
        "body": "Select a counterparty comment and ask the assistant to draft a revision that addresses it.",
        "commits": [
          "af52be8"
        ]
      },
      {
        "title": "Easier signing and commenting on mobile.",
        "body": "The signing flow and comment composer were reworked for thumbs, with larger controls and fewer steps.",
        "commits": [
          "e398b15",
          "a9064cd",
          "8ebf608"
        ]
      },
      {
        "title": "One acknowledgement, less interruption.",
        "body": "Signers confirm the electronic signature notice once per contract instead of on every visit.",
        "commits": [
          "627e386"
        ]
      }
    ]
  },
  {
    "label": "September 8, 2026",
    "date": "2026-09-08",
    "entries": [
      {
        "title": "Start with a conversation.",
        "body": "New contracts begin in chat, where you describe what you need before any text appears.",
        "commits": [
          "8c0c5d8"
        ]
      },
      {
        "title": "Turn a PDF into an editable contract.",
        "body": "Upload a PDF and Terms converts it to editable markdown, keeping headings, lists and numbering intact.",
        "commits": [
          "87f5d90"
        ]
      },
      {
        "title": "Search and ask across your contracts.",
        "body": "One search box finds contracts by party or phrase and can answer questions that span several agreements.",
        "commits": [
          "90ca8a4"
        ]
      },
      {
        "title": "Work with Terms over email.",
        "body": "Forward a document or reply to a notification and an email agent turns it into a draft or a comment.",
        "commits": [
          "e28a312"
        ]
      },
      {
        "title": "Review before you send.",
        "body": "A final review screen lists signers, order and message so you can double-check everything before sending.",
        "commits": [
          "adee433",
          "c0f8cc3"
        ]
      }
    ]
  },
  {
    "label": "September 7, 2026",
    "date": "2026-09-07",
    "entries": [
      {
        "title": "Sign in with the email on the contract.",
        "body": "Recipients can sign in with the address a contract was sent to and see everything shared with them.",
        "commits": [
          "f4ce5e2"
        ]
      },
      {
        "title": "Know when it is time to sign.",
        "body": "Signers get a clear notice when all comments are resolved and the contract is ready for signatures.",
        "commits": [
          "c68a43b"
        ]
      },
      {
        "title": "Send updates with a clear record of changes.",
        "body": "Sending a revision includes a summary of what changed, and each version is kept in the history.",
        "commits": [
          "5b7fdad",
          "46b48bc"
        ]
      },
      {
        "title": "Add the company behind a signature.",
        "body": "Signers can add a company name and title, which appear on the signature block and certificate.",
        "commits": [
          "b611a7d"
        ]
      },
      {
        "title": "Meet the people behind Terms.",
        "body": "A new about page introduces the studio that builds Terms and explains how the service handles data.",
        "commits": [
          "893169a",
          "bda74cf"
        ]
      }
    ]
  },
  {
    "label": "September 3, 2026",
    "date": "2026-09-03",
    "entries": [
      {
        "title": "Your contracts, in your account.",
        "body": "Contracts you create or receive are gathered in one dashboard tied to your account.",
        "commits": [
          "e243295",
          "cb380bc"
        ]
      },
      {
        "title": "Give the assistant a reference PDF.",
        "body": "Attach an existing agreement as a reference and the assistant follows its structure and tone while drafting.",
        "commits": [
          "139fa26"
        ]
      },
      {
        "title": "See your AI allowance.",
        "body": "A meter in settings shows how many AI tokens you have used and when the allowance resets.",
        "commits": [
          "709df5e",
          "4d97a3d"
        ]
      }
    ]
  },
  {
    "label": "September 2, 2026",
    "date": "2026-09-02",
    "entries": [
      {
        "title": "The first version of Terms.",
        "body": "Terms launched with markdown contracts, shareable signing links and a completion certificate for every signed document.",
        "commits": [
          "6047fc3",
          "29fcee2"
        ]
      },
      {
        "title": "Write and preview in one place.",
        "body": "The editor shows the formatted contract beside the markdown source and updates as you type.",
        "commits": [
          "4c87a91",
          "d4529f1"
        ]
      },
      {
        "title": "Discuss the details on the contract.",
        "body": "Highlight any passage to leave a comment, and reply in threads that stay attached to the text.",
        "commits": [
          "5a6c676"
        ]
      },
      {
        "title": "Sign and keep a record.",
        "body": "Typed signatures lock the document once everyone signs and attach an audit trail of who signed when.",
        "commits": [
          "7234117"
        ]
      },
      {
        "title": "Draft with AI beside you.",
        "body": "Ask the assistant for a first draft or a specific clause and it writes directly into your document.",
        "commits": [
          "3620ef2",
          "897584e"
        ]
      }
    ]
  }
]
