interface BrandLogoProps {
  className?: string
  strokeWidth?: number
  'aria-hidden'?: boolean
}

export function BrandLogo({
  className = 'h-5 w-auto',
  strokeWidth = 2.6,
  'aria-hidden': ariaHidden = true,
}: BrandLogoProps) {
  return (
    <svg
      viewBox="0 0 96 52"
      fill="none"
      aria-hidden={ariaHidden}
      className={className}
    >
      <path
        d="M5 48V4L26.5 27L48 4V48"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M48 16H72V31H48"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M72 31H91V48H60"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  )
}
