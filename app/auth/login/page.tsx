"use client";
import { Eye, EyeOff } from "lucide-react";
import React from "react";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <section>
      <div className="isolate -z-10 absolute h-full w-full top-0 left-0 bg-primary-2700"></div>

      <div className="mx-auto max-w-md px-6 py-24 sm:py-32 lg:py-40">
        <h2 className=" font-display tracking-tight text-5xl sm:text-5xl text-primary-0 ">
          Howdy, Admin!
        </h2>
        <p className="mt-4 font-body  leading-8 text-md md:text-xl text-primary-300">
          Log in to continue exploring your dashboard.
        </p>

        <form className="mt-16 space-y-8">
          <div>
            <label className="block mb-1 font-body leading-6 font-semibold text-primary-0">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 w-full rounded-md bg-primary-1400/0 border-primary-1000 border-2 placeholder:text-primary-300/40 text-primary-300 focus:ring-secondary-0 focus:border-secondary-0 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 text-base min-h-14"
            />
          </div>

          <div>
            <label className="block mb-1 font-body font-semibold text-primary-0">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-md bg-primary-1400/0 border-2 border-primary-1000 placeholder:text-primary-300/40 text-primary-300 focus:ring-secondary-0 focus:border-secondary-0 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 text-base min-h-14 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-300 hover:text-primary-100"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="text-right text-sm text-primary-300">
            <a
              href="#"
              className="hover:underline text-secondary-0 font-semibold"
            >
              Forgot your password?
            </a>
          </div>

          <div>
            <button className="flex items-stretch focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-[#435468] text-white border-2 border-secondary-1200 gap-x-2 w-full px-2 py-2 min-h-14 text-sm md:text-base rounded-lg">
              <div className="flex items-center gap-x-2 flex-1 text-center justify-center px-3">
                Sign in
              </div>
              <div className="h-auto rounded-md flex items-center justify-center bg-white/10 w-10 px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="M10 17l5-5-5-5v10z" />
                </svg>
              </div>
            </button>
          </div>

          <p className="text-sm text-center text-primary-300">
            Don’t have an account?{" "}
            <a href="#" className="font-semibold text-secondary-0">
              Sign up
            </a>
          </p>
        </form>
      </div>
      <div className=" bg-black h-[200px] w-full fixed z-10 bottom-0 [mask-image:url('https://assets.jijistatic.net/static/svg/footer/footer-ghana-new.svg');] [mask-repeat:no-repeat] [mask-size:contain] [mask-position:bottom]"/>
    </section>
  );
};

export default Login;
