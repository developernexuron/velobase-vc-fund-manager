"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Background } from "@/components/layout/background";
import { cn } from "@/lib/utils";

const pipelineStages = [
  "Sourcing",
  "Screening",
  "Due Diligence",
  "Negotiation",
];

const deals = [
  {
    id: "D001",
    company: "Helios Robotics",
    industry: "Robotics",
    stage: "Due Diligence",
    amount: 8_000_000,
    fund: "Early Stage II",
    lead: "Sarah Chen",
    daysInStage: 14,
  },
  {
    id: "D002",
    company: "NanoMed Diagnostics",
    industry: "HealthTech",
    stage: "Screening",
    amount: 5_000_000,
    fund: "DeepTech I",
    lead: "Mike Liu",
    daysInStage: 7,
  },
  {
    id: "D003",
    company: "Aurora Energy Systems",
    industry: "CleanTech",
    stage: "Sourcing",
    amount: 12_000_000,
    fund: "Opportunities",
    lead: "James Park",
    daysInStage: 3,
  },
  {
    id: "D004",
    company: "CloudNine Infrastructure",
    industry: "Cloud",
    stage: "Negotiation",
    amount: 15_000_000,
    fund: "Growth Fund I",
    lead: "Sarah Chen",
    daysInStage: 21,
  },
  {
    id: "D005",
    company: "Synthegen Therapeutics",
    industry: "Biotech",
    stage: "Screening",
    amount: 10_000_000,
    fund: "Growth Fund I",
    lead: "Mike Liu",
    daysInStage: 10,
  },
  {
    id: "D006",
    company: "DataVault Systems",
    industry: "Cybersecurity",
    stage: "Sourcing",
    amount: 6_000_000,
    fund: "Early Stage II",
    lead: "James Park",
    daysInStage: 5,
  },
  {
    id: "D007",
    company: "QuantumRisk Analytics",
    industry: "FinTech",
    stage: "Due Diligence",
    amount: 7_500_000,
    fund: "DeepTech I",
    lead: "Sarah Chen",
    daysInStage: 18,
  },
  {
    id: "D008",
    company: "EcoMaterials Corp",
    industry: "Materials",
    stage: "Sourcing",
    amount: 4_000_000,
    fund: "Opportunities",
    lead: "Mike Liu",
    daysInStage: 2,
  },
];

const formatCurrency = (value: number) => {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
};

const stageColors: Record<string, string> = {
  Sourcing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Screening: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "Due Diligence": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  Negotiation: "bg-green-500/10 text-green-500 border-green-500/20",
};

export default function DealsPage() {
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
              Deal Flow Pipeline
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Track investment opportunities from sourcing to closing.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="border-border/50 bg-card/50 hover:bg-accent/50 inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition-colors">
              <Filter className="h-4 w-4" /> Filter
            </button>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-colors">
              <Plus className="h-4 w-4" /> Add Deal
            </button>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          {pipelineStages.map((stage) => {
            const stageDeals = deals.filter((d) => d.stage === stage);
            return (
              <div
                key={stage}
                className="border-border/50 bg-card/50 rounded-xl border p-4 backdrop-blur-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-foreground text-sm font-medium">
                    {stage}
                  </h3>
                  <span className="text-muted-foreground bg-background/50 rounded-full px-2 py-0.5 text-xs">
                    {stageDeals.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="border-border/30 bg-background/50 hover:bg-accent/20 cursor-pointer rounded-lg border p-3 transition-colors"
                    >
                      <div className="mb-1 flex items-start justify-between">
                        <span className="text-foreground text-sm font-medium">
                          {deal.company}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {deal.daysInStage}d
                        </span>
                      </div>
                      <span className="text-muted-foreground text-xs">
                        {deal.industry}
                      </span>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-foreground text-xs font-medium">
                          {formatCurrency(deal.amount)}
                        </span>
                        <span className="text-muted-foreground text-[10px]">
                          {deal.fund}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-border/50 bg-card/50 overflow-hidden rounded-xl border backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-border/50 text-muted-foreground border-b text-xs tracking-wider uppercase">
                  <th className="px-4 py-3 text-left font-medium">Company</th>
                  <th className="px-4 py-3 text-left font-medium">Industry</th>
                  <th className="px-4 py-3 text-left font-medium">Stage</th>
                  <th className="px-4 py-3 text-right font-medium">Amount</th>
                  <th className="px-4 py-3 text-left font-medium">
                    Target Fund
                  </th>
                  <th className="px-4 py-3 text-left font-medium">Lead</th>
                  <th className="px-4 py-3 text-right font-medium">
                    Days in Stage
                  </th>
                </tr>
              </thead>
              <tbody>
                {deals.map((deal) => (
                  <tr
                    key={deal.id}
                    className="border-border/30 hover:bg-accent/20 border-b transition-colors"
                  >
                    <td className="text-foreground px-4 py-3 font-medium">
                      {deal.company}
                    </td>
                    <td className="text-muted-foreground px-4 py-3">
                      {deal.industry}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full border px-2 py-0.5 text-xs font-medium",
                          stageColors[deal.stage],
                        )}
                      >
                        {deal.stage}
                      </span>
                    </td>
                    <td className="text-foreground px-4 py-3 text-right">
                      {formatCurrency(deal.amount)}
                    </td>
                    <td className="text-muted-foreground px-4 py-3">
                      {deal.fund}
                    </td>
                    <td className="text-muted-foreground px-4 py-3">
                      {deal.lead}
                    </td>
                    <td className="text-muted-foreground px-4 py-3 text-right">
                      {deal.daysInStage}
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
