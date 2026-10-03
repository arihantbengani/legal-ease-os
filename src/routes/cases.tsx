import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, StatusBadge } from "@/components/AppLayout";
import { cases, inr } from "@/lib/data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/cases")({
  head: () => ({
    meta: [
      { title: "Cases — Lawyer OS" },
      { name: "description", content: "All active and closed matters with status, court and next hearing dates." },
      { property: "og:title", content: "Cases — Lawyer OS" },
      { property: "og:description", content: "All active and closed matters with status, court and next hearing dates." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CasesPage,
});

function CasesPage() {
  return (
    <AppLayout title="Cases" subtitle={`${cases.length} matters on record`}>
      <div className="mb-5 flex justify-end">
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="h-4 w-4" /> New Case
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-5 py-3 font-medium">Case</th>
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-5 py-3 font-medium">Court / Forum</th>
              <th className="px-5 py-3 font-medium">Next Hearing</th>
              <th className="px-5 py-3 font-medium">Value</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {cases.map((c) => (
              <tr key={c.id} className="transition-colors hover:bg-secondary/40">
                <td className="px-5 py-4">
                  <p className="font-medium text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.id} · {c.type}</p>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{c.client}</td>
                <td className="px-5 py-4 text-muted-foreground">{c.court}</td>
                <td className="px-5 py-4 font-medium">{c.nextHearing}</td>
                <td className="px-5 py-4">{inr(c.value)}</td>
                <td className="px-5 py-4"><StatusBadge status={c.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
