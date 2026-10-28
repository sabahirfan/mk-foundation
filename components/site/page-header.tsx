import { MarginNote } from "@/components/site/margin-note";

/** The opening of an inner page: a ruled header with a note in the margin. */
export function PageHeader({
  note,
  title,
  children,
}: {
  note: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="notebook hero-ruled ruled border-b border-rule">
      <div className="page page-grid pt-14 pb-14 lg:pt-24 lg:pb-20">
        <MarginNote className="h-[var(--rule-gap)] lg:h-auto">{note}</MarginNote>
        <div className="max-w-[44rem]">
          <h1 className="page-title font-semibold tracking-tight">{title}</h1>
          {children && (
            <div className="hero-lede mt-[var(--rule-gap)] space-y-[var(--rule-gap)] text-ink-soft">{children}</div>
          )}
        </div>
      </div>
    </section>
  );
}

/** A plain notebook section with a margin note, for the body of inner pages. */
export function NotebookSection({
  note,
  id,
  labelledBy,
  className,
  children,
}: {
  note?: string;
  id?: string;
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className="notebook">
      <div className={`page page-grid py-14 lg:py-20 ${className ?? ""}`}>
        {note ? <MarginNote>{note}</MarginNote> : <div className="margin-note-slot hidden lg:block" />}
        <div>{children}</div>
      </div>
    </section>
  );
}
