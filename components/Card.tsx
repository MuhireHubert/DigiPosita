export default function Card({
  title,
  phase,
  children,
}: {
  title: string;
  phase?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="stamp-card p-6">
      {phase && (
        <div className="text-xs font-semibold text-goldDeep">{phase}</div>
      )}
      <h3 className="mt-1 font-display text-base font-semibold">{title}</h3>
      <div className="mt-2 text-sm text-inkSoft">{children}</div>
    </div>
  );
}
