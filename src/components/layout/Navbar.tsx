"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="sticky top-0 z-50 h-16 w-full border-b border-border bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex flex-shrink-0 items-center gap-2 whitespace-nowrap">
          <div className="flex h-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-accent to-accent-dark px-3 py-1 font-bold text-accent-foreground shadow-sm">
            <span className="text-sm font-extrabold tracking-wider">INTERV</span>
            <span className="ml-1 rounded bg-white px-1 py-0.5 text-[10px] font-black text-accent">AI</span>
          </div>

        </a>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-text-dark transition-colors hover:text-accent"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="/login"
            className="text-sm font-semibold text-text-dark transition-colors hover:text-accent"
          >
            Log in
          </a>
          <a
            href="/register"
            className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            Get Started &rarr;
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-text-secondary hover:bg-surface-secondary hover:text-text-primary focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-b border-border bg-surface shadow-lg lg:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-text-dark hover:bg-surface-secondary hover:text-accent"
              >
                {link.name}
              </a>
            ))}
            <div className="border-t border-border mt-4 pt-4 pb-2 px-3 flex flex-col gap-3">
              <a
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center text-base font-semibold text-text-dark hover:text-accent"
              >
                Log in
              </a>
              <a
                href="/register"
                onClick={() => setIsOpen(false)}
                className="block text-center rounded-md bg-accent px-4 py-2.5 text-base font-medium text-accent-foreground shadow-sm hover:bg-accent-hover"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
