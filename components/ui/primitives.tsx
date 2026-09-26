import Link from "next/link";
import { cn } from "@/lib/utils";

export function Container({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8", className)} {...rest}>
      {children}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "inverse";
  className?: string;
}) {
  const styles = {
    primary: "bg-olive text-white hover:bg-forest",
    secondary: "border border-olive bg-white text-olive hover:bg-ivory",
    ghost: "text-olive hover:bg-white",
    inverse: "bg-white/15 text-ivory hover:bg-white/25",
  }[variant];
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-md px-5 text-sm font-semibold transition-colors",
        styles,
        className,
      )}
    >
      {children}
    </Link>
  );
}
