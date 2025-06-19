import React from 'react'

const Faq = () => {
    return (
        <section className=''>
            <div>
                <div className="isolate -z-10 absolute h-full w-full top-0 left-0 bg-primary-2700"></div>
                {/* <svg className="-z-10 absolute inset-0 h-full w-full stroke-gray-200 mask-[radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
    <defs>
      <pattern id="a3fd4e5a-9d52-42fc-97b6-718e5d7ee527" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
        <path className="stroke-primary-2300" d="M100 200V.5M.5 .5H200" fill="none" />
      </pattern>
    </defs>
    <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
      <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" stroke-width="0" className="fill-primary-2600" />
    </svg>
    <rect width="100%" height="100%" stroke-width="0" fill="url(#a3fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
  </svg>
  <div className="absolute left-[calc(50%-4rem)] top-10 -z-10 blur-3xl transform-gpu sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]" aria-hidden="true">
    <div className="aspect-1108/632 w-277 bg-primary-2400" style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%);"></div>
  </div> */}

                <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        <div className="lg:col-span-5">
                            <h2 className="text-balance font-display tracking-tight text-5xl sm:text-5xl text-primary-0">Frequently
                                asked questions</h2>
                            <p className="font-body text-balance text-base leading-6 text-primary-300 mt-4">
                                Can't find the answer you're looking for? Reach out to our
                                <a href="#" className="font-semibold text-secondary-0 hover:text-indigo-500"> customer
                                    support </a>
                                team.
                            </p>
                        </div>
                        <div className="mt-10 lg:col-span-7 lg:mt-0">
                            <dl className="space-y-10">
                                <div>
                                    <dt className="font-display text-balance text-xl leading-6 font-bold text-primary-0">What
                                        areas in Ghana do you cover?
                                    </dt>
                                    <dd className="mt-3 font-body text-balance text-base leading-6 text-primary-300 max-w-2xl">We
                                        specialize in prime locations across Ghana including East Legon, Airport
                                        Residential Area, Cantonments, Labone, Dzorwulu, and emerging areas like Oyarifa
                                        and Adenta. We also handle commercial properties in Accra's central business
                                        district.
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-display text-balance text-xl leading-6 font-bold text-primary-0">
                                        Can foreigners buy property in Ghana?
                                    </dt>
                                    <dd className="mt-3 font-body text-balance text-base leading-6 text-primary-300 max-w-2xl">
                                        Yes, foreigners can purchase property in Ghana. However, they cannot own land
                                        outright but can acquire leasehold interests for up to 50 years, renewable. We
                                        guide international clients through the entire legal process to ensure
                                        compliance with Ghanaian law.
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-display text-balance text-xl leading-6 font-bold text-primary-0">
                                        What financing options are available?
                                    </dt>
                                    <dd className="mt-3 font-body text-balance text-base leading-6 text-primary-300 max-w-2xl">
                                        We work with major Ghanaian banks and financial institutions to help secure
                                        mortgage financing. We also offer flexible payment plans for our developments
                                        and can connect you with reputable mortgage brokers who understand the local
                                        market.
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-display text-balance text-xl leading-6 font-bold text-primary-0">
                                        Do you handle property management services?
                                    </dt>
                                    <dd className="mt-3 font-body text-balance text-base leading-6 text-primary-300 max-w-2xl">
                                        Darwin Real Estate offers comprehensive property management services including
                                        tenant screening, rent collection, maintenance coordination, and regular
                                        property inspections. Perfect for investors and diaspora clients.
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Faq
