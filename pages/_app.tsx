import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NavBar } from "components/NavBar";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <NavBar />
            <main>
                <Component {...pageProps} />
            </main>
        </>
    );
}
