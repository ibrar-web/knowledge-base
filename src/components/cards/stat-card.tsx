import { Card } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail: string;
}) {
  return (
    <Card className="p-5">
      <p className="text-sm text-[var(--muted-foreground)]">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)]">{value}</p>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">{detail}</p>
    </Card>
  );
}
