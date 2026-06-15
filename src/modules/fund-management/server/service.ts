import { TRPCError } from "@trpc/server";
import { db } from "@/server/db";
import { createLogger } from "@/lib/logger";
import type { z } from "zod";
import type {
  createFundSchema,
  updateFundSchema,
  createCompanySchema,
  createDealSchema,
  createCapitalCallSchema,
  createDistributionSchema,
  createLPInvestorSchema,
  listSchema,
} from "./schema";

const logger = createLogger("fund-management");

function requireOwnership(userId: string, ownerId: string, entity: string) {
  if (userId !== ownerId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: `You do not own this ${entity}`,
    });
  }
}

export async function createFund(
  userId: string,
  input: z.infer<typeof createFundSchema>,
) {
  logger.info({ userId, name: input.name }, "Creating fund");
  return db.fund.create({
    data: {
      ...input,
      userId,
    },
  });
}

export async function getFund(userId: string, id: string) {
  const fund = await db.fund.findUnique({ where: { id } });
  if (!fund) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Fund not found" });
  }
  requireOwnership(userId, fund.userId, "fund");
  return fund;
}

export async function listFunds(
  userId: string,
  input?: z.infer<typeof listSchema>,
) {
  const limit = input?.limit ?? 20;
  const where: Record<string, unknown> = { userId };
  if (input?.status) where.status = input.status;

  const funds = await db.fund.findMany({
    where,
    take: limit + 1,
    cursor: input?.cursor ? { id: input.cursor } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          portfolioCompanies: true,
          capitalCalls: true,
          distributions: true,
          lpInvestors: true,
        },
      },
    },
  });

  let nextCursor: string | null = null;
  if (funds.length > limit) {
    const next = funds.pop();
    nextCursor = next!.id;
  }

  return { items: funds, nextCursor };
}

export async function updateFund(
  userId: string,
  id: string,
  input: z.infer<typeof updateFundSchema>,
) {
  const fund = await getFund(userId, id);
  return db.fund.update({ where: { id: fund.id }, data: input });
}

export async function deleteFund(userId: string, id: string) {
  const fund = await getFund(userId, id);
  await db.fund.delete({ where: { id: fund.id } });
  return { success: true };
}

export async function getDashboardStats(userId: string) {
  const funds = await db.fund.findMany({
    where: { userId, status: "ACTIVE" },
  });

  const totalAum = funds.reduce((sum, f) => sum + Number(f.aum), 0);
  const activeFunds = funds.length;

  const companies = await db.portfolioCompany.findMany({
    where: { userId, status: "ACTIVE" },
  });

  const lps = await db.lpInvestor.findMany({
    where: { userId, status: "COMMITTED" },
  });

  const totalInvestors = lps.length;
  const totalPortfolioCompanies = companies.length;

  return {
    totalAum,
    activeFunds,
    totalPortfolioCompanies,
    totalInvestors,
  };
}

export async function createCompany(
  userId: string,
  input: z.infer<typeof createCompanySchema>,
) {
  await getFund(userId, input.fundId);
  logger.info(
    { userId, companyName: input.name },
    "Creating portfolio company",
  );
  return db.portfolioCompany.create({ data: { ...input, userId } });
}

export async function listCompanies(
  userId: string,
  fundId?: string,
  input?: z.infer<typeof listSchema>,
) {
  const limit = input?.limit ?? 20;
  const where: Record<string, unknown> = { userId };
  if (fundId) where.fundId = fundId;
  if (input?.status) where.status = input.status;

  const items = await db.portfolioCompany.findMany({
    where,
    take: limit + 1,
    cursor: input?.cursor ? { id: input.cursor } : undefined,
    orderBy: { createdAt: "desc" },
    include: { fund: { select: { name: true } } },
  });

  let nextCursor: string | null = null;
  if (items.length > limit) {
    const next = items.pop();
    nextCursor = next!.id;
  }

  return { items, nextCursor };
}

export async function createDeal(
  userId: string,
  input: z.infer<typeof createDealSchema>,
) {
  await getFund(userId, input.fundId);
  logger.info({ userId, company: input.companyName }, "Creating deal");
  return db.deal.create({ data: { ...input, userId } });
}

export async function listDeals(
  userId: string,
  fundId?: string,
  input?: z.infer<typeof listSchema>,
) {
  const limit = input?.limit ?? 20;
  const where: Record<string, unknown> = { userId };
  if (fundId) where.fundId = fundId;
  if (input?.status) where.stage = input.status;

  const items = await db.deal.findMany({
    where,
    take: limit + 1,
    cursor: input?.cursor ? { id: input.cursor } : undefined,
    orderBy: { createdAt: "desc" },
    include: { fund: { select: { name: true } } },
  });

  let nextCursor: string | null = null;
  if (items.length > limit) {
    const next = items.pop();
    nextCursor = next!.id;
  }

  return { items, nextCursor };
}

export async function createCapitalCall(
  userId: string,
  input: z.infer<typeof createCapitalCallSchema>,
) {
  await getFund(userId, input.fundId);
  return db.capitalCall.create({
    data: { ...input, userId, dueDate: new Date(input.dueDate) },
  });
}

export async function listCapitalCalls(
  userId: string,
  fundId?: string,
  input?: z.infer<typeof listSchema>,
) {
  const limit = input?.limit ?? 20;
  const where: Record<string, unknown> = { userId };
  if (fundId) where.fundId = fundId;
  if (input?.status) where.status = input.status;

  const items = await db.capitalCall.findMany({
    where,
    take: limit + 1,
    cursor: input?.cursor ? { id: input.cursor } : undefined,
    orderBy: { dueDate: "desc" },
    include: { fund: { select: { name: true } } },
  });

  let nextCursor: string | null = null;
  if (items.length > limit) {
    const next = items.pop();
    nextCursor = next!.id;
  }

  return { items, nextCursor };
}

export async function createDistribution(
  userId: string,
  input: z.infer<typeof createDistributionSchema>,
) {
  await getFund(userId, input.fundId);
  return db.distribution.create({
    data: { ...input, userId, date: new Date(input.date) },
  });
}

export async function listDistributions(
  userId: string,
  fundId?: string,
  input?: z.infer<typeof listSchema>,
) {
  const limit = input?.limit ?? 20;
  const where: Record<string, unknown> = { userId };
  if (fundId) where.fundId = fundId;
  if (input?.status) where.status = input.status;

  const items = await db.distribution.findMany({
    where,
    take: limit + 1,
    cursor: input?.cursor ? { id: input.cursor } : undefined,
    orderBy: { date: "desc" },
    include: { fund: { select: { name: true } } },
  });

  let nextCursor: string | null = null;
  if (items.length > limit) {
    const next = items.pop();
    nextCursor = next!.id;
  }

  return { items, nextCursor };
}

export async function createLPInvestor(
  userId: string,
  input: z.infer<typeof createLPInvestorSchema>,
) {
  await getFund(userId, input.fundId);
  return db.lpInvestor.create({ data: { ...input, userId } });
}

export async function listLPInvestors(
  userId: string,
  fundId?: string,
  input?: z.infer<typeof listSchema>,
) {
  const limit = input?.limit ?? 20;
  const where: Record<string, unknown> = { userId };
  if (fundId) where.fundId = fundId;
  if (input?.status) where.status = input.status;

  const items = await db.lpInvestor.findMany({
    where,
    take: limit + 1,
    cursor: input?.cursor ? { id: input.cursor } : undefined,
    orderBy: { createdAt: "desc" },
    include: { fund: { select: { name: true } } },
  });

  let nextCursor: string | null = null;
  if (items.length > limit) {
    const next = items.pop();
    nextCursor = next!.id;
  }

  return { items, nextCursor };
}
