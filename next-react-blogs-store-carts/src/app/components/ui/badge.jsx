// src/components/ui/badge.jsx
export function Badge({ children, variant = 'default', className = '' }) {
  const baseClasses = "inline-block px-2 py-1 text-xs font-semibold rounded-full";

  const variants = {
    default: "bg-gray-200 text-gray-800",
    primary: "bg-blue-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-400 text-black",
    danger: "bg-red-500 text-white",
  };

  const variantClasses = variants[variant] || variants.default;

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
}
