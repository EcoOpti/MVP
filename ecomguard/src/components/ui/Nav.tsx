import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const appLinks = [
  { href: "/(app)/dashboard", label: "Dashboard" },
  { href: "/(app)/customers", label: "Customers 360" },
  { href: "/(app)/carts", label: "Carts" },
  { href: "/(app)/orders", label: "Orders" },
  { href: "/(app)/interventions", label: "Interventions" },
  { href: "/(app)/templates", label: "Templates" },
  { href: "/(app)/analytics", label: "Analytics" },
  { href: "/(app)/settings", label: "Settings" },
  { href: "/(app)/billing", label: "Billing" },
  { href: "/(app)/logs", label: "Logs" },
];

export function Nav() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-semibold">
          EcomGuard
        </Link>
        <nav className="hidden md:flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
          <Link href="/pricing">Pricing</Link>
          <Link href="/docs">Docs</Link>
          {appLinks.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <ThemeToggle />
    </div>
  );
}

