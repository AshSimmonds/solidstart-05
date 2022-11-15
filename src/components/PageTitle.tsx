import { Title } from "solid-start";

export default function PageTitle(props: any) {

    return (
        <>
            <Title>{props.children}</Title>
        </>
    )
}
