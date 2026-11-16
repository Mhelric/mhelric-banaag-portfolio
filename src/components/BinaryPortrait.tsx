export function BinaryPortrait() {
  return (
    <div className="relative flex justify-center">
      {/* Subtle zero-blur CSS radial ambient glow behind portrait */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(79,140,255,0.14)_0%,transparent_70%)]"
      />

      <img
        src="/mhelric-profile.webp"
        alt="Mhelric Banaag portrait"
        width={1215}
        height={1773}
        decoding="async"
        fetchPriority="high"
        className="relative z-10 hidden aspect-[1215/1773] h-auto w-auto max-w-[230px] max-h-[34svh] object-contain sm:max-w-[290px] sm:max-h-[40svh] lg:max-w-[400px] lg:max-h-[calc(100svh-12rem)] xl:max-w-[440px] xl:max-h-[min(calc(100svh-11.5rem),640px)] dark:block"
      />

      <img
        src="/mhelric-profile-light.webp"
        alt="Mhelric Banaag portrait"
        width={1215}
        height={1773}
        decoding="async"
        className="relative z-10 block aspect-[1215/1773] h-auto w-auto max-w-[230px] max-h-[34svh] object-contain sm:max-w-[290px] sm:max-h-[40svh] lg:max-w-[400px] lg:max-h-[calc(100svh-12rem)] xl:max-w-[440px] xl:max-h-[min(calc(100svh-11.5rem),640px)] dark:hidden"
      />
    </div>
  )
}
