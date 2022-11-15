import { z } from "zod"
import { procedurePublic, procedurePublicRateLimited, procedureRegistered, router } from "../utils"
import env from "~/env/server"


const airtableBaseId = env.AIRTABLE_BASE_ID
const airtableApiKey = env.AIRTABLE_API_KEY

const airtableBaseUrl = "https://api.airtable.com/v0/" + airtableBaseId + "/"
const overseasPayloadPermitTable = "overseas_payload_permit"
const defaultFetchUrl = airtableBaseUrl + overseasPayloadPermitTable


export default router({
    asdf: procedurePublicRateLimited.input(z.object({ name: z.string() })).query(({ input }) => {
        return `gday ${input.name}`
    }),
    qwer: procedurePublicRateLimited
        .input(z.object({ num: z.number() }))
        .mutation(({ input }) => {
            return Math.floor(Math.random() * 100) / input.num
        }),





    getOne: procedurePublicRateLimited
        .input(z.object({
            permitId: z.string()
        }))
        .query(({ ctx, input }) => {

            const permitObject = _fetchFromAirtable(input.permitId)
                .then((permitObject: any) => {

                    // console.log(`getOne permitObject: ${JSON.stringify(permitObject, null, 4)}`)

                    return permitObject.records[0].fields
                })
                .catch((error: any) => {
                    console.log(`getOne error: ${error}`)
                })

            return permitObject
        }),
})






async function _fetchFromAirtable(permitId: string | undefined = undefined) {

    let filterFormula = ''
    if (permitId) {
        // filterFormula = encodeURI(`?filterByFormula={user_id}="${userId ? userId : 'asdf'}"`)
        filterFormula = encodeURI(`?filterByFormula={record_id}="${permitId}"`)
    }

    const fetchUrl = defaultFetchUrl + filterFormula

    const fetchResult = await fetch(fetchUrl, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + airtableApiKey,
            "Content-Type": "application/json"
        }
    }).then(airtableResult => airtableResult.json())
        .then(async airtableJson => {

            if (airtableJson.records.length > 0) {

                // console.log(`_fetchFromAirtable airtableJson: ${JSON.stringify(airtableJson, null, 4)}`)

                return airtableJson

            } else {
                // TODO: dunno
            }
        }).catch((error: Error) => {
            console.error(`gruntify.ts _fetchFromAirtable error: ${error}`)
            return error
        })






    // Airtable doesn't return false booleans, so it comes through as undefined, real fucking helpful
    // if (!fetchResult.records[0].fields.MISSING_FIELD) {
    //     fetchResult.records[0].fields.MISSING_FIELD = false
    // }

    // console.log(`fetchFromAirtable fetchResult: ${JSON.stringify(fetchResult, null, 4)}`)

    return fetchResult
}

