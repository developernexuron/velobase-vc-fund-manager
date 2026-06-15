"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Plus, Banknote, TrendingUp, Users, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Background } from "@/components/layout/background";
import { cn } from "@/lib/utils";

const funds = [
  {
    id: "F001",
    name: "Velobase Growth Fund I",
    vintage: 2021,
    strategy: "Growth Equity",
    aum: 250_000_000,
    invested: 180_000_000,
    value: 245_000_000,
    moic: 1.36,
    irr: 12.4,
    companies: 8,
    lps: 45,
    status: "Active",
  },
  {
    id: "F002",
    name: "Velobase Early Stage II",
    vintage: 2022,
    strategy: "Early Stage VC",
    aum: 150_000_000,
    invested: 95_000_000,
    value: 112_000_000,
    moic: 1.18,
    irr: 8.7,
    companies: 12,
    lps: 38,
    status: "Active",
  },
  {
    id: "F003",
    name: "Velobase Opportunities",
    vintage: 2023,
    strategy: "Opportunistic",
    aum: 300_000_000,
    invested: 120_000_000,
    value: 138_000_000,
    moic: 1.15,
    irr: 6.2,
    companies: 6,
    lps: 62,
    status: "Active",
  },
  {
    id: "F004",
    name: "Velobase DeepTech I",
    vintage: 2024,
    strategy: "Deep Tech",
    aum: 100_000_000,
    invested: 42_000_000,
    value: 44_500_000,
    moic: 1.06,
    irr: 3.1,
    companies: 4,
    lps: 28,
    status: "Raising",
  },
];

const formatCurrency = (value: number) => {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(0)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
};

export default function FundsPage() {
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
            <h1 className="text-foreground text-2xl font-semibold">Funds</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Manage your investment funds and track performance.
            </p>
          </div>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-colors">
            <Plus className="h-4 w-4" /> Create Fund
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {funds.map((fund) => (
            <div
              key={fund.id}
              className="border-border/50 bg-card/50 hover:bg-accent/20 rounded-xl border p-6 backdrop-blur-sm transition-colors"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-foreground text-lg font-medium">
                    {fund.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-500">
                      {fund.status}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      Vintage {fund.vintage}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {fund.strategy}
                    </span>
                  </div>
                </div>
                <button className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  View →
                </button>
              </div>
              <div className="border-border/30 grid grid-cols-3 gap-4 border-y py-4">
                <div>
                  <div className="text-muted-foreground mb-1 text-xs">AUM</div>
                  <div className="text-foreground text-lg font-semibold">
                    {formatCurrency(fund.aum)}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-xs">
                    Invested
                  </div>
                  <div className="text-foreground text-lg font-semibold">
                    {formatCurrency(fund.invested)}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-xs">
                    Value
                  </div>
                  <div className="text-foreground text-lg font-semibold">
                    {formatCurrency(fund.value)}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Banknote className="h-3.5 w-3.5" /> {fund.companies}{" "}
                    companies
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {fund.lps} LPs
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-sm text-green-500">
                    {fund.moic}x <ArrowUpRight className="h-3 w-3" />
                  </span>
                  <span className="text-sm text-green-500">
                    {fund.irr}% IRR
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
