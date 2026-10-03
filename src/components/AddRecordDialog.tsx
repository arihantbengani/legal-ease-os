import { useState, type FormEvent } from "react";
import { Plus, X } from "lucide-react";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "number" | "select";
  options?: string[];
  required?: boolean;
  placeholder?: string;
};

export function AddRecordDialog({
  label,
  fields,
  onSubmit,
}: {
  label: string;
  fields: Field[];
  onSubmit: (values: Record<string, unknown>) => Promise<boolean>;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const handle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values: Record<string, unknown> = {};
    for (const f of fields) {
      const v = String(fd.get(f.name) ?? "").trim();
      if (f.type === "number") values[f.name] = v ? Number(v) : 0;
      else if (f.type === "date") values[f.name] = v || null;
      else values[f.name] = v;
    }
    setBusy(true);
    const ok = await onSubmit(values);
    setBusy(false);
    if (ok) setOpen(false);
  };

  const inputCls =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Plus className="h-4 w-4" /> {label}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4" onClick={() => setOpen(false)}>
          <form
            onSubmit={handle}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-foreground">{label}</h2>
              <button type="button" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              {fields.map((f) => (
                <label key={f.name} className="block">
                  <span className="mb-1 block text-sm font-medium text-foreground">
                    {f.label}
                    {f.required && <span className="text-destructive"> *</span>}
                  </span>
                  {f.type === "select" ? (
                    <select name={f.name} className={inputCls} defaultValue={f.options?.[0]}>
                      {f.options?.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      name={f.name}
                      type={f.type ?? "text"}
                      required={f.required}
                      placeholder={f.placeholder}
                      min={f.type === "number" ? 0 : undefined}
                      className={inputCls}
                    />
                  )}
                </label>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setOpen(false)} className="rounded-md border border-input px-4 py-2 text-sm">
                Cancel
              </button>
              <button
                disabled={busy}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
              >
                {busy ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}
