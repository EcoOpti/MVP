import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function Pricing() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8 text-center">
        <h2 className="text-3xl font-bold">$97/month</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Simple, usage-agnostic pricing for the MVP.
        </p>
        <div className="mt-6">
          <Button>Start now</Button>
        </div>
      </Card>
    </div>
  );
}

