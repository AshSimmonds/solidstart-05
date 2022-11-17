import { type ParentComponent, Switch, Match, Show } from "solid-js"
import { A, Title } from "solid-start"
import { trpc } from "~/utils/trpc"

const testPermitId = 'recbr6s0W3tRpfUSw'

const parameterObject = {
    "permitId": testPermitId,
}

const GluntifyPage: ParentComponent = () => {
    // const res = trpc.hello.useQuery(() => ({ name: "from tRPC" }))
    const thePermit = trpc.gluntify.getOne.useQuery(() => parameterObject)

    // console.log(`GluntifyPage thePermit: ${JSON.stringify(thePermit, null, 4)}`)

    const gluntifyExportedSource = thePermit.data ? thePermit.data.gluntify : ''

    const gluntifyExportedJson = gluntifyExportedSource.length > 0 ? gluntifyExportedSource.substring(gluntifyExportedSource.indexOf('{'), gluntifyExportedSource.lastIndexOf('}') + 1) : 'no data'

    console.log(`GluntifyPage gluntifyExportedJson: ${gluntifyExportedJson.length}`)

    return (
        <>
            <Title>Gluntify test</Title>

            <A href="/">Home</A>

            <h1>Gluntify test</h1>

            <h2>gluntifyExportedSource</h2>

            <p>
                This is the bog standard building inspection form schema.
            </p>

            <Show when={thePermit.isSuccess} fallback="Loading...">
                <pre>
                    {thePermit.data.gluntify ? jsonifyGluntifiedSource(thePermit.data.gluntify) : 'no data'}
                </pre>
            </Show>

            <h2>Full source</h2>
            <p>
                ...of the Airtable record, for now.
            </p>
            {/* <Show when={thePermit}> */}
            <pre>{JSON.stringify(thePermit, null, 4)}</pre>
            {/* </Show> */}


        </>
    )
}

export default GluntifyPage




function jsonifyGluntifiedSource(gluntifiedSource: string) {
    return gluntifiedSource.substring(gluntifiedSource.indexOf('{'), gluntifiedSource.lastIndexOf('}') + 1)
}
