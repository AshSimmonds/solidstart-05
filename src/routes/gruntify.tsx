import { type ParentComponent, Switch, Match, Show } from "solid-js"
import { Title } from "solid-start"
import { trpc } from "~/utils/trpc"

const testPermitId = 'recbr6s0W3tRpfUSw'

const parameterObject = {
    "permitId": testPermitId,
}

const GruntifyPage: ParentComponent = () => {
    // const res = trpc.hello.useQuery(() => ({ name: "from tRPC" }))
    const thePermit = trpc.getOne.useQuery(() => parameterObject)

    console.log(`GruntifyPage thePermit: ${thePermit}`)

    return (
        <>
            <Title>Gruntify test</Title>

            <h1>Gruntify test</h1>

            <Show when={thePermit}>
                <pre>{JSON.stringify(thePermit, null, 4)}</pre>
            </Show>


        </>
    )
}

export default GruntifyPage
