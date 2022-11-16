import { initTRPC, TRPCError } from "@trpc/server"
import type { IContext } from "./context"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const useRateLimiting = true

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.fixedWindow(20, "10 s"),
})

export const t = initTRPC.context<IContext>().create()



const withRateLimit = t.middleware(async ({ ctx, next }) => {
    if (!useRateLimiting) {
        return next({ ctx })
    }
    
    const ip = ctx.req.headers.get("x-forwarded-for") ?? "127.0.0.1"

    const { success, pending, limit, reset, remaining } = await ratelimit.limit(
        `mw_${ip}`
    )
    await pending
    ctx.res.headers["X-RateLimit-Limit"] = limit.toString()
    ctx.res.headers["X-RateLimit-Remaining"] = remaining.toString()
    ctx.res.headers["X-RateLimit-Reset"] = reset.toString()
    if (!success) {
        throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: `Rate limit exceeded, retry in ${new Date(
                reset
            ).getDate()} seconds`,
        })
    }
    return next({ ctx })
})



// TODO: once auth is implemented, do shit here
const isRegistered = t.middleware(({ ctx, next }) => {
    // if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
    // }

    // return next({
    //     ctx: {
    //         session: { ...ctx.session, user: ctx.session.user },
    //     },
    // })
})



const isPremium = t.middleware(({ ctx, next }) => {
    // console.log(`isPremium: ctx.session: ${JSON.stringify(ctx.session, null, 4)}`)

    // if ((!ctx.session || !ctx.session.user || !ctx.session.user.premium) && (!ctx.session || !ctx.session.user.admin)) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
    // }

    // return next({
    //     ctx: {
    //         // infers the `session` as non-nullable
    //         session: { ...ctx.session, user: ctx.session.user },
    //     },
    // })
})


const isPower = t.middleware(({ ctx, next }) => {
    // console.log(`isPower: ctx.session: ${JSON.stringify(ctx.session, null, 4)}`)

    // if ((!ctx.session || !ctx.session.user || !ctx.session.user.power) && (!ctx.session || !ctx.session.user.admin)) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
    // }

    // return next({
    //     ctx: {
    //         // infers the `session` as non-nullable
    //         session: { ...ctx.session, user: ctx.session.user },
    //     },
    // })
})


const isAdmin = t.middleware(({ ctx, next }) => {
    // console.log(`isAdmin: ctx.session: ${JSON.stringify(ctx.session, null, 4)}`)

    // if (!ctx.session || !ctx.session.user || !ctx.session.user.admin) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
    // }

    // return next({
    //     ctx: {
    //         // infers the `session` as non-nullable
    //         session: { ...ctx.session, user: ctx.session.user },
    //     },
    // })
})
















export const router = t.router

// TODO: make all procedures go via rate limiter - once figure out how it works
export const procedurePublic = t.procedure.use(withRateLimit)

export const procedureRegistered = t.procedure.use(withRateLimit).use(isRegistered)

export const procedurePremium = t.procedure.use(withRateLimit).use(isPremium)

export const procedurePower = t.procedure.use(withRateLimit).use(isPower)

export const procedureAdmin = t.procedure.use(withRateLimit).use(isAdmin)
