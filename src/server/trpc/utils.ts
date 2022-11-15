import { initTRPC, TRPCError } from "@trpc/server";
import type { IContext } from "./context";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(20, "10 s"),
});

export const t = initTRPC.context<IContext>().create();



const withRateLimit = t.middleware(async ({ ctx, next }) => {
  const ip = ctx.req.headers.get("x-forwarded-for") ?? "127.0.0.1";

  const { success, pending, limit, reset, remaining } = await ratelimit.limit(
    `mw_${ip}`
  );
  await pending;
  ctx.res.headers["X-RateLimit-Limit"] = limit.toString();
  ctx.res.headers["X-RateLimit-Remaining"] = remaining.toString();
  ctx.res.headers["X-RateLimit-Reset"] = reset.toString();
  if (!success) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: `Rate limit exceeded, retry in ${new Date(
        reset
      ).getDate()} seconds`,
    });
  }
  return next({ ctx });
});



// TODO: once auth is implemented, do shit here
const isRegistered = t.middleware(({ ctx, next }) => {
  // console.log(`isRegistered: ctx.session: ${JSON.stringify(ctx.session, null, 4)}`)

  // if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" })
  // }

  // return next({
  //     ctx: {
  //         session: { ...ctx.session, user: ctx.session.user },
  //     },
  // })
})




export const router = t.router;

// TODO: make all procedures go via rate limiter - once figure out how it works
export const procedurePublicRateLimited = t.procedure.use(withRateLimit);

export const procedurePublic = t.procedure

export const procedureRegistered = t.procedure.use(isRegistered)
