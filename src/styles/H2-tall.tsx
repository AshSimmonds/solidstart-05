import styles from "./H2-tall.module.css"

export function H2Tall(props) {
    return (

        <div class={styles.h2}>
            {props.children}
        </div>

    )
}
