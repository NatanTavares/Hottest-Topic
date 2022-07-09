import * as trpc from "@trpc/server";
import { prisma } from "services/prisma";
import { z } from "zod";

export const appRouter = trpc
  .router()
  .query("get-pokemon-by-id", {
    input: z.object({
      id: z.number(),
    }),

    async resolve({ input: { id } }) {
      const pokemon = await prisma.pokemon.findUnique({
        where: { id },
      });

      if (pokemon) return pokemon;
      throw new Error("Pokemon not found");
    },
  })
  .mutation("cast-vote", {
    input: z.object({
      votedForId: z.number(),
      votedAgainstId: z.number(),
    }),
    async resolve({ input }) {
      const vote = await prisma.vote.create({
        data: { ...input },
      });

      return { success: true, vote };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
