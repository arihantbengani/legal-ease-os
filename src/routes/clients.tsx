import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { clients, inr } from "@/lib/data";
import { Mail, Phone, Plus } from "lucide-react";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients — Lawyer OS" },
      { name: "description", content: "Client directory with contact details, active matters and billed amounts." },
      { property: "og:title", content: "Clients — Lawyer OS" },
      { property: "og:description", content: "Client directory with contact details, active matters and billed amounts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ClientsPage,
});

function ClientsPage() {
  return (
    <AppLayout title="Clients" subtitle={`${clients.length} clients on record`}>
      <div className="mb-5 flex justify-end">
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add Client
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {clients.map((c) => (
          <div key={c.id} className="rounded-lg border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-lg font-bold text-foreground">{c.name}</p>
                <p className="text-sm text-muted-foreground">{c.company}</p>
              </div>
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                {c.activeCases} active
              </span>
            </div>
            <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> {c.email}</p>
              <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {c.phone}</p>
            </div>
            <div className="mt-4 border-t border-border pt-3 text-sm">
              <span className="text-muted-foreground">Total billed: </span>
              <span className="font-medium text-foreground">{inr(c.billed)}</span>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
