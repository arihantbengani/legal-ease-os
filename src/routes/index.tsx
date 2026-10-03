import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout, StatusBadge } from "@/components/AppLayout";
import { cases, hearings, invoices, clients, inr } from "@/lib/data";
import { Briefcase, Users, CalendarDays, IndianRupee, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lawyer OS — Chambers Dashboard" },
      { name: "description", content: "Practice management for advocates: cases, clients, hearings, documents and billing in one place." },
      { property: "og:title", content: "Lawyer OS — Chambers Dashboard" },
      { property: "og:description", content: "Practice management for advocates: cases, clients, hearings, documents and billing in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const activeCases = cases.filter((c) => c.status !== "Closed").length;
  const outstanding = invoices.filter((i) => i.status !== "Paid").reduce((s, i) => s + i.amount, 0);

  const stats = [
    { label: "Active Cases", value: String(activeCases), icon: Briefcase, to: "/cases" },
    { label: "Clients", value: String(clients.length), icon: Users, to: "/clients" },
    { label: "Upcoming Hearings", value: String(hearings.length), icon: CalendarDays, to: "/hearings" },
    { label: "Outstanding Fees", value: inr(outstanding), icon: IndianRupee, to: "/billing" },
  ] as const;

  return (
    <AppLayout title="Dashboard" subtitle="Saturday, 3 October 2026 — Chambers overview">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="group rounded-lg border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <s.icon className="h-4 w-4 text-accent" />
            </div>
            <p className="mt-2 font-display text-3xl font-bold text-foreground">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="rounded-lg border border-border bg-card shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-display text-lg font-bold">Priority Cases</h2>
            <Link to="/cases" className="flex items-center gap-1 text-sm font-medium text-accent hover:underline">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {cases.slice(0, 4).map((c) => (
              <li key={c.id} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="font-medium text-foreground">{c.title}</p>
                  <p className="text-sm text-muted-foreground">{c.id} · {c.type} · {c.court}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">Next hearing</p>
                    <p className="font-medium">{c.nextHearing}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-display text-lg font-bold">Next Hearings</h2>
            <Link to="/hearings" className="flex items-center gap-1 text-sm font-medium text-accent hover:underline">
              Diary <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {hearings.slice(0, 4).map((h) => (
              <li key={h.id} className="px-5 py-4">
                <p className="font-medium text-foreground">{h.caseTitle}</p>
                <p className="text-sm text-muted-foreground">{h.date} · {h.time}</p>
                <p className="mt-1 text-xs text-muted-foreground">{h.purpose} — {h.judge}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppLayout>
  );
}
