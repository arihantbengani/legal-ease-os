import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, StatusBadge } from "@/components/AppLayout";
import { invoices, inr } from "@/lib/data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/billing")({
  head: () => ({
    meta: [
      { title: "Billing — Lawyer OS" },
      { name: "description", content: "Fee invoices, outstanding amounts and payment status." },
      { property: "og:title", content: "Billing — Lawyer OS" },
      { property: "og:description", content: "Fee invoices, outstanding amounts and payment status." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BillingPage,
});

function BillingPage() {
  const paid = invoices.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const outstanding = invoices.filter((i) => i.status === "Outstanding").reduce((s, i) => s + i.amount, 0);
  const overdue = invoices.filter((i) => i.status === "Overdue").reduce((s, i) => s + i.amount, 0);

  return (
    <AppLayout title="Billing" subtitle="Fees and invoices">
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Collected</p>
          <p className="mt-1 font-display text-2xl font-bold text-foreground">{inr(paid)}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Outstanding</p>
          <p className="mt-1 font-display text-2xl font-bold text-foreground">{inr(outstanding)}</p>
        </div>
        <div className="rounded-lg border border-destructive/30 bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Overdue</p>
          <p className="mt-1 font-display text-2xl font-bold text-destructive">{inr(overdue)}</p>
        </div>
      </div>

      <div className="mb-5 flex justify-end">
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="h-4 w-4" /> New Invoice
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-5 py-3 font-medium">Invoice</th>
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-5 py-3 font-medium">Issued</th>
              <th className="px-5 py-3 font-medium">Due</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {invoices.map((i) => (
              <tr key={i.id} className="transition-colors hover:bg-secondary/40">
                <td className="px-5 py-4 font-medium text-foreground">{i.id}</td>
                <td className="px-5 py-4 text-muted-foreground">{i.client}</td>
                <td className="px-5 py-4 text-muted-foreground">{i.issued}</td>
                <td className="px-5 py-4 text-muted-foreground">{i.due}</td>
                <td className="px-5 py-4 font-medium">{inr(i.amount)}</td>
                <td className="px-5 py-4"><StatusBadge status={i.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
