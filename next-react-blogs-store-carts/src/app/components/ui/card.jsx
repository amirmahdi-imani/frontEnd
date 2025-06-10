export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl border p-4 shadow-sm bg-white dark:bg-zinc-900 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={`mt-2 ${className}`}>
      {children}
    </div>
  );
}

