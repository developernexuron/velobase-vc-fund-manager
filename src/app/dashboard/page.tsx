"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Banknote,
  TrendingUp,
  Building2,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Background } from "@/components/layout/background";
import { cn } from "@/lib/utils";

const funds = [
  {
    id: "F001",
    name: "Velobase Growth Fund I",
    vintage: 2021,
    aum: 250_000_000,
    invested: 180_000_000,
    value: 245_000_000,
    moic: 1.36,
    irr: 12.4,
    status: "Active",
  },
  {
    id: "F002",
    name: "Velobase Early Stage II",
    vintage: 2022,
    aum: 150_000_000,
    invested: 95_000_000,
    value: 112_000_000,
    moic: 1.18,
    irr: 8.7,
    status: "Active",
  },
  {
    id: "F003",
    name: "Velobase Opportunities",
    vintage: 2023,
    aum: 300_000_000,
    invested: 120_000_000,
    value: 138_000_000,
    moic: 1.15,
    irr: 6.2,
    status: "Active",
  },
  {
    id: "F004",
    name: "Velobase DeepTech I",
    vintage: 2024,
    aum: 100_000_000,
    invested: 42_000_000,
    value: 44_500_000,
    moic: 1.06,
    irr: 3.1,
    status: "Active",
  },
];

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
  },
];

const activity = [
  {
    id: "A001",
    type: "distribution",
    desc: "Distribution of $2.5M from NeuralCore AI exit",
    fund: "Growth Fund I",
    time: "2 hours ago",
  },
  {
    id: "A002",
    type: "capital_call",
    desc: "Capital call of $1.2M issued for DeepTech I",
    fund: "DeepTech I",
    time: "1 day ago",
  },
  {
    id: "A003",
    type: "deal",
    desc: "New deal sourced: Helios Robotics - Series A $8M",
    fund: "Early Stage II",
    time: "2 days ago",
  },
  {
    id: "A004",
    type: "valuation",
    desc: "Valuation update: QuantumLeap Labs up 35%",
    fund: "Growth Fund I",
    time: "3 days ago",
  },
  {
    id: "A005",
    type: "distribution",
    desc: "Quarterly distribution of $850K to LPs",
    fund: "Opportunities",
    time: "1 week ago",
  },
];

const formatCurrency = (value: number) => {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(0)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
};

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  changeType,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  change?: string;
  changeType?: "up" | "down";
}) {
  return (
    <div className="border-border/50 bg-card/50 hover:bg-accent/30 rounded-xl border p-5 backdrop-blur-sm transition-colors">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-muted-foreground text-sm">{label}</span>
        <div className="bg-primary/10 text-primary rounded-lg p-2">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="text-foreground text-2xl font-semibold">{value}</div>
      {change && (
        <div
          className={cn(
            "mt-1 flex items-center gap-1 text-xs",
            changeType === "up" ? "text-green-500" : "text-red-500",
          )}
        >
          {changeType === "up" ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          {change}
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
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
              Fund Portfolio Dashboard
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Welcome back{session.user.name ? `, ${session.user.name}` : ""}.
              Here&apos;s your fund overview.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-colors">
              <Plus className="h-4 w-4" /> Add Fund
            </button>
            <button className="border-border/50 bg-card/50 hover:bg-accent/50 inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium transition-colors">
              <TrendingUp className="h-4 w-4" /> Generate Report
            </button>
          </div>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Banknote}
            label="Total AUM"
            value="$800M"
            change="+12.3% vs last quarter"
            changeType="up"
          />
          <StatCard
            icon={Building2}
            label="Active Funds"
            value="4"
            change="+1 new fund in 2024"
            changeType="up"
          />
          <StatCard
            icon={TrendingUp}
            label="Portfolio Companies"
            value="24"
            change="6 added this year"
            changeType="up"
          />
          <StatCard
            icon={Users}
            label="Total LPs"
            value="186"
            change="+18 new commitments"
            changeType="up"
          />
        </div>

        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-foreground text-lg font-medium">
              Fund Portfolio
            </h2>
            <button className="text-primary text-sm hover:underline">
              View All
            </button>
          </div>
          <div className="border-border/50 bg-card/50 overflow-hidden rounded-xl border backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-border/50 text-muted-foreground border-b text-xs tracking-wider uppercase">
                    <th className="px-4 py-3 text-left font-medium">
                      Fund Name
                    </th>
                    <th className="px-4 py-3 text-left font-medium">Vintage</th>
                    <th className="px-4 py-3 text-right font-medium">AUM</th>
                    <th className="px-4 py-3 text-right font-medium">
                      Invested
                    </th>
                    <th className="px-4 py-3 text-right font-medium">Value</th>
                    <th className="px-4 py-3 text-right font-medium">MOIC</th>
                    <th className="px-4 py-3 text-right font-medium">IRR</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {funds.map((fund) => (
                    <tr
                      key={fund.id}
                      className="border-border/30 hover:bg-accent/20 border-b transition-colors"
                    >
                      <td className="text-foreground px-4 py-3 font-medium">
                        {fund.name}
                      </td>
                      <td className="text-muted-foreground px-4 py-3">
                        {fund.vintage}
                      </td>
                      <td className="text-foreground px-4 py-3 text-right">
                        {formatCurrency(fund.aum)}
                      </td>
                      <td className="text-foreground px-4 py-3 text-right">
                        {formatCurrency(fund.invested)}
                      </td>
                      <td className="text-foreground px-4 py-3 text-right">
                        {formatCurrency(fund.value)}
                      </td>
                      <td className="px-4 py-3 text-right text-green-500">
                        {fund.moic}x
                      </td>
                      <td className="px-4 py-3 text-right text-green-500">
                        {fund.irr}%
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-500">
                          {fund.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-muted-foreground hover:text-foreground text-xs transition-colors">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-foreground text-lg font-medium">
                Portfolio Companies
              </h2>
              <button className="text-primary text-sm hover:underline">
                View All
              </button>
            </div>
            <div className="border-border/50 bg-card/50 overflow-hidden rounded-xl border backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-border/50 text-muted-foreground border-b text-xs tracking-wider uppercase">
                      <th className="px-4 py-3 text-left font-medium">
                        Company
                      </th>
                      <th className="px-4 py-3 text-left font-medium">
                        Industry
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        Invested
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        Valuation
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        Ownership
                      </th>
                      <th className="px-4 py-3 text-left font-medium">Stage</th>
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
                          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-500">
                            {c.stage}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-foreground mb-4 text-lg font-medium">
              Recent Activity
            </h2>
            <div className="border-border/50 bg-card/50 space-y-4 rounded-xl border p-4 backdrop-blur-sm">
              {activity.map((a) => (
                <div
                  key={a.id}
                  className="border-border/30 flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0"
                >
                  <div
                    className={cn(
                      "shrink-0 rounded-full p-1.5",
                      a.type === "distribution" &&
                        "bg-green-500/10 text-green-500",
                      a.type === "capital_call" &&
                        "bg-orange-500/10 text-orange-500",
                      a.type === "deal" && "bg-blue-500/10 text-blue-500",
                      a.type === "valuation" &&
                        "bg-purple-500/10 text-purple-500",
                    )}
                  >
                    <TrendingUp className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground text-sm">{a.desc}</p>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">
                        {a.fund}
                      </span>
                      <span className="text-muted-foreground text-xs">·</span>
                      <span className="text-muted-foreground text-xs">
                        {a.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
