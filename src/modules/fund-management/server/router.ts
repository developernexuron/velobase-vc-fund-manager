import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createFundSchema,
  updateFundSchema,
  fundIdSchema,
  createCompanySchema,
  createDealSchema,
  createCapitalCallSchema,
  createDistributionSchema,
  createLPInvestorSchema,
  listSchema,
} from "./schema";
import {
  createFund,
  getFund,
  listFunds,
  updateFund,
  deleteFund,
  getDashboardStats,
  createCompany,
  listCompanies,
  createDeal,
  listDeals,
  createCapitalCall,
  listCapitalCalls,
  createDistribution,
  listDistributions,
  createLPInvestor,
  listLPInvestors,
} from "./service";

export const fundManagementRouter = createTRPCRouter({
  getStats: protectedProcedure.query(async ({ ctx }) => {
    return getDashboardStats(ctx.session.user.id);
  }),

  createFund: protectedProcedure
    .input(createFundSchema)
    .mutation(async ({ ctx, input }) => {
      return createFund(ctx.session.user.id, input);
    }),

  getFund: protectedProcedure
    .input(fundIdSchema)
    .query(async ({ ctx, input }) => {
      return getFund(ctx.session.user.id, input.id);
    }),

  listFunds: protectedProcedure
    .input(listSchema.optional())
    .query(async ({ ctx, input }) => {
      return listFunds(ctx.session.user.id, input);
    }),

  updateFund: protectedProcedure
    .input(updateFundSchema.extend({ id: fundIdSchema.shape.id }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return updateFund(ctx.session.user.id, id, data);
    }),

  deleteFund: protectedProcedure
    .input(fundIdSchema)
    .mutation(async ({ ctx, input }) => {
      return deleteFund(ctx.session.user.id, input.id);
    }),

  createCompany: protectedProcedure
    .input(createCompanySchema)
    .mutation(async ({ ctx, input }) => {
      return createCompany(ctx.session.user.id, input);
    }),

  listCompanies: protectedProcedure
    .input(
      listSchema
        .extend({ fundId: fundIdSchema.shape.id.optional() })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      return listCompanies(ctx.session.user.id, input?.fundId, input);
    }),

  createDeal: protectedProcedure
    .input(createDealSchema)
    .mutation(async ({ ctx, input }) => {
      return createDeal(ctx.session.user.id, input);
    }),

  listDeals: protectedProcedure
    .input(
      listSchema
        .extend({ fundId: fundIdSchema.shape.id.optional() })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      return listDeals(ctx.session.user.id, input?.fundId, input);
    }),

  createCapitalCall: protectedProcedure
    .input(createCapitalCallSchema)
    .mutation(async ({ ctx, input }) => {
      return createCapitalCall(ctx.session.user.id, input);
    }),

  listCapitalCalls: protectedProcedure
    .input(
      listSchema
        .extend({ fundId: fundIdSchema.shape.id.optional() })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      return listCapitalCalls(ctx.session.user.id, input?.fundId, input);
    }),

  createDistribution: protectedProcedure
    .input(createDistributionSchema)
    .mutation(async ({ ctx, input }) => {
      return createDistribution(ctx.session.user.id, input);
    }),

  listDistributions: protectedProcedure
    .input(
      listSchema
        .extend({ fundId: fundIdSchema.shape.id.optional() })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      return listDistributions(ctx.session.user.id, input?.fundId, input);
    }),

  createLPInvestor: protectedProcedure
    .input(createLPInvestorSchema)
    .mutation(async ({ ctx, input }) => {
      return createLPInvestor(ctx.session.user.id, input);
    }),

  listLPInvestors: protectedProcedure
    .input(
      listSchema
        .extend({ fundId: fundIdSchema.shape.id.optional() })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      return listLPInvestors(ctx.session.user.id, input?.fundId, input);
    }),
});
