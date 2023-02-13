import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

const exercise = z.object({
  name: z.string(),
  // description: z.string(),
  id: z.string()
})

const sets = z.array(
  z.object({
    weight: z.number(),
    reps: z.number(),
    weightMetric: z.string(),
    id: z.string()
  })
)

const postExercise = z.object({
  exercise,
  sets
})


export const exerciseRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.exercise.findMany({
      include: {
        sets: true
      }
    });
  }),
  upsert: publicProcedure.input(postExercise).mutation(({ ctx, input }) => {
    const { exercise: { name, id }, sets } = input

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
