import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

const exercise = z.object({
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

export const exerciseRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.exercise.findMany({
      include: {
        sets: true
      }
    });
  }),
  upsert: protectedProcedure.input(exercise).mutation(({ ctx, input }) => {
    const { name, id, sets } = input

    const setEntries = sets.map(set => ({ create: set, where: { id: set.id } }))

    return ctx.prisma.exercise.upsert({
      create: { name, sets: { connectOrCreate: setEntries } },
      update: { name, sets: { connectOrCreate: setEntries } },
      where: {
        id
      }
    })
  })
});
