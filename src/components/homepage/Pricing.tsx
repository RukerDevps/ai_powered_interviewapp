"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Shield } from "lucide-react";

export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      description: "For getting started",
      priceMonthly: 0,
      priceYearly: 0,
      billingSuffix: "/ month",
      features: [
        "3 AI Mock Interviews / month",
        "Basic Feedback",
        "Limited Question Bank",
        "Email Support",
      ],
      ctaText: "Get Started",
      ctaHref: "/register",
      isPopular: false,
      trialText: null,
    },
    {
      name: "Pro",
      description: "For serious interview prep",
      priceMonthly: 19,
      priceYearly: 15, // Save 20%
      billingSuffix: "/ month",
      features: [
        "Unlimited AI Interviews",
        "Real-time Feedback",
        "Detailed Analytics",
        "Custom Question Sets",
        "Priority Email Support",
      ],
      ctaText: "Start Pro Trial",
      ctaHref: "/register?plan=pro",
      isPopular: true,
      trialText: "7-day free trial",
    },
    {
      name: "Team",
      description: "For small teams",
      priceMonthly: 49,
      priceYearly: 39, // Save ~20%
      billingSuffix: "/ month",
      priceSubtext: "Per user",
      features: [
        "Everything in Pro",
        "Team Dashboard",
        "Interview Templates",
        "Performance Reports",
        "Team Support",
      ],
      ctaText: "Start Team Trial",
      ctaHref: "/register?plan=team",
      isPopular: false,
      trialText: "7-day free trial",
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      priceMonthly: "Custom",
      priceYearly: "Custom",
      billingSuffix: " / year",
      features: [
        "Everything in Team",
        "Custom Integrations",
        "Advanced Security",
        "Dedicated Success Manager",
        "SLA & Priority Support",
      ],
      ctaText: "Contact Sales",
      ctaHref: "/contact",
      isPopular: false,
      trialText: null,
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-20 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light text-accent text-xs font-semibold tracking-wide uppercase">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-text-secondary text-sm sm:text-base">
            Choose the perfect plan to ace your interviews. Upgrade or downgrade anytime, no hidden fees.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-sm font-semibold transition-colors ${!isYearly ? "text-text-primary" : "text-text-secondary"}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-accent transition-colors duration-200 ease-in-out focus:outline-none"
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-surface shadow ring-0 transition duration-200 ease-in-out ${
                isYearly ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-sm font-semibold transition-colors ${isYearly ? "text-text-primary" : "text-text-secondary"}`}>
            Yearly
          </span>
          <span className="inline-flex items-center rounded-full bg-success-lightest px-2 py-0.5 text-xs font-semibold text-success-foreground">
            Save 20%
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {plans.map((plan) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;
            const formattedPrice = typeof price === "number" ? `$${price}` : price;

            return (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-2xl bg-surface border transition-all duration-300 ${
                  plan.isPopular
                    ? "border-2 border-accent shadow-xl md:-translate-y-2 scale-[1.02]"
                    : "border-border shadow-sm hover:shadow-md hover:border-border-muted"
                } p-6`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute top-0 inset-x-0 -translate-y-1/2 flex justify-center">
                    <span className="rounded-full bg-accent px-4 py-1 text-2xs font-extrabold uppercase tracking-widest text-accent-foreground shadow-sm">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-text-primary">{plan.name}</h3>
                  <p className="text-xs text-text-secondary mt-1">{plan.description}</p>
                  <div className="mt-5 flex items-baseline">
                    <span className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
                      {formattedPrice}
                    </span>
                    <span className="text-xs font-semibold text-text-secondary ml-1">
                      {plan.billingSuffix}
                    </span>
                  </div>
                  {plan.priceSubtext && (
                    <p className="text-[10px] font-semibold text-text-muted mt-1 uppercase tracking-wider">
                      {plan.priceSubtext}
                    </p>
                  )}
                </div>

                {/* Features list */}
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm text-text-dark font-medium leading-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Action */}
                <div className="space-y-2 text-center mt-auto">
                  <Link
                    href={plan.ctaHref}
                    className={`w-full inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold transition-all ${
                      plan.isPopular
                        ? "bg-accent text-accent-foreground hover:bg-accent-hover hover:shadow-lg shadow-accent/20"
                        : "bg-surface border border-border text-text-primary hover:bg-surface-secondary"
                    }`}
                  >
                    {plan.ctaText}
                  </Link>
                  {plan.trialText && (
                    <p className="text-[10px] text-text-muted font-medium uppercase tracking-wider">
                      {plan.trialText}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-16 flex items-center justify-center gap-2 text-text-secondary">
          <Shield className="h-5 w-5 text-accent" />
          <span className="text-xs sm:text-sm font-medium">
            30-day money-back guarantee. Cancel anytime.
          </span>
        </div>
      </div>
    </section>
  );
};
