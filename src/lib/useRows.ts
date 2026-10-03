import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type TableName = "clients" | "cases" | "hearings" | "documents" | "invoices";
export type Row<T extends TableName> = Database["public"]["Tables"][T]["Row"];

export function useRows<T extends TableName>(table: T, orderBy = "created_at", ascending = false) {
  const [rows, setRows] = useState<Row<T>[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data, error } = await supabase.from(table).select("*").order(orderBy, { ascending, nullsFirst: false });
    if (error) toast.error(error.message);
    setRows((data ?? []) as unknown as Row<T>[]);
    setLoading(false);
  }, [table, orderBy, ascending]);

  useEffect(() => {
    load();
  }, [load]);

  const add = async (values: Record<string, unknown>) => {
    const { error } = await supabase.from(table).insert(values as never);
    if (error) {
      toast.error(error.message);
      return false;
    }
    toast.success("Saved");
    await load();
    return true;
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return toast.error(error.message);
    await load();
  };

  const update = async (id: string, values: Record<string, unknown>) => {
    const { error } = await supabase.from(table).update(values as never).eq("id", id);
    if (error) return toast.error(error.message);
    await load();
  };

  return { rows, loading, add, remove, update, reload: load };
}

export const inr = (n: number | string) => "₹" + Number(n).toLocaleString("en-IN");

export const fmtDate = (d: string | null) =>
  d ? new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

export const today = () => new Date().toISOString().slice(0, 10);
