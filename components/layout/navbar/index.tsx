"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <header className="bg-[#435468] text-[#c6cfd0] shadow-sm z-50 w-full">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-x-2">
            <img src="/darwin.png" alt="logo" className="h-[40px]" />
            <div className="flex flex-col leading-none">
              <span className="text-[18px] font-semibold text-white">Darwin</span>
              <span className="text-[#90b6e1] text-[12px]">Real Estate Management</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-x-8">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/explore" className="hover:text-white transition">Explore</Link>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex flex-col text-right gap-y-[4px]">
            <p className="text-[10px] leading-[10px]">Call Us Now</p>
            <h3 className="text-[18px] leading-[18px] font-bold">
              030 2752020 / <span className="text-[14px]">0243143143</span>
            </h3>
            <a
                className="text-[12px] underline font-medium"
                href="https://web.whatsapp.com/send?l=en&phone=233243143143"
                target="_blank"
                rel="noopener noreferrer"
            >
              or Chat Online
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white"
              aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
            className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <nav className="bg-[#354352] flex flex-col px-6 py-4 gap-y-4">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-white">Home</Link>
            <Link href="/explore" onClick={() => setIsOpen(false)} className="hover:text-white">Explore</Link>

            {/* Mobile CTA */}
            <div className="pt-4 border-t border-gray-600">
              <p className="text-[10px]">Call Us Now</p>
              <h3 className="text-[18px] font-bold">
                030 2752020 / <span className="text-[14px]">0243143143</span>
              </h3>
              <a
                  className="text-[12px] underline font-medium"
                  href="https://wa.me/233541733843"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                or Chat Online
              </a>
            </div>
          </nav>
        </div>
      </header>
  );
};

export default Navbar;
