import { t } from "../utils";
import exampleRouter from "./example";
import notesRouter from "./notes";
import gruntifyRouter from "./gruntify"

export const appRouter = t.mergeRouters(exampleRouter, notesRouter, gruntifyRouter)

export type IAppRouter = typeof appRouter;
