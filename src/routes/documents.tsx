import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { documents } from "@/lib/data";
import { FileText, Upload, Download } from "lucide-react";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Documents — Lawyer OS" },
      { name: "description", content: "Case documents: pleadings, evidence, contracts and drafts." },
      { property: "og:title", content: "Documents — Lawyer OS" },
      { property: "og:description", content: "Case documents: pleadings, evidence, contracts and drafts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DocumentsPage,
});

function DocumentsPage() {
  return (
    <AppLayout title="Documents" subtitle={`${documents.length} files across all matters`}>
      <div className="mb-5 flex justify-end">
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Upload className="h-4 w-4" /> Upload Document
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-5 py-3 font-medium">Document</th>
              <th className="px-5 py-3 font-medium">Case</th>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium">Updated</th>
              <th className="px-5 py-3 font-medium">Size</th>
              <th className="px-5 py-3 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {documents.map((d) => (
              <tr key={d.id} className="transition-colors hover:bg-secondary/40">
                <td className="px-5 py-4">
                  <span className="flex items-center gap-2.5 font-medium text-foreground">
                    <FileText className="h-4 w-4 text-accent" /> {d.name}
                  </span>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{d.caseTitle}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">{d.kind}</span>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{d.updated}</td>
                <td className="px-5 py-4 text-muted-foreground">{d.size}</td>
                <td className="px-5 py-4 text-right">
                  <button className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                    <Download className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
