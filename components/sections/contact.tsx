import React from "react";

const Contact = () => {
  return (
    <section>
      <div>
        <div className="isolate -z-10 absolute h-full w-full top-0 left-0 bg-primary-2700"></div>

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:gap-x-10 lg:px-8 lg:py-40">
          <h2 className="text-balance font-display tracking-tight text-5xl sm:text-5xl text-primary-0">
            Let’s talk about your project
          </h2>
          <p className="mt-4 font-body text-balance leading-8 text-md md:text-xl text-primary-300">
            We help companies and individuals build out their brand guidelines.
          </p>
          <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
            <form action="#" method="POST" className="lg:flex-auto">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <div className="mt-2.5">
                    <div className="relative w-full flex flex-col gap-1">
                      <label className="block mb-1 font-body text-balance leading-6 font-semibold text-primary-0">
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
                      <label className="block mb-1 font-body text-balance leading-6 font-semibold text-primary-0">
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
                      <label className="block mb-1 font-body text-balance leading-6 font-semibold text-primary-0">
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
                      <label className="block mb-1 font-body text-balance leading-6 font-semibold text-primary-0">
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
                <button className="flex items-stretch focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-[#435468] text-white border-2 border-secondary-1200 gap-x-2 w-full px-2 py-2 min-h-14 text-sm md:text-base rounded-lg">
                  <div className="flex items-center gap-x-2 flex-1 text-center justify-center px-3">
                    Lets talk
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
              <p className="mt-4 font-body text-balance leading-5 text-sm text-primary-300">
                By submitting this form, I agree to the
                <a href="#" className="font-semibold text-secondary-0">
                  privacy&nbsp;policy
                </a>
                .
              </p>
            </form>
            <div className="lg:mt-6 lg:w-80 lg:flex-none">
              <svg
                width="150"
                viewBox="0 0 107 33"
                className="fill-secondary-0"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M56.3921 8.292C56.3921 9.481 55.4221 10.439 54.2191 10.439C53.9354 10.4412 53.654 10.3874 53.3911 10.2806C53.1282 10.1738 52.8889 10.0162 52.6871 9.81668C52.4853 9.61719 52.3249 9.37981 52.2151 9.11817C52.1052 8.85652 52.0482 8.57576 52.0471 8.292C52.0471 7.102 52.9831 6.145 54.2191 6.145C55.4571 6.178 56.3921 7.135 56.3921 8.292ZM47.4341 12.619V13.148C47.4341 13.148 46.3981 11.826 44.1921 11.826C40.5481 11.826 37.7071 14.568 37.7071 18.366C37.7071 22.132 40.5151 24.906 44.1921 24.906C46.4321 24.906 47.4341 23.553 47.4341 23.553V24.113C47.4341 24.378 47.6341 24.576 47.9021 24.576H50.6091V12.156H47.9021C47.7796 12.1583 47.6626 12.2076 47.5754 12.2938C47.4883 12.38 47.4377 12.4965 47.4341 12.619ZM47.4341 20.579C46.9331 21.307 45.9301 21.934 44.7271 21.934C42.5871 21.934 40.9491 20.613 40.9491 18.366C40.9491 16.12 42.5871 14.799 44.7271 14.799C45.8971 14.799 46.9671 15.459 47.4341 16.153V20.579ZM52.6151 12.156H55.8241V24.576H52.6151V12.156ZM100.549 11.826C98.3431 11.826 97.3061 13.148 97.3061 13.148V6.178H94.0981V24.577H96.8051C96.9278 24.5752 97.0451 24.526 97.1323 24.4397C97.2196 24.3534 97.27 24.2367 97.2731 24.114V23.553C97.2731 23.553 98.3091 24.907 100.515 24.907C104.159 24.907 107 22.133 107 18.367C107 14.602 104.158 11.826 100.549 11.826ZM100.014 21.901C98.7771 21.901 97.8081 21.274 97.3061 20.547V16.12C97.8081 15.46 98.8771 14.766 100.014 14.766C102.154 14.766 103.791 16.087 103.791 18.333C103.791 20.58 102.154 21.901 100.014 21.901ZM92.4271 17.211V24.61H89.2171V17.574C89.2171 15.526 88.5491 14.7 86.7451 14.7C85.7751 14.7 84.7731 15.196 84.1361 15.923V24.577H80.9281V12.157H83.4681C83.7351 12.157 83.9361 12.388 83.9361 12.619V13.148C84.8721 12.19 86.1091 11.826 87.3461 11.826C88.7491 11.826 89.9191 12.223 90.8561 13.016C91.9911 13.941 92.4271 15.13 92.4271 17.211ZM73.1391 11.826C70.9331 11.826 69.8971 13.148 69.8971 13.148V6.178H66.6871V24.577H69.3951C69.5178 24.5752 69.6351 24.526 69.7223 24.4397C69.8096 24.3534 69.86 24.2367 69.8631 24.114V23.553C69.8631 23.553 70.9001 24.907 73.1051 24.907C76.7491 24.907 79.5901 22.133 79.5901 18.367C79.6241 14.601 76.7831 11.826 73.1391 11.826ZM72.6041 21.9C71.3671 21.9 70.3981 21.273 69.8971 20.546V16.12C70.3981 15.46 71.4671 14.766 72.6041 14.766C74.7441 14.766 76.3811 16.087 76.3811 18.333C76.3811 20.58 74.7441 21.9 72.6041 21.9ZM63.9141 11.825C64.8821 11.825 65.3841 11.99 65.3841 11.99V14.93C65.3841 14.93 62.7101 14.038 61.0391 15.921V24.609H57.8291V12.156H60.5371C60.8051 12.156 61.0051 12.388 61.0051 12.619V13.148C61.6071 12.454 62.9111 11.826 63.9131 11.826L63.9141 11.825ZM30.5861 23.454C30.4191 23.057 30.2521 22.628 30.0851 22.264C29.8171 21.67 29.5501 21.108 29.3161 20.58L29.2831 20.547C26.9418 15.5112 24.4784 10.5331 21.8951 5.617L21.7951 5.417C21.5208 4.9033 21.2535 4.38592 20.9931 3.865C20.6591 3.27 20.3251 2.643 19.7901 2.048C18.7201 0.727 17.1841 0 15.5461 0C13.8741 0 12.3701 0.727 11.2681 1.982C10.7661 2.576 10.3981 3.204 10.0641 3.799C9.80313 4.31992 9.53578 4.83763 9.26211 5.352L9.16211 5.55C6.58811 10.505 4.08211 15.526 1.77511 20.48L1.74111 20.546C1.50711 21.076 1.23911 21.636 0.971114 22.231C0.805114 22.594 0.638114 22.991 0.471114 23.42C0.0361142 24.642 -0.0978858 25.798 0.0701142 26.988C0.253183 28.2015 0.750522 29.346 1.51274 30.3079C2.27496 31.2697 3.27554 32.0155 4.41511 32.471C5.28511 32.835 6.18711 33 7.12311 33C7.39011 33 7.72411 32.967 7.99311 32.934C9.17085 32.7863 10.3071 32.4044 11.3351 31.811C12.7051 31.051 14.0091 29.961 15.4801 28.376C16.9501 29.961 18.2881 31.051 19.6251 31.811C20.7281 32.439 21.8651 32.801 22.9671 32.934C23.2351 32.967 23.5691 33 23.8371 33C24.7731 33 25.7081 32.835 26.5441 32.471C27.6846 32.0167 28.6861 31.2714 29.4486 30.3093C30.2112 29.3472 30.7082 28.2021 30.8901 26.988C31.1551 25.832 31.0211 24.676 30.5861 23.454ZM15.5121 25.17C13.7071 22.924 12.5371 20.81 12.1361 19.027C11.9691 18.267 11.9361 17.607 12.0361 17.011C12.1021 16.483 12.3031 16.021 12.5711 15.624C13.2061 14.733 14.2761 14.171 15.5131 14.171C16.7501 14.171 17.8531 14.699 18.4541 15.624C18.7221 16.02 18.9221 16.484 18.9901 17.011C19.0901 17.606 19.0561 18.3 18.8901 19.027C18.4871 20.777 17.3171 22.891 15.5121 25.17ZM28.8491 26.723C28.6151 28.44 27.4451 29.927 25.8071 30.588C25.0051 30.918 24.1361 31.018 23.2671 30.918C22.4321 30.818 21.5951 30.554 20.7271 30.059C19.5231 29.399 18.3201 28.375 16.9171 26.855C19.1221 24.18 20.4591 21.735 20.9611 19.555C21.1787 18.6357 21.2352 17.6856 21.1281 16.747C21.0037 15.9389 20.6947 15.1703 20.2251 14.501C19.1881 13.014 17.4501 12.155 15.5121 12.155C13.5741 12.155 11.8351 13.047 10.7991 14.501C10.3297 15.1704 10.0207 15.9389 9.89611 16.747C9.76311 17.607 9.79611 18.564 10.0631 19.555C10.5651 21.735 11.9351 24.212 14.1081 26.888C12.7381 28.408 11.5001 29.432 10.2971 30.092C9.42711 30.588 8.59211 30.852 7.75711 30.952C6.89624 31.047 6.02513 30.9338 5.21711 30.622C3.57911 29.96 2.40911 28.473 2.17511 26.756C2.06454 25.8857 2.1675 25.0016 2.47511 24.18C2.57511 23.849 2.74311 23.519 2.91011 23.123C3.14411 22.594 3.41111 22.032 3.67911 21.471L3.71311 21.405C6.0496 16.4051 8.50125 11.4597 11.0661 6.573L11.1661 6.375C11.4341 5.88 11.7021 5.351 11.9691 4.855C12.2361 4.327 12.5371 3.831 12.9051 3.402C13.6071 2.61 14.5421 2.18 15.5791 2.18C16.6161 2.18 17.5511 2.61 18.2531 3.402C18.6211 3.832 18.9221 4.328 19.1891 4.856C19.4571 5.351 19.7241 5.88 19.9911 6.375L20.0911 6.573C22.6256 11.4811 25.0663 16.437 27.4121 21.438V21.471C27.6801 22.001 27.9141 22.594 28.1821 23.124C28.3481 23.519 28.5151 23.849 28.6161 24.18C28.8821 25.038 28.9831 25.864 28.8491 26.723Z" />
              </svg>

              <figure className="mt-6">
                <blockquote className="font-body text-balance text-base leading-6 text-primary-300">
                  <p>
                    “Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nemo expedita voluptas culpa sapiente alias molestiae.
                    Numquam corrupti in laborum sed rerum et corporis.”
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
                      Brenna Goyette
                    </div>
                    <div className=" font-body text-balance text-base leading-6 text-primary-300">
                      CEO of Workcation
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
