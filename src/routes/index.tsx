import { type ParentComponent, Switch, Match } from "solid-js"
import { A, Title } from "solid-start"
import { trpc } from "~/utils/trpc"

const Home: ParentComponent = () => {
    const res = trpc.hello.useQuery(() => ({ name: "from tRPC" }))

    return (
        <>
            <Title>SolidStart beta | SolidJS with tRPC Zod Prisma Tailwind Upstash Ratelimit Meta Auth0</Title>
            <h1>SolidStart beta | SolidJS with tRPC Zod Prisma Tailwind Upstash Ratelimit Meta Auth0</h1>
            
            <A href="/gruntify">Gruntify</A>

            <div>
                <Switch
                    fallback={
                        <pre class="font-bold text-2xl text-gray-500">
                            {JSON.stringify(res.data)}
                        </pre>
                    }
                >
                    <Match when={res.isLoading}>
                        <div class="font-bold text-2xl text-gray-500">Loading...</div>
                    </Match>
                </Switch>
            </div>
        </>
    )
}

export default Home
