// @refresh reload
import "./root.css"
import { Suspense } from "solid-js"
import {
    Body,
    ErrorBoundary,
    FileRoutes,
    Head,
    Html,
    Meta,
    Routes,
    Scripts,
    Title,
} from "solid-start"

export default function Root() {
    return (
        <Html lang="en">
            <Head>
                <Title>SolidStart beta | SolidJS with tRPC Zod Prisma Tailwind Upstash Ratelimit Meta Auth0</Title>
                <Meta charset="utf-8" />
                <Meta name="viewport" content="width=device-width, initial-scale=1" />

                <Meta
                    name="twitter:image:src"
                    content="https://bluedwarf.space/assets/moon_logo.svg"
                />
                <Meta name="twitter:site" content="@BlueDwarfSpace" />
                <Meta name="twitter:card" content="summary_large_image" />
                <Meta
                    name="twitter:title"
                    content="Blue Dwarf Space Recombobulator - SolidJS SolidStart beta test"
                />
                <Meta
                    name="twitter:description"
                    content="Making space reachable to all by fundamentally changing industry processes to create a frictionless path by navigating the red tape, while supporting a truly sustainable space sector."
                />
                <Meta
                    property="og:image"
                    content="https://bluedwarf.space/assets/moon_logo.svg"
                />
                <Meta
                    property="og:image:alt"
                    content="Making space reachable to all by fundamentally changing industry processes to create a frictionless path by navigating the red tape, while supporting a truly sustainable space sector."
                />
                <Meta property="og:image:width" content="1200" />
                <Meta property="og:image:height" content="600" />
                <Meta property="og:site_name" content="BlueDwarf" />

                <link rel="preconnect" href="https://api.fonts.coollabs.io" />
                <link href="https://api.fonts.coollabs.io/css2?family=Montserrat&family=Rajdhani:wght@600&family=Orbitron:wght@600&family=VT323&display=swap" rel="stylesheet"></link>

            </Head>
            <Body>
                <Suspense>
                    <ErrorBoundary>
                        <Routes>
                            <FileRoutes />
                        </Routes>
                    </ErrorBoundary>
                </Suspense>
                <Scripts />
            </Body>
        </Html>
    )
}
