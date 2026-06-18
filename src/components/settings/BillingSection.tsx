"use client";

import { CreditCard, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending";
}

export function BillingSection() {
  const invoices: Invoice[] = [
    { id: "inv-005", date: "May 01, 2025", amount: "$0.00", status: "paid" },
    { id: "inv-004", date: "Apr 01, 2025", amount: "$0.00", status: "paid" },
    { id: "inv-003", date: "Mar 01, 2025", amount: "$0.00", status: "paid" },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-border/60 pb-4">
        <h3 className="text-[18px] font-semibold leading-7 text-text-primary">Subscription & Billing</h3>
        <p className="text-sm font-medium text-text-secondary mt-0.5">
          Manage your subscription plan, billing details, and receipts.
        </p>
      </div>

      {/* Main Billing Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Subscription Card */}
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-secondary">Current Plan</p>
              <h4 className="text-[18px] font-semibold leading-7 text-text-primary mt-1">Free Plan</h4>
            </div>
            <span className="inline-flex items-center gap-1 rounded-md bg-accent-muted px-2 py-0.5 text-[10px] font-semibold text-accent border border-accent/20 uppercase tracking-wide">
              Active Plan
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-text-secondary">
              <span>Monthly Credits Used</span>
              <span>5 / 10 Credits</span>
            </div>
            <div className="h-2 w-full rounded-full bg-surface-secondary overflow-hidden border border-border/30">
              <div className="h-full w-1/2 bg-accent rounded-full" />
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Credits reset on July 01, 2025. Upgrade to Pro for unlimited interview sessions and priority streaming.
            </p>
          </div>

          <Button
            type="button"
            className="w-full h-11 bg-accent hover:bg-accent-hover text-accent-foreground font-semibold flex items-center justify-center gap-2 rounded-lg"
          >
            Upgrade to Pro ($15/month)
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Payment Method */}
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-secondary">Payment Details</p>
              <h4 className="text-sm font-semibold text-text-primary mt-1">Preferred Method</h4>
            </div>
            <CreditCard className="h-5 w-5 text-text-secondary" />
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-border bg-surface-secondary/40 p-4">
            <span className="flex h-10 w-12 shrink-0 items-center justify-center rounded bg-surface border border-border text-xs font-semibold text-text-secondary shadow-sm uppercase">
              Visa
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text-primary">Visa ending in 4242</p>
              <p className="text-xs text-text-secondary mt-0.5">Expires 12/2027</p>
            </div>
          </div>

          <p className="text-[11px] text-text-muted leading-relaxed">
            Your card is secure. Payments are managed via Stripe. To edit payment info, contact billing support.
          </p>
        </div>
      </div>

      {/* Invoice Billing History */}
      <div className="rounded-xl border border-border bg-surface p-5 shadow-sm space-y-4">
        <h4 className="text-sm font-semibold text-text-primary uppercase tracking-[0.12em]">Billing History</h4>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-xs font-semibold text-text-secondary uppercase tracking-wider">
                <th className="pb-3 pr-4">Invoice ID</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3 pr-4">Amount</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-border/40 last:border-0 hover:bg-surface-secondary/20 transition-colors">
                  <td className="py-3.5 pr-4 font-semibold text-text-primary">{inv.id}</td>
                  <td className="py-3.5 pr-4 text-text-secondary font-medium">{inv.date}</td>
                  <td className="py-3.5 pr-4 text-text-primary font-semibold">{inv.amount}</td>
                  <td className="py-3.5 pr-4">
                    <span className="inline-flex items-center gap-1 rounded-md bg-success-lightest px-2 py-0.5 text-[10px] font-semibold text-success border border-success/15 uppercase tracking-wide">
                      <CheckCircle2 className="h-3 w-3" />
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 ml-auto">
                      Download PDF
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
