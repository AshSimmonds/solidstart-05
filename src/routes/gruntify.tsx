import { type ParentComponent, Switch, Match, Show } from "solid-js"
import { A, Title } from "solid-start"
import { trpc } from "~/utils/trpc"

const testPermitId = 'recbr6s0W3tRpfUSw'

const parameterObject = {
    "permitId": testPermitId,
}

const GruntifyPage: ParentComponent = () => {
    // const res = trpc.hello.useQuery(() => ({ name: "from tRPC" }))
    const thePermit = trpc.getOne.useQuery(() => parameterObject)

    // console.log(`GruntifyPage thePermit: ${JSON.stringify(thePermit, null, 4)}`)

    const gruntifyExportedSource = thePermit.data ? thePermit.data.gruntify : ''

    const gruntifyExportedJson = gruntifyExportedSource.length > 0 ? gruntifyExportedSource.substring(gruntifyExportedSource.indexOf('{'), gruntifyExportedSource.lastIndexOf('}') + 1) : 'no data'

    console.log(`GruntifyPage gruntifyExportedJson: ${gruntifyExportedJson.length}`)

    return (
        <>
            <Title>Gruntify test</Title>

            <A href="/">Home</A>

            <h1>Gruntify test</h1>

            <h2>gruntifyExportedSource</h2>
            <Show when={thePermit.isSuccess} fallback="Loading...">
                <pre>
                    {thePermit.data.gruntify ? jsonifyGruntifiedSource(thePermit.data.gruntify) : 'no data'}
                </pre>
            </Show>

            <h2>Full source</h2>
            {/* <Show when={thePermit}> */}
            <pre>{JSON.stringify(thePermit, null, 4)}</pre>
            {/* </Show> */}


        </>
    )
}

export default GruntifyPage




function jsonifyGruntifiedSource(gruntifiedSource: string) {
    return gruntifiedSource.substring(gruntifiedSource.indexOf('{'), gruntifiedSource.lastIndexOf('}') + 1)
}
