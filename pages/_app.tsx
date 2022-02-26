import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Search } from "components/Search";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main>
            <Component {...pageProps} />
            <Search />
        </main>
    );
}
