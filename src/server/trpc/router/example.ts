import { z } from "zod"
import { procedurePublic, procedureRegistered, router } from "../utils"

export default router({
    hello: procedurePublic.input(z.object({ name: z.string() })).query(({ input }) => {
        return `gday ${input.name}`
    }),
    random: procedurePublic
        .input(z.object({ num: z.number() }))
        .mutation(({ input }) => {
            return Math.floor(Math.random() * 100) / input.num
        }),
})
