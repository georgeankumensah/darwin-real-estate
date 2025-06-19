import React from "react";

const Contact = () => {
    return (
        <section>
            <div>
                <div className="isolate -z-10 absolute h-full w-full top-0 left-0 bg-primary-2700"></div>

                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:gap-x-10 lg:px-8 lg:py-40">
                    <h2 className="text-balance font-display tracking-tight text-5xl sm:text-5xl text-primary-0">
                        Let's find your dream property
                    </h2>
                    <p className="mt-4 font-body text-balance leading-8 text-md md:text-xl text-primary-300">
                        Ready to invest in Ghana's thriving real estate market? Our expert team is here to guide you
                        through every step of your property journey.
                    </p>
                    <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
                        <form action="#" method="POST" className="lg:flex-auto">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div>
                                    <div className="mt-2.5">
                                        <div className="relative w-full flex flex-col gap-1">
                                            <label
                                                className="block mb-1 font-body text-balance leading-6 font-semibold text-primary-0">
                                                First name
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Enter your first name"
                                                    className="flex-1 w-full rounded-md bg-primary-1400/0 border-primary-1000 border-solid border-2 placeholder:text-primary-300/40 text-primary-300 focus:ring-secondary-0 focus:border-secondary-0 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 text-base min-h-14 min-w-[250px]"
                                                    id="first-name"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-2.5">
                                        <div className="relative w-full flex flex-col gap-1">
                                            <label
                                                className="block mb-1 font-body text-balance leading-6 font-semibold text-primary-0">
                                                Last name
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Enter your last name"
                                                    className="flex-1 w-full rounded-md bg-primary-1400/0 border-primary-1000 border-solid border-2 placeholder:text-primary-300/40 text-primary-300 focus:ring-secondary-0 focus:border-secondary-0 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 text-base min-h-14 min-w-[250px]"
                                                    id="last-name"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-2.5">
                                        <div className="relative w-full flex flex-col gap-1">
                                            <label
                                                className="block mb-1 font-body text-balance leading-6 font-semibold text-primary-0">
                                                Budget
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Enter your budget"
                                                    className="flex-1 w-full rounded-md bg-primary-1400/0 border-primary-1000 border-solid border-2 placeholder:text-primary-300/40 text-primary-300 focus:ring-secondary-0 focus:border-secondary-0 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 text-base min-h-14 min-w-[250px]"
                                                    id="budget"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-2.5">
                                        <div className="relative w-full flex flex-col gap-1">
                                            <label
                                                className="block mb-1 font-body text-balance leading-6 font-semibold text-primary-0">
                                                Website
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Enter your website"
                                                    className="flex-1 w-full rounded-md bg-primary-1400/0 border-primary-1000 border-solid border-2 placeholder:text-primary-300/40 text-primary-300 focus:ring-secondary-0 focus:border-secondary-0 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 text-base min-h-14 min-w-[250px]"
                                                    id="website"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <div className="mt-2.5">
                                        <div className="flex flex-col gap-1 w-full">
                                            <label
                                                htmlFor="countries"
                                                className="block mb-2 font-body text-balance leading-6 font-semibold text-primary-0"
                                            >
                                                Message
                                            </label>
                                            <textarea
                                                rows={5}
                                                className="flex-1 w-full rounded-md bg-primary-1400/0 border-primary-1000 border-solid border-2 placeholder:text-primary-300/40 text-primary-300 focus:ring-secondary-0 focus:border-secondary-0 disabled:opacity-50 disabled:cursor-not-allowed text-base/6 p-4"
                                                placeholder="Enter your message"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10">
                                <button
                                    className="flex items-stretch focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-[#435468] text-white border-2 border-secondary-1200 gap-x-2 w-full px-2 py-2 min-h-14 text-sm md:text-base rounded-lg">
                                    <div className="flex items-center gap-x-2 flex-1 text-center justify-center px-3">
                                        Lets talk
                                    </div>

                                    <div
                                        className="h-auto rounded-md flex items-center justify-center bg-white/10 w-10 px-2">
                                        <svg
                                            className=""
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                            <p className="mt-4 font-body text-balance leading-5 text-sm text-primary-300">
                                By submitting this form, I agree to the
                                <a href="#" className="font-semibold text-secondary-0">
                                    privacy&nbsp;policy
                                </a>
                                .
                            </p>
                        </form>
                        <div className="lg:mt-6 lg:w-80 lg:flex-none">
                            <p className="font-body text-3xl text-balance leading-6 font-semibold text-primary-0">
                                Darwin Real Estate
                            </p>
                            <figure className="mt-6">
                                <blockquote className="font-body text-balance text-base leading-6 text-primary-300">
                                    <p>
                                        "Darwin Real Estate has been our trusted partner in Ghana's property market for
                                        over a decade. Their expertise and commitment to excellence make them the go-to
                                        choice for serious property investors."
                                    </p>
                                </blockquote>
                                <figcaption className="mt-10 flex gap-x-6">
                                    <img
                                        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=96&h=96&q=80"
                                        alt=""
                                        className="size-12 flex-none rounded-full bg-gray-50 shadow-[0_0_0_2px_currentColor] text-secondary-0"
                                    />
                                    <div className="flex flex-col">
                                        <div className="font-body text-balance leading-6 font-semibold text-primary-0">
                                            Nana Akoto Bamfo
                                        </div>
                                        <div className=" font-body text-balance text-base leading-6 text-primary-300">
                                            CEO, Ghana Property Investors Association
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
