import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Scale } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Lawyer OS" },
      { name: "description", content: "Sign in to Lawyer OS to manage your cases, clients, hearings and billing." },
      { property: "og:title", content: "Sign in — Lawyer OS" },
      { property: "og:description", content: "Sign in to Lawyer OS to manage your cases, clients, hearings and billing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (session) navigate({ to: "/" });
  }, [session, navigate]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    setBusy(true);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error(error.message);
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin, data: { full_name: String(fd.get("name") ?? "") } },
      });
      if (error) toast.error(error.message);
      else toast.success("Check your email to confirm your account.");
    }
    setBusy(false);
  };

  const google = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) toast.error(String(r.error.message ?? r.error));
  };

  const inputCls = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="flex min-h-screen items-center justify-center bg-sidebar p-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8 shadow-xl">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Scale className="h-6 w-6" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Lawyer OS</h1>
          <p className="text-sm text-muted-foreground">{mode === "in" ? "Sign in to your chambers" : "Create your chambers account"}</p>
        </div>
        <button onClick={google} className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted">
          Continue with Google
        </button>
        <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
        </div>
        <form onSubmit={submit} className="space-y-3">
          {mode === "up" && <input name="name" placeholder="Full name" className={inputCls} />}
          <input name="email" type="email" required placeholder="Email" className={inputCls} />
          <input name="password" type="password" required minLength={6} placeholder="Password" className={inputCls} />
          <button disabled={busy} className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">
            {busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {mode === "in" ? "New here? " : "Already have an account? "}
          <button onClick={() => setMode(mode === "in" ? "up" : "in")} className="font-medium text-accent hover:underline">
            {mode === "in" ? "Create an account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
