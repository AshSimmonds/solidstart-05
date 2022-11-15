import { A } from "solid-start";
import PageTitle from "~/components/PageTitle";
import "../styles/Cyberpunk.module.css"

export default function NotFound() {
    return (
        <div class="text-center mx-auto">
            <PageTitle>Lost in space</PageTitle>
            <h1>
                <button class="text-2xl p-8"><A href="/" >404 | Not Found</A></button>
            </h1>
        </div>
    );
}
