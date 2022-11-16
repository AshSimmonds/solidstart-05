import { z } from "zod"
import { procedurePublic, procedureRegistered, router } from "../utils"

export default router({
    create: procedurePublic
        .input(z.object({ text: z.string() }))
        .mutation(async ({ input, ctx }) => {
            return await ctx.prisma.notes.create({ data: input })
        }),
    get: procedurePublic
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            return await ctx.prisma.notes.findUnique({ where: { id: input.id } })
        }),
})
