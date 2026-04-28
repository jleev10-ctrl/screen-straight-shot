import { Card } from "@/components/ui/card";

type Props = {
  number: number;
  title: string;
  description?: string;
  id?: string;
};

export const BucketPlaceholder = ({ number, title, description, id }: Props) => {
  const num = String(number).padStart(2, "0");
  return (
    <section id={id} aria-labelledby={`bucket-${number}-heading`} className="space-y-4 scroll-mt-8">
      <div className="space-y-2">
        <p className="text-sm font-mono text-primary uppercase tracking-widest">
          {num} — Bucket {number}
        </p>
        <h2
          id={`bucket-${number}-heading`}
          className="text-2xl md:text-3xl font-bold tracking-tight"
        >
          {title}
        </h2>
      </div>
      <Card className="p-6 md:p-8 border-dashed border-border bg-card/40 text-muted-foreground">
        <p className="text-sm">
          {description ?? `Placeholder for Bucket ${number}: ${title}. Content coming soon.`}
        </p>
      </Card>
    </section>
  );
};
