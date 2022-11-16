import { Head } from "solid-start";
import { createMachine } from "xstate";
import PageTitle from "~/components/PageTitle";
import { trpc } from "~/utils/trpc";

const successOutcome = <span class="text-success">yep</span>
const failOutcome = <span class="text-warning">nope</span>


export default function AccessPage() {
    // const { user, error, isLoading } = useUser()

    // TODO: once auth is sorted, do this thang
    const user = {
        id: 'nope',
        name: 'nope',
        email: 'nope@nope.com',
        premium: false,
        power: false,
        admin: false
    }

    const error = undefined

    const isLoading = false



    // const accessLevelBackendPublic = trpc.authentication.canAccessBackendPublic.useQuery()
    // const accessLevelBackendRegistered = trpc.authentication.canAccessBackendRegistered.useQuery()
    // const accessLevelBackendPremium = trpc.authentication.canAccessBackendPremium.useQuery()
    // const accessLevelBackendPower = trpc.authentication.canAccessBackendPower.useQuery()
    // const accessLevelBackendAdmin = trpc.authentication.canAccessBackendAdmin.useQuery()


    // const accessLevelDataPublic = trpc.authentication.canAccessDatabasePublic.useQuery()
    // const accessLevelDataRegistered = trpc.authentication.canAccessDatabaseRegistered.useQuery()
    // const accessLevelDataPremium = trpc.authentication.canAccessDatabasePremium.useQuery()
    // const accessLevelDataPower = trpc.authentication.canAccessDatabasePower.useQuery()
    // const accessLevelDataAdmin = trpc.authentication.canAccessDatabaseAdmin.useQuery()


    // const accessLevelDataWritePublic = trpc.authentication.canAccessDatabaseWritePublic.useQuery()
    // const accessLevelDataWriteRegistered = trpc.authentication.canAccessDatabaseWriteRegistered.useQuery()
    // const accessLevelDataWritePremium = trpc.authentication.canAccessDatabaseWritePremium.useQuery()
    // const accessLevelDataWritePower = trpc.authentication.canAccessDatabaseWritePower.useQuery()
    // const accessLevelDataWriteAdmin = trpc.authentication.canAccessDatabaseWriteAdmin.useQuery()













    const { authentication } = trpc.useContext()

    // const initialIsFavourite = trpc.authentication.getFavourite.useQuery().data
    const initialIsFavourite = false


    const favouriteMachine =
        /** @xstate-layout N4IgpgJg5mDOIC5QDMCGA3A9gVwE4EsAXMAOnwgBswBiAFQHkBxRgGQFEBtABgF1FQADplhF8mAHb8QAD0QAmAMxySADgCcANgAsCrXLkB2LgrUGVAGhABPRAEY5XEhqUauWg1uMaArN60Bff0s0LDwiUgpMVAh8cShqbj4kECERQjFJZNkEA2U9A20VBTM9OTU1SxsEe2UyjQNdOVsuNQUNDRVAoJBxTAg4KRCcAmIySjApVNEJKWzDZWMjT1tvBV9db0rEbw0SNVLvOW83FVOVA0DgjGHwkkjo2KhJ4WnM0GyV2xIuORUtV3U+2MXA0WwQikcakOSmaChUzn0lxAQzCxGeaQys3kWhI+UKxT++jU5zBAFolN8Cd4Cs4dipbBouv4gA */
        createMachine(
            {
                context: { isFavourite: initialIsFavourite ? true : false },
                // tsTypes: {} as import("./access.typegen").Typegen0,
                predictableActionArguments: true,
                id: "favourite",
                initial: "idle",
                states: {
                    idle: {
                        on: {
                            TOGGLE: {
                                target: "toggling",
                            },
                        },
                    },
                    toggling: {
                        invoke: {
                            id: "toggleTheFavourite",
                            src: "toggleFavourite",
                            onDone: {
                                target: "idle",
                                // actions: assign({ isFavourite: event.data })
                            },
                            onError: {
                                target: "idle",
                            },
                        },
                    },
                },
            }, {
            services: {
                toggleFavourite: (context, event) => {
                    // console.log(`toggleFavourite BEFORE: ${JSON.stringify(context, null, 4)}`)

                    // if (context.isFavourite === undefined) {
                    //     throw new Error("context.isFavourite is undefined")
                    // }

                    context ? context.isFavourite = !context.isFavourite : ''

                    const newFavourite = authentication.toggleFavourite.fetch().then((isNowFavourite) => {

                        if (isNowFavourite === undefined) {
                            throw new Error('isNowFavourite is undefined')
                            // return 
                        }
                        context.isFavourite = isNowFavourite
                        // console.log(`toggleFavourite AFTER: ${context.isFavourite}`)

                        return isNowFavourite
                    })

                    return newFavourite

                },
            },

        })



    // function ComponentToggleSwitch() {
    //     const [current, send] = useMachine(favouriteMachine)

    //     return (
    //         <div>
    //             <div class={`checkbox-wrapper-55 ${current.value !== 'idle' ? 'cursor-wait disabled bg-red-500' : ''}`}>
    //                 <label class={`rocker rocker-small ${current.value !== 'idle' ? 'cursor-wait disabled bg-red-500' : ''}`}>
    //                     <input type="checkbox"
    //                         onChange={() => { send('TOGGLE') }} checked={current.context.isFavourite}
    //                         disabled={current.value !== 'idle'}
    //                     />
    //                     <span class={`switch-left ${current.value !== 'idle' ? 'cursor-wait disabled' : ''}`}>Yes</span>
    //                     <span class={`switch-right ${current.value !== 'idle' ? 'cursor-wait disabled' : ''}`}>No</span>
    //                 </label>
    //             </div>
    //             <div>
    //                 {`current.context: ${JSON.stringify(current.context, null, 4)}`}
    //             </div>
    //             <div>
    //                 {`State: ${current.value}`}
    //             </div>
    //         </div>
    //     );
    // }





















    return (
        <>
            <Head>
                <title>Testing different levels of access</title>
            </Head>

            <h1>Testing different levels of access</h1>

            {/* <h2>{JSON.stringify(favouriteState.context, null, 4)}</h2> */}

            <div class="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12 mb-8">

                <AccessCard title="Front-end UI" >
                    <ul>
                        <li>Guest: {successOutcome}</li>
                        <li>
                            Registered: {isLoading ? 'loading...' : (user ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </li>
                        <li>
                            Premium: {isLoading ? 'loading...' : (user?.premium || user?.admin ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </li>
                        <li>
                            Power: {isLoading ? 'loading...' : (user?.power || user?.admin ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </li>
                        <li>
                            Admin: {isLoading ? 'loading...' : (user?.admin ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </li>
                    </ul>
                </AccessCard>


                <AccessCard title="Back-end SERVER" >

                    <ul>
                        {/* <li>
                            Guest: {accessLevelBackendPublic.isFetching ? 'fetching...' : (accessLevelBackendPublic.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </li>
                        <li>
                            Registered: {accessLevelBackendRegistered.isLoading ? 'trying...' : (accessLevelBackendRegistered.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </li>
                        <li>
                            Premium: {accessLevelBackendPremium.isFetching ? 'fetching...' : (accessLevelBackendPremium.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </li>
                        <li>
                            Power: {accessLevelBackendPower.isFetching ? 'fetching...' : (accessLevelBackendPower.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </li>
                        <li>
                            Admin: {accessLevelBackendAdmin.isFetching ? 'fetching...' : (accessLevelBackendAdmin.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </li> */}
                    </ul>

                </AccessCard>

                <AccessCard title="Back-end DATA read" >

                    <ul>
                        {/* <li>
                            Guest: {accessLevelDataPublic.isFetching ? 'fetching...' : (accessLevelDataPublic.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </li>
                        <li>
                            Registered: {accessLevelDataRegistered.isFetching ? 'fetching...' : (accessLevelDataRegistered.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </li>
                        <li>
                            Premium: {accessLevelDataPremium.isFetching ? 'fetching...' : (accessLevelDataPremium.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </li>
                        <li>
                            Power: {accessLevelDataPower.isFetching ? 'fetching...' : (accessLevelDataPower.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </li>
                        <li>
                            Admin: {accessLevelDataAdmin.isFetching ? 'fetching...' : (accessLevelDataAdmin.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </li> */}
                    </ul>

                </AccessCard>


                <AccessCard title="Back-end DATA write" >

                    <ul>
                        {/* <li>
                            Guest: {accessLevelDataWritePublic.isFetching ? 'writing...' : (accessLevelDataWritePublic.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </li>
                        <li>
                            Registered: {accessLevelDataWriteRegistered.isFetching ? 'writing...' : (accessLevelDataRegistered.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </li>
                        <li>
                            Premium: {accessLevelDataWritePremium.isFetching ? 'fetching...' : (accessLevelDataWritePremium.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </li>
                        <li>
                            Power: {accessLevelDataWritePower.isFetching ? 'fetching...' : (accessLevelDataWritePower.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </li>
                        <li>
                            Admin: {accessLevelDataWriteAdmin.isFetching ? 'fetching...' : (accessLevelDataWriteAdmin.data ? <>{successOutcome}</> : <>{failOutcome}</>)}
                        </li> */}
                    </ul>

                </AccessCard>




                <AccessCard title="Toggle DATA" >
                    {/* <ComponentToggleSwitch /> */}
                </AccessCard>




            </div>


            <hr />

            <h2>Current user:</h2>
            <pre>
                {JSON.stringify(user, null, 4)}
            </pre>

        </>
    )
}










function AccessCard(props: any) {
    return (
        <div
            class="flex 
            flex-col 
            p-4 
            w-full
            md:w-64 
            bg-base-200
            rounded-lg
            shadow-lg
            border border-base-100
            hover:scale-105
            hover:shadow-xl
            transition-all

            ">

            <h2>{props.title}</h2>

            {props.children}

        </div>
    )
}


