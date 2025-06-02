import React from "react";

const Hero = () => {
  return (
    <div>
      <main>
        <div className="relative isolate">
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32 ">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="relative w-full ">
                  <h1 className="text-4xl table sm:text-7xl w-[600px] text-balance font-display tracking-tight text-5xl sm:text-5xl text-primary-0">
                    Let's get you a place to
                    <span className="text-[#435468] ml-2">Stay</span>
                    <span>.</span>
                  </h1>
                  <p className="mt-6 text-xl sm:max-w-md lg:max-w-none font-body text-balance leading-8 text-md md:text-xl text-primary-300">
                    Empower your team with our cutting-edge platform, designed
                    for scalability and performance. Build, deploy, and manage
                    your applications with ease.
                  </p>

                  <div className="flex items-center gap-x-2 w-full mt-6">
                    <div className="flex w-full max-w-[600px] items-stretch peer ocus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border-[#435468] text-white border-2 border-secondary-1200   min-h-14 text-sm md:text-base rounded-lg overflow-hidden">
                      <input
                        type="text"
                        name=""
                        id=""
                        className="flex-1 peer"
                      />
                      <button className="flex items-stretch shrink-0   bg-[#435468] text-white  gap-x-2 px-2 py-2 min-h-14 text-sm md:text-base rounded-lg rounded-tr-none rounded-br-none">
                        <div className="flex items-center gap-x-2 flex-1 text-center justify-center px-3">
                          Find Property
                        </div>

                        <div className="h-auto rounded-md flex items-center justify-center bg-white/10 w-10 px-2">
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

                    <button className="flex items-stretch  border-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-primary-300 px-2 py-2 min-h-14 text-sm md:text-base rounded-lg">
                      <div className="flex items-center gap-x-2 flex-1 text-center justify-center px-3">
                        Browse Properties
                      </div>

                      <div className="h-auto rounded-md flex items-center justify-center w-8 pr-2">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;
