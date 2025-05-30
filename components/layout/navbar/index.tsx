'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative z-50 w-full bg-[#435468] text-[#c6cfd0] shadow-sm">
    
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-x-2">
         <img src="/darwin.png" alt="logo" className="h-[40px]" />
           <div className="flex flex-col">
          <span className="text-[18px] leading-[18px] font-semibold text-primary-300">Darwin</span>
          <span className="text-[#90b6e1] text-[12px]">
            Real Estate Management
          </span>
        </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-x-8 items-center">
          <Link href="#" className="text-primary-300 hover:text-secondary-0 transition">Home</Link>
          <Link href="#" className="text-primary-300 hover:text-secondary-0 transition">Features</Link>
          <Link href="#" className="text-primary-300 hover:text-secondary-0 transition">Pricing</Link>
          <Link href="#" className="text-primary-300 hover:text-secondary-0 transition">Contact</Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href="#"
            className="bg-secondary-1400 border-2 border-secondary-1200 text-white px-4 py-2 rounded-xl hover:bg-secondary-1000 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary-300"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary-2500 text-primary-300 border-t border-primary-1000">
          <nav className="flex flex-col px-4 py-4 gap-y-4">
            <Link href="#" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="#" onClick={() => setIsOpen(false)}>Features</Link>
            <Link href="#" onClick={() => setIsOpen(false)}>Pricing</Link>
            <Link href="#" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link
              href="#"
              className="bg-secondary-1400 border-2 border-secondary-1200 text-white px-4 py-2 mt-4 rounded-xl text-center"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
