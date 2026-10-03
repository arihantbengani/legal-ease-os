import { Link, useRouterState } from "@tanstack/react-router";
import {
  Scale,
  LayoutDashboard,
  Briefcase,
  Users,
  CalendarDays,
  FileText,
  Receipt,
  Search,
  Bell,
} from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/cases", label: "Cases", icon: Briefcase },
  { to: "/clients", label: "Clients", icon: Users },
  { to: "/hearings", label: "Hearings", icon: CalendarDays },
  { to: "/documents", label: "Documents", icon: FileText },
  { to: "/billing", label: "Billing", icon: Receipt },
] as const;

export function AppLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-sidebar text-sidebar-foreground">
        <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Scale className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-lg font-bold leading-tight">Lawyer OS</p>
            <p className="text-xs text-sidebar-foreground/60">Chambers of A. Bengani</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {nav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border px-6 py-4 text-xs text-sidebar-foreground/50">
          Bar Council of West Bengal
          <br />
          Enrolment No. WB/2014/08812
        </div>
      </aside>

      <div className="ml-64 flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/90 px-8 py-4 backdrop-blur">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-md border border-input bg-card px-3 py-2 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              <input
                placeholder="Search cases, clients…"
                className="w-44 bg-transparent outline-none placeholder:text-muted-foreground/70"
              />
            </div>
            <button className="relative rounded-md border border-input bg-card p-2 text-muted-foreground transition-colors hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
              AB
            </div>
          </div>
        </header>
        <main className="flex-1 px-8 py-8">{children}</main>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: "bg-secondary text-secondary-foreground",
    Pending: "bg-muted text-muted-foreground",
    Discovery: "bg-secondary text-secondary-foreground",
    Trial: "bg-primary text-primary-foreground",
    Closed: "bg-muted text-muted-foreground line-through-none",
    Paid: "bg-secondary text-secondary-foreground",
    Outstanding: "bg-accent/20 text-accent-foreground",
    Overdue: "bg-destructive/10 text-destructive",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] ?? "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
}
