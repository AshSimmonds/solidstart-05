import { z } from "zod"
import { procedurePublic, procedurePublicRateLimited, procedureRegistered, router } from "../utils"

export default router({
    asdf: procedurePublicRateLimited.input(z.object({ name: z.string() })).query(({ input }) => {
        return `gday ${input.name}`
    }),
    qwer: procedurePublicRateLimited
        .input(z.object({ num: z.number() }))
        .mutation(({ input }) => {
            return Math.floor(Math.random() * 100) / input.num
        }),
})
