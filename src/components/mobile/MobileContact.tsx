import { useState, type FormEvent } from 'react'
import { BrandLogo } from '../BrandLogo'
import { MobileBottomSheet } from './MobileBottomSheet'

const EMAIL_ADDRESS = 'mhelricbanaag102703@gmail.com'
const WEB3FORMS_ACCESS_KEY = '5d885f30-c0bc-431e-b43f-5397a423e263'

const ELSEWHERE = [
  { label: 'LinkedIn', handle: 'in/mhelric-banaag', href: 'https://www.linkedin.com/in/mhelric-banaag-7797622b0/' },
  { label: 'GitHub', handle: '@Mhelric', href: 'https://github.com/Mhelric' },
  { label: 'ArtStation', handle: 'meru_art', href: 'https://meru_art.artstation.com/projects' },
  { label: 'Meru Art Studio', handle: 'meru-art-studio.vercel.app', href: 'https://meru-art-studio.vercel.app/' },
]

const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com/mhelric.banaag.27' },
  { label: 'Instagram', href: 'https://www.instagram.com/melric_27/' },
  { label: 'X', href: 'https://x.com/Meru102703' },
  { label: 'Discord', href: 'https://discord.com/users/880845180012466206' },
  { label: 'Spotify', href: 'https://open.spotify.com/user/f7bmddm5hk21n3ykf6l9qdnn2' },
]

type SendStatus = 'idle' | 'sending' | 'success' | 'error'

export function MobileContact() {
  const [copied, setCopied] = useState(false)
  const [isMessageOpen, setIsMessageOpen] = useState(false)
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
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
          name: senderName,
          email: senderEmail,
          subject: `Portfolio Inquiry from ${senderName}`,
          message,
        }),
      })

      const data = (await response.json()) as { success?: boolean }
      if (data.success) {
        setSendStatus('success')
        setSenderName('')
        setSenderEmail('')
        setMessage('')
      } else {
        setSendStatus('error')
      }
    } catch {
      setSendStatus('error')
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="mobile-contact-heading"
      className="flex h-[100svh] snap-start snap-always flex-col justify-between px-4 pt-16 pb-6"
    >
      <div className="my-auto space-y-3.5">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Available for Developer Roles &amp; Commissions
          </span>
          <h2
            id="mobile-contact-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-text"
          >
            Let&apos;s build something together.
          </h2>
          <p className="mt-1 text-xs text-muted">
            Cavite, PH (GMT+8) — Direct replies to your inbox.
          </p>
        </div>

        {/* Prominent Send Message CTA (opens keyboard-friendly bottom sheet) */}
        <button
          type="button"
          onClick={() => {
            setSendStatus('idle')
            setIsMessageOpen(true)
          }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(79,140,255,0.4)] transition-opacity active:opacity-90"
        >
          Send a Message
          <span aria-hidden="true">→</span>
        </button>

        {/* 1-Click Copy Email Card */}
        <button
          type="button"
          onClick={handleCopyEmail}
          className="flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-left dark:bg-[#111216]"
        >
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
              Direct Email
            </p>
            <p className="truncate font-mono text-xs font-medium text-text">
              {EMAIL_ADDRESS}
            </p>
          </div>
          <span className="shrink-0 rounded-lg border border-border bg-bg px-2.5 py-1 text-[11px] font-semibold text-accent">
            {copied ? 'Copied ✓' : 'Copy'}
          </span>
        </button>

        {/* Compact Elsewhere Directory */}
        <div className="grid grid-cols-2 gap-2">
          {ELSEWHERE.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col rounded-xl border border-border bg-surface px-3 py-2 dark:bg-[#111216]"
            >
              <span className="text-xs font-semibold text-text">
                {item.label} ↗
              </span>
              <span className="truncate text-[10px] text-muted">
                {item.handle}
              </span>
            </a>
          ))}
        </div>

        {/* Social Pills */}
        <div className="flex flex-wrap gap-1.5">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium text-muted hover:text-text dark:bg-[#111216]"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>

      {/* Minimalist Footer */}
      <footer className="flex items-center justify-between border-t border-border pt-2.5 text-[11px] text-muted">
        <div className="flex items-center gap-2">
          <BrandLogo className="h-3 w-auto text-text" strokeWidth={3.2} />
          <span>© {new Date().getFullYear()} Mhelric Banaag</span>
        </div>
        <span>React · TS · Tailwind</span>
      </footer>

      {/* Keyboard-Friendly Slide-Up Message Sheet */}
      <MobileBottomSheet
        open={isMessageOpen}
        onClose={() => setIsMessageOpen(false)}
        title="Send a Message"
        subtitle="Direct to Inbox"
      >
        {sendStatus === 'success' ? (
          <div className="space-y-3 py-4 text-center">
            <p className="text-sm font-bold text-text">Message Sent ✓</p>
            <p className="text-xs text-muted">
              Thanks for reaching out! I&apos;ll get back to you soon.
            </p>
            <button
              type="button"
              onClick={() => setIsMessageOpen(false)}
              className="w-full rounded-xl bg-accent py-2.5 text-xs font-semibold text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSendEmail} className="space-y-3">
            <div>
              <label
                htmlFor="mobile-contact-name"
                className="block text-[11px] font-medium text-muted"
              >
                Your Name
              </label>
              <input
                id="mobile-contact-name"
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Jane Doe"
                className="mt-1 w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-sm text-text outline-none focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="mobile-contact-email"
                className="block text-[11px] font-medium text-muted"
              >
                Your Email
              </label>
              <input
                id="mobile-contact-email"
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="jane@example.com"
                className="mt-1 w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-sm text-text outline-none focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="mobile-contact-message"
                className="block text-[11px] font-medium text-muted"
              >
                Message
              </label>
              <textarea
                id="mobile-contact-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project, role, or commission idea..."
                className="mt-1 w-full resize-none rounded-xl border border-border bg-bg px-3.5 py-2.5 text-sm text-text outline-none focus:border-accent"
              />
            </div>

            {sendStatus === 'error' && (
              <p className="text-xs text-rose-500">
                Something went wrong. Please try again or copy my email directly.
              </p>
            )}

            <button
              type="submit"
              disabled={sendStatus === 'sending'}
              className="w-full rounded-xl bg-accent py-3 text-xs font-semibold text-white shadow-[0_6px_20px_rgba(79,140,255,0.35)] disabled:opacity-50"
            >
              {sendStatus === 'sending' ? 'Sending...' : 'Send Message →'}
            </button>
          </form>
        )}
      </MobileBottomSheet>
    </section>
  )
}
