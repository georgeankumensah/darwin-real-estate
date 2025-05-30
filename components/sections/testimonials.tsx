import React from 'react'

const Testimonials = () => {
  return (
    <section>
  <div className="isolate -z-10 absolute h-full w-full top-0 left-0 bg-primary-2700"></div>
  {/* <svg className="-z-10 absolute inset-0 h-full w-full stroke-gray-200 mask-[radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
    <defs>
      <pattern id="a3fd4e5a-9d52-42fc-97b6-718e5d7ee527" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
        <path className="stroke-primary-2300" d="M100 200V.5M.5 .5H200" fill="none" />
      </pattern>
    </defs>
    <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
      <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" strokeWidth="0" className="fill-primary-2600" />
    </svg>
    <rect width="100%" height="100%" strokeWidth="0" fill="url(#a3fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
  </svg>
  <div className="absolute left-[calc(50%-4rem)] top-10 -z-10 blur-3xl transform-gpu sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]" aria-hidden="true">
    <div className="aspect-1108/632 w-277 bg-primary-2400" style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%);"></div>
  </div> */}

  <div className="pt-12 md:pt-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-balance font-display tracking-tight text-5xl sm:text-5xl text-primary-0">What our customers are saying</h2>
      </div>
    </div>
    <div className="relative flex justify-center max-w-376 mx-auto">
      <div className="w-full inline-flex flex-nowrap mask-[linear-gradient(to_right,transparent_0,black_10%,black_90%,transparent_100%)] py-12 md:py-20 group">
        <div x-ref="testimonials" className="flex items-start justify-center md:justify-start *:mx-3 animate-[infinite-scroll_60s_linear_infinite] group-hover:[animation-play-state:paused]">
          {/* <!-- Item #1 --> */}
          <article className="odd:rotate-1 even:-rotate-1 group-hover:rotate-0 h-full w-88 relative bg-primary-2500/40 backdrop-blur-lg rounded-xl p-5">
            <header className="flex items-center gap-3 mb-4">
              <img className="shrink-0 rounded-full" src="/images/people/person-1.jpg" width="44" height="44" alt="Testimonial 01" />
              <div>
                <div className="font-body text-balance leading-6 font-semibold text-primary-0">Peter Lowe</div>
                <div>
                  <a className="text-balance leading-5 text-sm text-secondary-0/70 transition" href="#0">@peterlowex</a>
                </div>
              </div>
            </header>
            <div className="grow font-body text-balance text-base leading-6 text-primary-300">As a founder, having a visually appealing and user-friendly website is essential. This tool not only helped me achieve that but also improved my site's performance and SEO.</div>
            <footer className="mt-4 flex items-center gap-2.5 opacity-50">
              <svg className="text-primary-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor">
                  <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                  <path d="M16.5 12a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.008-5.5h-.01" />
                </g>
              </svg>

              <div className="font-body text-balance leading-5 text-sm text-primary-300">May 19, 2027</div>
            </footer>
          </article>
          {/* <!-- Item #2 --> */}
          <article className="odd:rotate-1 even:-rotate-1 group-hover:rotate-0 h-full w-88 relative bg-primary-2500/40 backdrop-blur-lg rounded-xl p-5">
            <header className="flex items-center gap-3 mb-4">
              <img className="shrink-0 rounded-full" src="/images/people/person-2.jpg" width="44" height="44" alt="Testimonial 02" />
              <div>
                <div className="font-body text-balance leading-6 font-semibold text-primary-0">Rodri Alba</div>
                <div>
                  <a className="text-balance leading-5 text-sm text-secondary-0/70 transition" href="#0">@rodri_spn</a>
                </div>
              </div>
            </header>
            <div className="grow font-body text-balance text-base leading-6 text-primary-300">Simple has revolutionized the way I manage my work. Its intuitive interface and seamless functionality make staying organized effortless. I can't imagine my life without it.</div>
            <footer className="mt-4 flex items-center gap-2.5 opacity-50">
              <svg className="text-primary-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor">
                  <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                  <path d="M16.5 12a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.008-5.5h-.01" />
                </g>
              </svg>

              <div className="font-body text-balance leading-5 text-sm text-primary-300">Apr 12, 2027</div>
            </footer>
          </article>
          {/* <!-- Item #3 --> */}
          <article className="odd:rotate-1 even:-rotate-1 group-hover:rotate-0 h-full w-88 relative bg-primary-2500/40 backdrop-blur-lg rounded-xl p-5">
            <header className="flex items-center gap-3 mb-4">
              <img className="shrink-0 rounded-full" src="/images/people/person-3.jpg" width="44" height="44" alt="Testimonial 03" />
              <div>
                <div className="font-body text-balance leading-6 font-semibold text-primary-0">Michele Lex</div>
                <div>
                  <a className="text-balance leading-5 text-sm text-secondary-0/70 transition" href="#0">@MikyBrown</a>
                </div>
              </div>
            </header>
            <div className="grow font-body text-balance text-base leading-6 text-primary-300">I've tried several website builders before, but none were as user-friendly and versatile as this one. From design to functionality, it exceeded my expectations!</div>
            <footer className="mt-4 flex items-center gap-2.5 opacity-50">
              <svg className="text-primary-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor">
                  <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                  <path d="M16.5 12a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.008-5.5h-.01" />
                </g>
              </svg>

              <div className="font-body text-balance leading-5 text-sm text-primary-300">Mar 04, 2027</div>
            </footer>
          </article>
          {/* <!-- Item #4 --> */}
          <article className="odd:rotate-1 even:-rotate-1 group-hover:rotate-0 h-full w-88 relative bg-primary-2500/40 backdrop-blur-lg rounded-xl p-5">
            <header className="flex items-center gap-3 mb-4">
              <img className="shrink-0 rounded-full" src="/images/people/person-4.jpg" width="44" height="44" alt="Testimonial 04" />
              <div>
                <div className="font-body text-balance leading-6 font-semibold text-primary-0">Michael Ross</div>
                <div>
                  <a className="text-balance leading-5 text-sm text-secondary-0/70 transition" href="#0">@michjack</a>
                </div>
              </div>
            </header>
            <div className="grow font-body text-balance text-base leading-6 text-primary-300">Simple lives up to its name in every way. It's incredibly easy to use yet powerful enough to handle all my tasks effortlessly. It's become an essential part of my daily routine.</div>
            <footer className="mt-4 flex items-center gap-2.5 opacity-50">
              <svg className="text-primary-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor">
                  <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                  <path d="M16.5 12a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.008-5.5h-.01" />
                </g>
              </svg>

              <div className="font-body text-balance leading-5 text-sm text-primary-300">Jan 15, 2027</div>
            </footer>
          </article>
        </div>
        <div x-ref="testimonials" className="flex items-start justify-center md:justify-start *:mx-3 animate-[infinite-scroll_60s_linear_infinite] group-hover:[animation-play-state:paused]">
          {/* <!-- Item #1 --> */}
          <article className="odd:rotate-1 even:-rotate-1 group-hover:rotate-0 h-full w-88 relative bg-primary-2500/40 backdrop-blur-lg rounded-xl p-5">
            <header className="flex items-center gap-3 mb-4">
              <img className="shrink-0 rounded-full" src="/images/people/person-1.jpg" width="44" height="44" alt="Testimonial 01" />
              <div>
                <div className="font-body text-balance leading-6 font-semibold text-primary-0">Peter Lowe</div>
                <div>
                  <a className="text-balance leading-5 text-sm text-secondary-0/70 transition" href="#0">@peterlowex</a>
                </div>
              </div>
            </header>
            <div className="grow font-body text-balance text-base leading-6 text-primary-300">As a founder, having a visually appealing and user-friendly website is essential. This tool not only helped me achieve that but also improved my site's performance and SEO.</div>
            <footer className="mt-4 flex items-center gap-2.5 opacity-50">
              <svg className="text-primary-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor">
                  <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                  <path d="M16.5 12a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.008-5.5h-.01" />
                </g>
              </svg>

              <div className="font-body text-balance leading-5 text-sm text-primary-300">May 19, 2027</div>
            </footer>
          </article>
          {/* <!-- Item #2 --> */}
          <article className="odd:rotate-1 even:-rotate-1 group-hover:rotate-0 h-full w-88 relative bg-primary-2500/40 backdrop-blur-lg rounded-xl p-5">
            <header className="flex items-center gap-3 mb-4">
              <img className="shrink-0 rounded-full" src="/images/people/person-2.jpg" width="44" height="44" alt="Testimonial 02" />
              <div>
                <div className="font-body text-balance leading-6 font-semibold text-primary-0">Rodri Alba</div>
                <div>
                  <a className="text-balance leading-5 text-sm text-secondary-0/70 transition" href="#0">@rodri_spn</a>
                </div>
              </div>
            </header>
            <div className="grow font-body text-balance text-base leading-6 text-primary-300">Simple has revolutionized the way I manage my work. Its intuitive interface and seamless functionality make staying organized effortless. I can't imagine my life without it.</div>
            <footer className="mt-4 flex items-center gap-2.5 opacity-50">
              <svg className="text-primary-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor">
                  <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                  <path d="M16.5 12a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.008-5.5h-.01" />
                </g>
              </svg>

              <div className="font-body text-balance leading-5 text-sm text-primary-300">Apr 12, 2027</div>
            </footer>
          </article>
          {/* <!-- Item #3 --> */}
          <article className="odd:rotate-1 even:-rotate-1 group-hover:rotate-0 h-full w-88 relative bg-primary-2500/40 backdrop-blur-lg rounded-xl p-5">
            <header className="flex items-center gap-3 mb-4">
              <img className="shrink-0 rounded-full" src="/images/people/person-3.jpg" width="44" height="44" alt="Testimonial 03" />
              <div>
                <div className="font-body text-balance leading-6 font-semibold text-primary-0">Michele Lex</div>
                <div>
                  <a className="text-balance leading-5 text-sm text-secondary-0/70 transition" href="#0">@MikyBrown</a>
                </div>
              </div>
            </header>
            <div className="grow font-body text-balance text-base leading-6 text-primary-300">I've tried several website builders before, but none were as user-friendly and versatile as this one. From design to functionality, it exceeded my expectations!</div>
            <footer className="mt-4 flex items-center gap-2.5 opacity-50">
              <svg className="text-primary-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor">
                  <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                  <path d="M16.5 12a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.008-5.5h-.01" />
                </g>
              </svg>

              <div className="font-body text-balance leading-5 text-sm text-primary-300">Mar 04, 2027</div>
            </footer>
          </article>
          {/* <!-- Item #4 --> */}
          <article className="odd:rotate-1 even:-rotate-1 group-hover:rotate-0 h-full w-88 relative bg-primary-2500/40 backdrop-blur-lg rounded-xl p-5">
            <header className="flex items-center gap-3 mb-4">
              <img className="shrink-0 rounded-full" src="/images/people/person-4.jpg" width="44" height="44" alt="Testimonial 04" />
              <div>
                <div className="font-body text-balance leading-6 font-semibold text-primary-0">Michael Ross</div>
                <div>
                  <a className="text-balance leading-5 text-sm text-secondary-0/70 transition" href="#0">@michjack</a>
                </div>
              </div>
            </header>
            <div className="grow font-body text-balance text-base leading-6 text-primary-300">Simple lives up to its name in every way. It's incredibly easy to use yet powerful enough to handle all my tasks effortlessly. It's become an essential part of my daily routine.</div>
            <footer className="mt-4 flex items-center gap-2.5 opacity-50">
              <svg className="text-primary-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor">
                  <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                  <path d="M16.5 12a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.008-5.5h-.01" />
                </g>
              </svg>

              <div className="font-body text-balance leading-5 text-sm text-primary-300">Jan 15, 2027</div>
            </footer>
          </article>
        </div>
      </div>
    </div>
  </div>
</section>


  )
}

export default Testimonials
