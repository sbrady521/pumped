import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const exerciseWithSets = z.object({
  name: z.string(),
  description: z.string(),
  id: z.string(),
  sets: z.array(
    z.object({
      weight: z.number(),
      reps: z.number(),
      weightMetric: z.string(),
      id: z.string()
    })
  )
})

const exercise = z.object({
  name: z.string(),
  description: z.string(),
  id: z.string(),
})

const id = z.string()

export const exerciseRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    const result = ctx.prisma.exercise.findMany({
      include: {
        sets: true
      },
      where: {
        createdBy: ctx.session.user.id
      }
    });
    return result
  }),
  get: protectedProcedure.input(id).query(async ({ ctx, input }) => {
    return await ctx.prisma.exercise.findUnique({
      where: { id: input },
      include: {
        sets: true
      }
    });
  }),
  create: protectedProcedure.input(exercise).mutation(({ ctx, input }) => {
    const { name, description, id } = input

    return ctx.prisma.exercise.create({ data: { name, description, id, createdBy: ctx.session.user.id } })
  }),
  delete: protectedProcedure.input(id).mutation(async ({ ctx, input }) => {
    await ctx.prisma.set.deleteMany({ where: { exerciseId: input } })
    await ctx.prisma.exercise.deleteMany({ where: { id: input } })
  }),
  update: protectedProcedure.input(exerciseWithSets).mutation(async ({ ctx, input }) => {
    const { name, description, id, sets } = input

    const setEntries = sets.map(set => ({ 
      create: set, 
      update: set, 
      where: { id: set.id } 
    }))

    await ctx.prisma.set.deleteMany({ where: { exerciseId: id } })

    return await ctx.prisma.exercise.update({
      data: { 
        name, 
        description, 
        sets: {
          upsert: setEntries 
        } 
      },
      where: {
        id
      },
      include: {
        sets: true
      }
    })
  })
})
