export function BinaryPortrait() {
  return (
    <div className="relative flex justify-center">
      {/* Subtle Ambient Studio Glow Behind Portrait */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/12 blur-2xl"
      />

      <img
        src="/mhelric-profile.webp"
        alt="Mhelric Banaag portrait"
        width={1215}
        height={1773}
        decoding="async"
        fetchPriority="high"
        className="relative z-10 hidden aspect-[1215/1773] h-auto w-auto max-w-[230px] max-h-[34svh] object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.75)] sm:max-w-[290px] sm:max-h-[40svh] lg:max-w-[400px] lg:max-h-[calc(100svh-12rem)] xl:max-w-[440px] xl:max-h-[min(calc(100svh-11.5rem),640px)] dark:block"
      />

      <img
        src="/mhelric-profile-light.webp"
        alt="Mhelric Banaag portrait"
        width={1215}
        height={1773}
        decoding="async"
        className="relative z-10 block aspect-[1215/1773] h-auto w-auto max-w-[230px] max-h-[34svh] object-contain drop-shadow-[0_14px_28px_rgba(15,23,42,0.18)] sm:max-w-[290px] sm:max-h-[40svh] lg:max-w-[400px] lg:max-h-[calc(100svh-12rem)] xl:max-w-[440px] xl:max-h-[min(calc(100svh-11.5rem),640px)] dark:hidden"
      />
    </div>
  )
}
