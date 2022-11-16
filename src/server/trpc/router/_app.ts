import { t } from "../utils"
import exampleRouter from "./example"
import notesRouter from "./notes"
import gruntifyRouter from "./gruntify"
import authenticationRouter from "./authentication"

// export const appRouter = t.mergeRouters(exampleRouter, notesRouter, gruntifyRouter, authenticationRouter)

export const appRouter = t.router({
    example: exampleRouter,
    notes: notesRouter,
    gruntify: gruntifyRouter,
    authentication: authenticationRouter,
})


export type IAppRouter = typeof appRouter
