import { t } from "../utils"
import exampleRouter from "./example"
import notesRouter from "./notes"
import gluntifyRouter from "./gluntify"
import authenticationRouter from "./authentication"

// export const appRouter = t.mergeRouters(exampleRouter, notesRouter, gluntifyRouter, authenticationRouter)

export const appRouter = t.router({
    example: exampleRouter,
    notes: notesRouter,
    gluntify: gluntifyRouter,
    authentication: authenticationRouter,
})


export type IAppRouter = typeof appRouter
