import { z } from "zod"
import { procedurePublic, procedurePublicRateLimited, procedureRegistered, router } from "../utils"

export default router({
    create: procedurePublicRateLimited
        .input(z.object({ text: z.string() }))
        .mutation(async ({ input, ctx }) => {
            return await ctx.prisma.notes.create({ data: input })
        }),
    get: procedurePublicRateLimited
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            return await ctx.prisma.notes.findUnique({ where: { id: input.id } })
        }),
})
