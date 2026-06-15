import { z } from "zod";
import {
  FundStatus,
  CompanyStage,
  CompanyStatus,
  DealStage,
  DealStatus,
  CapitalCallStatus,
  DistributionStatus,
  LPStatus,
} from "@prisma/client";

export const createFundSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  strategy: z.string().max(500).optional(),
  vintageYear: z.number().int().min(1950).max(2100),
  aum: z.number().nonnegative().default(0),
  currency: z.string().default("USD"),
  status: z.nativeEnum(FundStatus).default("ACTIVE"),
});

export const updateFundSchema = createFundSchema.partial();

export const fundIdSchema = z.object({
  id: z.string(),
});

export const createCompanySchema = z.object({
  fundId: z.string(),
  name: z.string().min(1).max(200),
  industry: z.string().max(100).optional(),
  invested: z.number().nonnegative().default(0),
  valuation: z.number().nonnegative().optional(),
  ownershipPct: z.number().min(0).max(100).default(0),
  stage: z.nativeEnum(CompanyStage).optional(),
  status: z.nativeEnum(CompanyStatus).default("ACTIVE"),
  investmentDate: z.string().datetime().optional(),
  description: z.string().max(2000).optional(),
});

export const createDealSchema = z.object({
  fundId: z.string(),
  companyName: z.string().min(1).max(200),
  industry: z.string().max(100).optional(),
  source: z.string().max(200).optional(),
  stage: z.nativeEnum(DealStage).default("SOURCING"),
  requestedAmount: z.number().nonnegative().optional(),
  valuation: z.number().nonnegative().optional(),
  description: z.string().max(2000).optional(),
});

export const createCapitalCallSchema = z.object({
  fundId: z.string(),
  amount: z.number().positive(),
  dueDate: z.string().datetime(),
  description: z.string().max(2000).optional(),
});

export const createDistributionSchema = z.object({
  fundId: z.string(),
  amount: z.number().positive(),
  type: z.string().default("DIVIDEND"),
  date: z.string().datetime(),
  description: z.string().max(2000).optional(),
});

export const createLPInvestorSchema = z.object({
  fundId: z.string(),
  name: z.string().min(1).max(200),
  email: z.string().email().optional(),
  committedCapital: z.number().nonnegative().default(0),
  capitalBalance: z.number().nonnegative().default(0),
  notes: z.string().max(2000).optional(),
});

export const listSchema = z.object({
  limit: z.number().min(1).max(100).default(20),
  cursor: z.string().optional(),
  status: z.string().optional(),
});
