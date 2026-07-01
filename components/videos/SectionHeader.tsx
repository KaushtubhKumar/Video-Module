export function SectionHeader({
  label,
  title,
  description,
  action,
}: {
  label: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-accent-hover">
          {label}
        </p>
        <h2 className="text-[22px] font-semibold tracking-tight text-primary">{title}</h2>
        {description && <p className="mt-1.5 text-[14px] text-secondary">{description}</p>}
      </div>
      {action}
    </div>
  );
}
