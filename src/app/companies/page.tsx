"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Plus, TrendingUp, Building2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Background } from "@/components/layout/background";
import { cn } from "@/lib/utils";

const companies = [
  {
    id: "C001",
    name: "NeuralCore AI",
    industry: "AI/ML",
    invested: 15_000_000,
    valuation: 120_000_000,
    ownership: 12.5,
    stage: "Series B",
    fund: "Growth Fund I",
    status: "Active",
    return: 2.8,
  },
  {
    id: "C002",
    name: "QuantumLeap Labs",
    industry: "Quantum Computing",
    invested: 8_000_000,
    valuation: 65_000_000,
    ownership: 18.0,
    stage: "Series A",
    fund: "Early Stage II",
    status: "Active",
    return: 1.9,
  },
  {
    id: "C003",
    name: "BioSync Therapeutics",
    industry: "Biotech",
    invested: 12_000_000,
    valuation: 95_000_000,
    ownership: 15.0,
    stage: "Series B",
    fund: "Growth Fund I",
    status: "Active",
    return: 2.1,
  },
  {
    id: "C004",
    name: "CyberShield Inc.",
    industry: "Cybersecurity",
    invested: 5_000_000,
    valuation: 42_000_000,
    ownership: 20.0,
    stage: "Series A",
    fund: "Early Stage II",
    status: "Active",
    return: 1.5,
  },
  {
    id: "C005",
    name: "GreenGrid Energy",
    industry: "CleanTech",
    invested: 10_000_000,
    valuation: 78_000_000,
    ownership: 14.0,
    stage: "Series B",
    fund: "Opportunities",
    status: "Active",
    return: 2.3,
  },
  {
    id: "C006",
    name: "SpaceLink Systems",
    industry: "Aerospace",
    invested: 7_000_000,
    valuation: 55_000_000,
    ownership: 16.0,
    stage: "Series A",
    fund: "DeepTech I",
    status: "Active",
    return: 1.7,
  },
  {
    id: "C007",
    name: "DeepSee Analytics",
    industry: "Big Data",
    invested: 3_000_000,
    valuation: 28_000_000,
    ownership: 22.0,
    stage: "Seed",
    fund: "Early Stage II",
    status: "Active",
    return: 1.3,
  },
  {
    id: "C008",
    name: "RoboLogix Automation",
    industry: "Industrial Tech",
    invested: 9_000_000,
    valuation: 45_000_000,
    ownership: 11.0,
    stage: "Series A",
    fund: "DeepTech I",
    status: "Active",
    return: 1.2,
  },
];

const formatCurrency = (value: number) => {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(0)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
};

export default function CompaniesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/");
  }, [status, router]);

  if (status === "loading" || !session) {
    return (
      <div className="bg-background flex min-h-screen w-full items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground relative min-h-dvh w-full overflow-x-hidden font-sans">
      <Background />
      <Header />
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-16 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-foreground text-2xl font-semibold">
              Portfolio Companies
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Track your portfolio company performance and key metrics.
            </p>
          </div>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-colors">
            <Plus className="h-4 w-4" /> Add Company
          </button>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-border/50 bg-card/50 rounded-xl border p-5 backdrop-blur-sm">
            <div className="text-muted-foreground mb-1 text-sm">
              Total Invested
            </div>
            <div className="text-foreground text-2xl font-semibold">
              {formatCurrency(companies.reduce((s, c) => s + c.invested, 0))}
            </div>
          </div>
          <div className="border-border/50 bg-card/50 rounded-xl border p-5 backdrop-blur-sm">
            <div className="text-muted-foreground mb-1 text-sm">
              Total Value
            </div>
            <div className="text-foreground text-2xl font-semibold">
              {formatCurrency(companies.reduce((s, c) => s + c.valuation, 0))}
            </div>
          </div>
          <div className="border-border/50 bg-card/50 rounded-xl border p-5 backdrop-blur-sm">
            <div className="text-muted-foreground mb-1 text-sm">
              Active Companies
            </div>
            <div className="text-foreground text-2xl font-semibold">
              {companies.filter((c) => c.status === "Active").length}
            </div>
          </div>
          <div className="border-border/50 bg-card/50 rounded-xl border p-5 backdrop-blur-sm">
            <div className="text-muted-foreground mb-1 text-sm">
              Avg Multiple
            </div>
            <div className="text-foreground text-2xl font-semibold">
              {(
                companies.reduce((s, c) => s + c.return, 0) / companies.length
              ).toFixed(1)}
              x
            </div>
          </div>
        </div>

        <div className="border-border/50 bg-card/50 overflow-hidden rounded-xl border backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-border/50 text-muted-foreground border-b text-xs tracking-wider uppercase">
                  <th className="px-4 py-3 text-left font-medium">Company</th>
                  <th className="px-4 py-3 text-left font-medium">Industry</th>
                  <th className="px-4 py-3 text-left font-medium">Fund</th>
                  <th className="px-4 py-3 text-right font-medium">Invested</th>
                  <th className="px-4 py-3 text-right font-medium">
                    Valuation
                  </th>
                  <th className="px-4 py-3 text-right font-medium">
                    Ownership
                  </th>
                  <th className="px-4 py-3 text-left font-medium">Stage</th>
                  <th className="px-4 py-3 text-right font-medium">Multiple</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((c) => (
                  <tr
                    key={c.id}
                    className="border-border/30 hover:bg-accent/20 border-b transition-colors"
                  >
                    <td className="text-foreground px-4 py-3 font-medium">
                      {c.name}
                    </td>
                    <td className="text-muted-foreground px-4 py-3">
                      {c.industry}
                    </td>
                    <td className="text-muted-foreground px-4 py-3">
                      {c.fund}
                    </td>
                    <td className="text-foreground px-4 py-3 text-right">
                      {formatCurrency(c.invested)}
                    </td>
                    <td className="text-foreground px-4 py-3 text-right">
                      {formatCurrency(c.valuation)}
                    </td>
                    <td className="text-foreground px-4 py-3 text-right">
                      {c.ownership}%
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full border px-2 py-0.5 text-xs font-medium",
                          "border-blue-500/20 bg-blue-500/10 text-blue-500",
                        )}
                      >
                        {c.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={cn(
                          "font-medium",
                          c.return >= 2 ? "text-green-500" : "text-yellow-500",
                        )}
                      >
                        {c.return}x
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-500">
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
