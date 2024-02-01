export function Card({
  className,
  title,
  children,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className={className}>
      <h2 className="text-red-700">{title}</h2>
      <p>{children}</p>
    </div>
  );
}
