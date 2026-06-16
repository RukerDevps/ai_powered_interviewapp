"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-surface mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Info */}
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-accent to-accent-dark px-3 py-1 font-bold text-accent-foreground shadow-sm">
                <span className="text-sm font-extrabold tracking-wider">INTERV</span>
                <span className="ml-1 rounded bg-white px-1 py-0.5 text-[10px] font-black text-accent">AI</span>
              </div>
            </Link>
            <p className="text-sm text-text-secondary max-w-xs">
              AI-powered mock interviews with real-time feedback and insights to help you land your dream job.
            </p>
            <div className="flex items-center space-x-6">
              <a href="https://twitter.com" className="inline-flex h-9 w-9 items-center justify-center text-text-muted transition-colors hover:text-accent" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Twitter / X</span>
                <svg className="block h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://linkedin.com" className="inline-flex h-9 w-9 items-center justify-center text-text-muted transition-colors hover:text-accent" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">LinkedIn</span>
                <svg className="block h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://github.com" className="inline-flex h-9 w-9 items-center justify-center text-text-muted transition-colors hover:text-accent" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">GitHub</span>
                <svg className="block h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://discord.com" className="inline-flex h-9 w-9 items-center justify-center text-text-muted transition-colors hover:text-accent" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Discord</span>
                <svg className="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21.593 7.203a2.5 2.5 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.52 2.52 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831M9.996 15.005l.005-6 5.207 3.005z"/>
                </svg>
              </a>
            </div>
          </div>


          {/* Navigation Links Grid */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 sm:grid-cols-3">
            <div>
              <h3 className="text-xs font-semibold text-text-dark tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link href="#features" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/#features" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-text-dark tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link href="/resources" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    Interview Tips
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-semibold text-text-dark tracking-wider uppercase">Newsletter</h3>
              <p className="mt-4 text-sm text-text-secondary">
                Get interview tips and updates delivered to your inbox.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-md border border-border px-3 py-2 text-sm text-text-primary placeholder-text-muted bg-surface focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-accent p-2 text-accent-foreground hover:bg-accent-hover transition-colors shadow-sm"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex items-center justify-between">
          <p className="text-xs text-text-muted">&copy; 2025 IntervAI. All rights reserved.</p>
          <div className="flex space-x-6 text-xs text-text-muted">
            <Link href="/#features" className="hover:underline">About Us</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
