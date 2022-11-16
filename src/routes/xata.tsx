import { type ParentComponent, Switch, Match, Show } from "solid-js"
import { A, Title } from "solid-start"
import { trpc } from "~/utils/trpc"

const testAirtablePermitId = 'recbr6s0W3tRpfUSw'
const testXataPermitId = 'rec_cdmqgqdheior0kfh2cgg'

const parameterObject = {
    "permitId": testXataPermitId,
}

const XataPage: ParentComponent = () => {
    // const res = trpc.hello.useQuery(() => ({ name: "from tRPC" }))
    const thePermit = trpc.gruntify.getOne.useQuery(() => parameterObject)

    // console.log(`GruntifyPage thePermit: ${JSON.stringify(thePermit, null, 4)}`)

    const gruntifyExportedSource = thePermit.data ? thePermit.data.gruntify : ''

    const gruntifyExportedJson = gruntifyExportedSource.length > 0 ? gruntifyExportedSource.substring(gruntifyExportedSource.indexOf('{'), gruntifyExportedSource.lastIndexOf('}') + 1) : 'no data'

    console.log(`GruntifyPage gruntifyExportedJson: ${gruntifyExportedJson.length}`)

    return (
        <>
            <Title>Xata.io test</Title>

            <h1>Xata.io</h1>

            <h2>gruntifyExportedSource</h2>

            <p>
                This is the bog standard building inspection form schema.
            </p>

            <Show when={thePermit.isSuccess} fallback="Loading...">
                <pre>
                    {thePermit.data.gruntify ? jsonifyGruntifiedSource(thePermit.data.gruntify) : 'no data'}
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

export default XataPage




function jsonifyGruntifiedSource(gruntifiedSource: string) {
    return gruntifiedSource.substring(gruntifiedSource.indexOf('{'), gruntifiedSource.lastIndexOf('}') + 1)
}
