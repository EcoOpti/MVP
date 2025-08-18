import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function Landing() {
  return (
    <div className="space-y-10">
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">EcomGuard</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          The Complete Ecommerce Revenue Protection Engine
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/(app)/onboarding">
            <Button>Start free setup</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="ghost">Pricing</Button>
          </Link>
        </div>
      </section>
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {["Cart Recovery", "Return Prevention", "Post-Purchase", "Churn Prevention"].map(
          (t) => (
            <Card key={t} className="p-6">
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Protect revenue with automated playbooks.
              </p>
            </Card>
          ),
        )}
      </section>
    </div>
  );
}

