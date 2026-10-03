import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { hearings } from "@/lib/data";
import { Gavel, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/hearings")({
  head: () => ({
    meta: [
      { title: "Hearings — Lawyer OS" },
      { name: "description", content: "Court diary: upcoming hearings, courts, judges and purpose of listing." },
      { property: "og:title", content: "Hearings — Lawyer OS" },
      { property: "og:description", content: "Court diary: upcoming hearings, courts, judges and purpose of listing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HearingsPage,
});

function HearingsPage() {
  return (
    <AppLayout title="Court Diary" subtitle="Upcoming hearings and listings">
      <div className="space-y-4">
        {hearings.map((h) => {
          const [month = "", day = "", year = ""] = h.date.split(" ");
          return (
          <div key={h.id} className="flex gap-5 rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="flex w-24 flex-col items-center justify-center rounded-md bg-primary py-3 text-primary-foreground">
              <span className="font-display text-2xl font-bold">{day.replace(",", "")}</span>
              <span className="text-xs uppercase tracking-wide">{month} {year}</span>
            </div>
            <div className="flex-1">
              <p className="font-display text-lg font-bold text-foreground">{h.caseTitle}</p>
              <p className="mt-0.5 text-sm font-medium text-accent">{h.purpose}</p>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {h.time}</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {h.court}</span>
                <span className="flex items-center gap-1.5"><Gavel className="h-3.5 w-3.5" /> {h.judge}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
