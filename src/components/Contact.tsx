import { useEffect, useState, type FormEvent, type ReactNode } from 'react'

const EMAIL_ADDRESS = 'mhelricbanaag102703@gmail.com'
const WEB3FORMS_ACCESS_KEY = '5d885f30-c0bc-431e-b43f-5397a423e263'

interface LinkItem {
  label: string
  handle: string
  href: string
  icon: ReactNode
}

const ELSEWHERE_LINKS: LinkItem[] = [
  {
    label: 'LinkedIn',
    handle: 'in/mhelric-banaag',
    href: 'https://www.linkedin.com/in/mhelric-banaag-7797622b0/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    handle: '@Mhelric',
    href: 'https://github.com/Mhelric',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
  {
    label: 'ArtStation',
    handle: 'meru_art',
    href: 'https://meru_art.artstation.com/projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M1.77 16.88 3.5 19.9a2.14 2.14 0 0 0 1.88 1.1h11.75l-2.43-4.12H1.77ZM22.23 16.9a2.08 2.08 0 0 0-.33-1.12L14.48 2.92a2.14 2.14 0 0 0-1.87-1.1H8.92l10.8 18.72 2.18-3.77c.22-.37.33-.62.33-.87ZM12.64 13.38 7.6 4.66l-5.04 8.72h10.08Z" />
      </svg>
    ),
  },
  {
    label: 'Commissions (Carrd)',
    handle: 'meru-art.carrd.co',
    href: 'https://meru-art.carrd.co/',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
]

const SOCIAL_NETWORKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/mhelric.banaag.27',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/melric_27/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/Meru102703',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Discord',
    href: 'https://discord.com/users/880845180012466206',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.06.02.09.01 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02ZM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12Zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12Z" />
      </svg>
    ),
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/user/f7bmddm5hk21n3ykf6l9qdnn2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm4.59 14.42c-.18.3-.56.39-.86.21-2.35-1.44-5.31-1.76-8.8-.96-.33.07-.67-.13-.74-.47-.08-.33.13-.67.47-.74 3.82-.87 7.09-.5 9.72 1.11.3.18.39.56.21.85Zm1.22-2.72c-.23.37-.71.49-1.08.26-2.69-1.65-6.79-2.13-9.97-1.17-.42.13-.86-.11-.99-.52-.13-.42.11-.86.52-.99 3.63-1.1 8.15-.57 11.26 1.34.37.23.49.71.26 1.08Zm.11-2.83C14.7 8.95 9.38 8.78 6.3 9.71c-.49.15-1.01-.13-1.16-.62-.15-.49.13-1.01.62-1.16 3.53-1.07 9.41-.86 13.11 1.33.44.26.59.84.33 1.28-.26.44-.84.59-1.28.33Z" />
      </svg>
    ),
  },
]

const INQUIRY_TYPES = [
  'Software Dev Role',
  'Web / Full-Stack Project',
  'Art Commission',
  'General Inquiry',
]

type SendStatus = 'idle' | 'sending' | 'success' | 'error'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)

  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0])
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sendStatus, setSendStatus] = useState<SendStatus>('idle')

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL_ADDRESS}`
    }
  }

  const closeEmailModal = () => {
    setIsEmailModalOpen(false)
    if (sendStatus === 'success') {
      setSendStatus('idle')
    }
  }

  useEffect(() => {
    if (!isEmailModalOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEmailModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isEmailModalOpen])

  const handleSendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSendStatus('sending')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          from_name: 'Mhelric Portfolio Contact',
          name: senderName,
          email: senderEmail,
          replyto: senderEmail,
          Category: inquiryType,
          subject: `[Portfolio - ${inquiryType}] ${subject}`,
          message,
        }),
      })

      const data = (await response.json()) as { success?: boolean }

      if (!response.ok || !data.success) {
        throw new Error('Failed to send message')
      }

      setSendStatus('success')
      setSenderName('')
      setSenderEmail('')
      setSubject('')
      setMessage('')
    } catch {
      setSendStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className="flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-between border-t border-border pt-14 pb-8 sm:pt-20"
      aria-labelledby="contact-heading"
    >
      <div className="my-auto">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          Contact
        </p>
        <h2
          id="contact-heading"
          className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl"
        >
          Let&apos;s build something polished together.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          I&apos;m currently open to{' '}
          <strong className="font-semibold text-text">
            Front-End, Full-Stack, and UI Developer
          </strong>{' '}
          opportunities, as well as freelance web or illustration projects.
        </p>

        {/* Clean 2-Column Editorial Contact Layout */}
        <div className="mt-10 grid grid-cols-1 gap-10 border-t border-border pt-8 lg:grid-cols-12">
          {/* Left Column: Direct Email & Actions */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted">
                Direct Email
              </p>
              <p className="mt-2 break-all text-lg font-semibold text-text sm:text-2xl">
                {EMAIL_ADDRESS}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                Whether you&apos;re hiring for a software engineering role or
                looking for custom character and UI art, send a message directly
                through the form or connect via LinkedIn and GitHub.
              </p>
            </div>

            <div className="mt-8">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSendStatus('idle')
                    setIsEmailModalOpen(true)
                  }}
                  className="inline-flex flex-1 whitespace-nowrap items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-xs font-medium text-white transition-opacity hover:opacity-90 sm:flex-initial sm:text-sm"
                >
                  Send Email
                </button>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex flex-1 whitespace-nowrap items-center justify-center rounded-lg border border-border bg-surface px-4 py-2.5 text-xs font-medium text-text transition-colors hover:border-white/25 sm:flex-initial sm:text-sm"
                >
                  {copied ? 'Copied to Clipboard' : 'Copy Email'}
                </button>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full whitespace-nowrap items-center justify-center rounded-lg border border-border bg-surface px-4 py-2.5 text-xs font-medium text-muted transition-colors hover:border-white/25 hover:text-text sm:w-auto sm:text-sm"
                >
                  Download Resume
                </a>
              </div>

              <p className="mt-6 text-xs text-muted">
                Based in Cavite, Philippines (GMT+8) · Open to remote &amp; hybrid roles
              </p>
            </div>
          </div>

          {/* Right Column: Elsewhere + Socials with Icons */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              Elsewhere
            </p>
            <ul className="mt-3 divide-y divide-border border-t border-b border-border">
              {ELSEWHERE_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3 text-sm transition-colors"
                  >
                    <span className="flex items-center gap-3 font-medium text-text group-hover:text-accent">
                      <span className="text-muted transition-colors group-hover:text-accent">
                        {item.icon}
                      </span>
                      {item.label}
                    </span>
                    <span className="text-xs text-muted group-hover:text-text">
                      {item.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Socials Icon Strip */}
            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">
                Socials
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {SOCIAL_NETWORKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/80 px-3 py-2 text-xs font-medium text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-text"
                  >
                    <span className="text-accent">{social.icon}</span>
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimalist Footer */}
      <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} Mhelric Banaag. Built with React,
          TypeScript &amp; Tailwind CSS.
        </p>
        <a href="#hero" className="transition-colors hover:text-text">
          Back to top
        </a>
      </footer>

      {/* Built-In Email Composer Modal */}
      {isEmailModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="email-composer-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6"
          onClick={closeEmailModal}
        >
          <div
            className="max-h-[90svh] w-full max-w-xl overflow-y-auto rounded-2xl border border-border bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
              <h3
                id="email-composer-title"
                className="text-sm font-bold text-text sm:text-base"
              >
                New Message
              </h3>

              <button
                type="button"
                onClick={closeEmailModal}
                className="rounded-lg border border-border bg-bg px-3 py-1 text-xs font-medium text-muted transition-colors hover:text-text"
              >
                Close
              </button>
            </div>

            {sendStatus === 'success' ? (
              <div className="p-6 text-center sm:p-10">
                <h4 className="text-lg font-bold text-text sm:text-xl">
                  Message Sent
                </h4>
                <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-muted sm:text-sm">
                  Thank you for reaching out. Your message and contact details
                  have been sent directly to{' '}
                  <span className="font-medium text-text">{EMAIL_ADDRESS}</span>.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSendStatus('idle')}
                    className="rounded-lg border border-border bg-bg px-4 py-2 text-xs font-medium text-muted hover:text-text"
                  >
                    Send Another
                  </button>
                  <button
                    type="button"
                    onClick={closeEmailModal}
                    className="rounded-lg bg-accent px-5 py-2 text-xs font-medium text-white hover:opacity-90"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendEmail} className="p-5 sm:p-6">
                <div className="flex items-center gap-3 border-b border-border pb-3 text-xs">
                  <span className="w-14 shrink-0 text-muted">To:</span>
                  <span className="font-medium text-text">
                    Mhelric Banaag ({EMAIL_ADDRESS})
                  </span>
                </div>

                <div className="border-b border-border py-3">
                  <span className="block text-xs text-muted">Category</span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {INQUIRY_TYPES.map((type) => {
                      const isSelected = inquiryType === type
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setInquiryType(type)}
                          className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                            isSelected
                              ? 'border-accent bg-accent text-white'
                              : 'border-border bg-bg text-muted hover:text-text'
                          }`}
                        >
                          {type}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 border-b border-border py-3.5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="sender-name"
                      className="block text-xs text-muted"
                    >
                      Your Name *
                    </label>
                    <input
                      id="sender-name"
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Jane Doe"
                      className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-xs text-text placeholder:text-muted/50 focus:border-accent focus:outline-none sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sender-email"
                      className="block text-xs text-muted"
                    >
                      Your Email (Reply-To) *
                    </label>
                    <input
                      id="sender-email"
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-xs text-text placeholder:text-muted/50 focus:border-accent focus:outline-none sm:text-sm"
                    />
                  </div>
                </div>

                <div className="border-b border-border py-3.5">
                  <label
                    htmlFor="email-subject"
                    className="block text-xs text-muted"
                  >
                    Subject *
                  </label>
                  <input
                    id="email-subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={`Regarding ${inquiryType}...`}
                    className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-xs text-text placeholder:text-muted/50 focus:border-accent focus:outline-none sm:text-sm"
                  />
                </div>

                <div className="py-3.5">
                  <label
                    htmlFor="email-message"
                    className="block text-xs text-muted"
                  >
                    Message *
                  </label>
                  <textarea
                    id="email-message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi Mhelric, I checked out your portfolio and would love to discuss..."
                    className="mt-1 w-full resize-none rounded-lg border border-border bg-bg p-3 text-xs leading-relaxed text-text placeholder:text-muted/50 focus:border-accent focus:outline-none sm:text-sm"
                  />
                </div>

                {sendStatus === 'error' && (
                  <p className="mb-3 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
                    Could not send automatically. Please check your connection
                    or email {EMAIL_ADDRESS} directly.
                  </p>
                )}

                <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
                  <span className="text-xs text-muted">
                    Replies go directly to your email
                  </span>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={closeEmailModal}
                      className="rounded-lg border border-border bg-bg px-4 py-2 text-xs font-medium text-muted hover:text-text"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={sendStatus === 'sending'}
                      className="inline-flex items-center rounded-lg bg-accent px-5 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 sm:text-sm"
                    >
                      {sendStatus === 'sending' ? 'Sending...' : 'Send Email'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  )
}