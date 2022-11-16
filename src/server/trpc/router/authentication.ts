import { z } from "zod"
import { procedureAdmin, procedurePower, procedurePremium, procedurePublic, procedureRegistered, router } from "../utils"
import env from "~/env/server"


const airtableBaseId = env.AIRTABLE_BASE_ID
const airtableApiKey = env.AIRTABLE_API_KEY

const airtableBaseUrl = "https://api.airtable.com/v0/" + airtableBaseId + "/"
const overseasPayloadPermitTable = "overseas_payload_permit"
const defaultFetchUrl = airtableBaseUrl + overseasPayloadPermitTable

const airtableAsdfTable = "asdf"

const asdfFetchUrl = airtableBaseUrl + airtableAsdfTable


export default router({
    greetings: procedurePublic.input(z.object({ name: z.string() })).query(({ input }) => {
        return `salutations ${input.name}`
    }),
    canAccessBackendPublic: procedurePublic.query(() => {
        return true
    }),



    canAccessBackendRegistered: procedureRegistered.query(() => {
        return true;
    }),

    canAccessBackendPremium: procedurePremium.query(() => {
        return true;
    }),

    canAccessBackendPower: procedurePower.query(() => {
        return true;
    }),

    canAccessBackendAdmin: procedureAdmin.query(() => {
        return true;
    }),





    canAccessDatabasePublic: procedurePublic.query(async () => {
        return _fetchFromAirtableAsBoolean()
    }),

    canAccessDatabaseRegistered: procedureRegistered.query(({ ctx }) => {
        return _fetchFromAirtableAsBoolean('ctx.session.user.sub')
    }),

    canAccessDatabasePremium: procedurePremium.query(({ ctx }) => {
        return _fetchFromAirtableAsBoolean('ctx.session.user.sub')
    }),

    canAccessDatabasePower: procedurePower.query(({ ctx }) => {
        return _fetchFromAirtableAsBoolean('ctx.session.user.sub')
    }),

    canAccessDatabaseAdmin: procedureAdmin.query(({ ctx }) => {
        return _fetchFromAirtableAsBoolean('ctx.session.user.sub')
    }),




    canAccessDatabaseWritePublic: procedurePublic.query(() => {
        return _postToAirtableFetchAsBoolean(undefined, undefined, "authentication.ts | canAccessDatabaseWritePublic")
    }),

    canAccessDatabaseWriteRegistered: procedureRegistered.query(({ ctx }) => {
        return _postToAirtableFetchAsBoolean('ctx.session.user.sub', undefined, "authentication.ts | canAccessDatabaseWriteRegistered")
    }),

    canAccessDatabaseWritePremium: procedurePremium.query(({ ctx }) => {
        return _postToAirtableFetchAsBoolean('ctx.session.user.sub', undefined, "authentication.ts | canAccessDatabaseWritePremium")
    }),

    canAccessDatabaseWritePower: procedurePower.query(({ ctx }) => {
        return _postToAirtableFetchAsBoolean('ctx.session.user.sub', undefined, "authentication.ts | canAccessDatabaseWritePower")
    }),

    canAccessDatabaseWriteAdmin: procedureAdmin.query(({ ctx }) => {
        return _postToAirtableFetchAsBoolean('ctx.session.user.sub', undefined, "authentication.ts | canAccessDatabaseWriteAdmin")
    }),



    getFavourite: procedureRegistered.query(async ({ ctx }) => {

        // console.log(`authentication.ts | getFavourite | ctx.session.user.sub: ${ctx.session.user.sub}`)

        const theFavourite = await _getFavourite('ctx.session.user.sub')

        // console.log(`authentication.ts | getFavourite | theFavourite: ${theFavourite}`)

        return theFavourite
    }),

    toggleFavourite: procedureRegistered.query(({ ctx }) => {
        const isFavourite = _postToAirtableFetchAsBoolean('ctx.session.user.sub', 1, "authentication.ts | favouriteToggle")
            .then(() => {
                return _getFavourite('ctx.session.user.sub')
            })

        return isFavourite
    }),




})













async function _fetchFromAirtable(userId: string | undefined = undefined) {

    const filterFormula = encodeURI(`?filterByFormula={user_id}="${userId ? userId : 'asdf'}"`)

    const fetchUrl = asdfFetchUrl + filterFormula

    const fetchResult = await fetch(fetchUrl, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + airtableApiKey,
            "Content-Type": "application/json"
        }
    }).then(airtableResult => airtableResult.json())
        .then(async airtableJson => {
            if (airtableJson.records.length > 0) {
                return airtableJson
            } else {
                const newAirtableData = await _createUserAsdfData(userId ? userId : 'asdf')

                // console.log(`fetchFromAirtable newAirtableData: ${JSON.stringify(newAirtableData, null, 4)}`)

                return newAirtableData
            }
        }).catch((error: Error) => {
            console.error(`fetchFromAirtable error: ${error}`)
            return false
        })


    // console.log(`fetchFromAirtable fetchResult: ${JSON.stringify(fetchResult, null, 4)}`)

    // Airtable doesn't return false booleans, so it comes through as undefined, real fucking helpful
    if (!fetchResult.records[0].fields.favourite) {
        fetchResult.records[0].fields.favourite = false
    }

    // console.log(`fetchFromAirtable fetchResult: ${JSON.stringify(fetchResult, null, 4)}`)

    return fetchResult
}







async function _fetchFromAirtableAsBoolean(userId: string | undefined = undefined) {

    const airtableResult = await _fetchFromAirtable(userId)
        .then((resultJson: { error: { message: string | undefined; }; records: []; }) => {

            // console.log(`fetchFromAirtableAsBoolean resultJson: ${JSON.stringify(resultJson, null, 4)}`)

            if (resultJson.error) {
                console.error(`fetchFromAirtableAsBoolean resultJson.error: ${JSON.stringify(resultJson.error, null, 4)}`)
                throw new Error(resultJson.error.message)
            }

            if (resultJson.records) {
                return true
            }

            return false
        }).catch((error: Error) => {
            console.error(`fetchFromAirtableAsBoolean error: ${JSON.stringify(error, null, 4)}`)
            return false
        })


    return airtableResult

}




async function _postToAirtableFetchAsBoolean(userId: string | undefined = undefined, toggleFavourite: number | undefined, extraModifiedContext: string | undefined = undefined) {

    // const filterFormula = encodeURI(`?filterByFormula={user_id}="${userId ? userId : 'asdf'}"`)
    const rightMeow = new Date().toLocaleString()

    const airtableCurrentResult = await _fetchFromAirtable(userId)
        .then((resultJson) => {

            // console.log(`postToAirtableAsBoolean resultJson: ${JSON.stringify(resultJson, null, 4)}`)

            if (resultJson.error) {
                console.log(`postToAirtableAsBoolean resultJson.error: ${JSON.stringify(resultJson.error, null, 4)}`)
                throw new Error(resultJson.error.message)
            }

            if (resultJson.records.length > 0) {

                // console.log(`postToAirtableAsBoolean resultJson.records: ${JSON.stringify(resultJson.records, null, 4)}`)

                let isNowFavourite = resultJson.records[0].fields.favourite

                isNowFavourite = toggleFavourite ? !isNowFavourite : isNowFavourite

                const userMetaData = {
                    "records": [
                        {
                            "id": resultJson.records[0].fields.record_id,
                            "fields": {
                                "favourite": isNowFavourite,
                                "modified_context": rightMeow + " | " + extraModifiedContext + " | postToAirtableAsBoolean"
                            }
                        }
                    ]
                }

                // console.log(`postToAirtableAsBoolean userMetaData: ${JSON.stringify(userMetaData, null, 4)}`)



                return fetch(asdfFetchUrl, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${airtableApiKey}`,
                    },
                    body: JSON.stringify(userMetaData)

                }).then(response => response.json()).then(theData => {

                    // console.log(`postToAirtableAsBoolean theData: ${JSON.stringify(theData, null, 4)}`)
                    return theData.records.length > 0
                })


                // return true
            }

            return false
        }).catch((error: Error) => {
            console.log(`postToAirtableAsBoolean error: ${error}`)
            return false
        })


    return airtableCurrentResult

}







function _createUserAsdfData(userId: string) {

    const fetchUrl = airtableBaseUrl + airtableAsdfTable

    const asdfUserMetaData = {
        "records": [
            {
                "fields": {
                    "user_id": userId,
                    "title": "new title",
                    "content": "new content",
                }
            }]
    }

    return fetch(fetchUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${airtableApiKey}`,
        },
        body: JSON.stringify(asdfUserMetaData)

    }).then(response => response.json()).then(theData => {

        return theData
    })

}




function _getFavourite(userId: string) {

    const isFavourite = _fetchFromAirtable(userId)
        .then((resultJson) => {
            // console.log(`_getFavourite resultJson.records[0].fields.favourite: ${JSON.stringify(resultJson.records[0].fields.favourite, null, 4)}`)
            return resultJson.records[0].fields.favourite ? true : false
        }).catch((error: Error) => {
            console.error(`getFavourite error: ${error}`)
            return false
        })

    return isFavourite

}


