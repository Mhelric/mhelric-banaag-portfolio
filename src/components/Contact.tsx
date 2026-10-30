import { useEffect, useState, type FormEvent } from 'react'

const EMAIL_ADDRESS = 'mhelricbanaag102703@gmail.com'
const WEB3FORMS_ACCESS_KEY = '5d885f30-c0bc-431e-b43f-5397a423e263'

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    handle: 'in/mhelric-banaag',
    href: 'https://www.linkedin.com/in/mhelric-banaag-7797622b0/',
  },
  {
    label: 'GitHub',
    handle: '@Mhelric',
    href: 'https://github.com/Mhelric',
  },
  {
    label: 'ArtStation',
    handle: 'meru_art',
    href: 'https://meru_art.artstation.com/projects',
  },
  {
    label: 'Commissions (Carrd)',
    handle: 'meru-art.carrd.co',
    href: 'https://meru-art.carrd.co/',
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

  // Email Composer Form State
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

    // Close modal on Escape key
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
      className="flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-between border-t border-border pt-12 pb-8 sm:pt-16"
      aria-labelledby="contact-heading"
    >
      <div className="my-auto">
        {/* Section Header */}
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          05 // Get In Touch
        </p>
        <h2
          id="contact-heading"
          className="mt-2 text-3xl font-semibold tracking-tight text-text sm:text-4xl"
        >
          Let&apos;s build something polished together.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          I&apos;m currently open to{' '}
          <strong className="font-medium text-text">
            Front-End, Full-Stack, and UI Developer
          </strong>{' '}
          opportunities, as well as freelance web or illustration projects.
        </p>

        {/* Main Contact Card */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column: Direct Email + Resume CTA */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-surface p-6 sm:p-8 lg:col-span-7">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                Available for Interviews &amp; Projects
              </span>

              <h3 className="mt-4 text-lg font-semibold text-text sm:text-xl">
                Direct Contact
              </h3>
              <p className="mt-1 font-mono text-sm text-accent sm:text-base">
                {EMAIL_ADDRESS}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                Whether you&apos;re hiring for a software engineering role or
                looking for custom character/UI art, send a message directly
                through the built-in composer or connect on LinkedIn &amp; GitHub.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
              <button
                type="button"
                onClick={() => {
                  setSendStatus('idle')
                  setIsEmailModalOpen(true)
                }}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-xs font-medium text-white transition-opacity hover:opacity-90 sm:flex-initial sm:text-sm"
              >
                Send Email ✉
              </button>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-xs text-text transition-colors hover:border-accent/60 hover:text-accent sm:flex-initial"
              >
                {copied ? 'Copied to Clipboard ✓' : 'Copy Email'}
              </button>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-xs text-muted transition-colors hover:border-accent/60 hover:text-text sm:ml-auto sm:w-auto"
              >
                Resume PDF ↓
              </a>
            </div>
          </div>

          {/* Right Column: Profiles & Networks */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-surface/70 p-6 lg:col-span-5">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
                Profiles &amp; Links
              </h3>
              <ul className="mt-4 space-y-2.5">
                {SOCIAL_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-lg border border-border bg-bg/70 px-4 py-2.5 transition-colors hover:border-accent/60"
                    >
                      <div>
                        <p className="text-xs font-medium text-text sm:text-sm">
                          {item.label}
                        </p>
                        <p className="font-mono text-[11px] text-muted">
                          {item.handle}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-5 font-mono text-[11px] text-muted">
              Based in Cavite, Philippines (GMT+8) • Open to remote &amp; hybrid roles
            </p>
          </div>
        </div>
      </div>

      {/* Minimalist Footer */}
      <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 font-mono text-xs text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} Mhelric Banaag. Built with React,
          TypeScript &amp; Tailwind CSS.
        </p>
        <a href="#hero" className="transition-colors hover:text-accent">
          Back to top ↑
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
            {/* Email Window Top Header */}
            <div className="flex items-center justify-between border-b border-border bg-bg/60 px-5 py-3.5 sm:px-6">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70"></span>
                </div>
                <h3
                  id="email-composer-title"
                  className="ml-1 font-mono text-xs font-medium text-text sm:text-sm"
                >
                  New Message // Direct to Inbox
                </h3>
              </div>

              <button
                type="button"
                onClick={closeEmailModal}
                className="rounded-lg border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:text-text"
              >
                ESC ✕
              </button>
            </div>

            {sendStatus === 'success' ? (
              /* Success State View */
              <div className="p-6 text-center sm:p-10">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 font-mono text-xl text-emerald-400">
                  ✓
                </div>
                <h4 className="mt-4 text-lg font-semibold text-text sm:text-xl">
                  Message Sent Successfully!
                </h4>
                <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-muted sm:text-sm">
                  Thank you for reaching out. Your message and contact details
                  have been sent directly to{' '}
                  <span className="font-mono text-text">{EMAIL_ADDRESS}</span>.
                  I&apos;ll reply to your email shortly!
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSendStatus('idle')}
                    className="rounded-lg border border-border bg-bg px-4 py-2 font-mono text-xs text-muted hover:text-text"
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
              /* Email Composer Form */
              <form onSubmit={handleSendEmail} className="p-5 sm:p-6">
                {/* To: Header Line */}
                <div className="flex items-center gap-3 border-b border-border pb-3 text-xs">
                  <span className="w-16 shrink-0 font-mono text-muted">
                    To:
                  </span>
                  <span className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-accent">
                    Mhelric Banaag &lt;{EMAIL_ADDRESS}&gt;
                  </span>
                </div>

                {/* Inquiry Category Selector Pills */}
                <div className="border-b border-border py-3">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                    Topic / Category
                  </span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {INQUIRY_TYPES.map((type) => {
                      const isSelected = inquiryType === type
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setInquiryType(type)}
                          className={`rounded-md border px-2.5 py-1 font-mono text-[11px] transition-colors ${
                            isSelected
                              ? 'border-accent bg-accent text-white'
                              : 'border-border bg-bg text-muted hover:border-accent/50 hover:text-text'
                          }`}
                        >
                          {type}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Sender Name & Email Row */}
                <div className="grid grid-cols-1 gap-3 border-b border-border py-3.5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="sender-name"
                      className="block font-mono text-[11px] text-muted"
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
                      className="block font-mono text-[11px] text-muted"
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

                {/* Subject Line */}
                <div className="border-b border-border py-3.5">
                  <label
                    htmlFor="email-subject"
                    className="block font-mono text-[11px] text-muted"
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

                {/* Message Body */}
                <div className="py-3.5">
                  <label
                    htmlFor="email-message"
                    className="block font-mono text-[11px] text-muted"
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

                {/* Error Notice (if offline or blocked) */}
                {sendStatus === 'error' && (
                  <p className="mb-3 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 font-mono text-xs text-rose-300">
                    Could not send automatically. Please check your connection
                    or email {EMAIL_ADDRESS} directly.
                  </p>
                )}

                {/* Modal Footer Actions */}
                <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
                  <span className="font-mono text-[11px] text-muted">
                    Replies go directly to your email
                  </span>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={closeEmailModal}
                      className="rounded-lg border border-border bg-bg px-4 py-2 font-mono text-xs text-muted hover:text-text"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={sendStatus === 'sending'}
                      className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 sm:text-sm"
                    >
                      {sendStatus === 'sending' ? 'Sending...' : 'Send Email →'}
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