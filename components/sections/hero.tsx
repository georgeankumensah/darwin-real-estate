"use client";

import React from "react";
import Link from "next/link";

const Hero = () => {
    return (
        <div>
            <main>
                <div className="relative isolate">
                    <div className="overflow-hidden">
                        <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32 ">
                            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center  ">
                                <div className="relative w-full md:w-1/2 lg:w-1/2">
                                    <h1 className="text-4xl table md:text-5xl lg:text-7xl text-balance font-display tracking-tight text-primary-0">
                                        Find Your Dream Property in Ghana.
                                    </h1>
                                    <p className="mt-6 text-xl sm:max-w-md lg:max-w-none font-body text-balance leading-8 text-md md:text-xl text-primary-300">
                                        Discover luxury homes, commercial spaces, and investment opportunities with
                                        Darwin Real Estate.
                                    </p>

                                    <div className="flex items-center w-full mt-6">
                                        <Link
                                            href="/explore"
                                            className="flex items-center bg-[#435468] text-white px-4 py-3 min-h-14 text-sm md:text-base rounded-lg overflow-hidden"
                                        >
                                            <span className="flex items-center gap-x-2">
                                              Explore Our Properties
                                              <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  className="w-5 h-5"
                                                  viewBox="0 0 24 24"
                                                  fill="currentColor"
                                              >
                                                <path d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z" />
                                              </svg>
                                            </span>
                                        </Link>
                                    </div>


                                </div>
                                <img src="/hero.png" alt="" className="hidden md:block lg:block w-1/2 h-full absolute right-0 top-0"/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Hero;
