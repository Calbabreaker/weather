import { FormEvent, useState } from "react";
import Router from "next/router";

export const Search: React.FC = () => {
    const [location, setLocation] = useState("");

    function searchLocation(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        Router.push(`/search/${location}`);
    }

    function goToLocation() {
        Router.push(`/weather/${location}`);
    }

    return (
        <>
            <form onSubmit={searchLocation}>
                <p>Search for location:</p>
                <input type="text" onChange={(e) => setLocation(e.currentTarget.value)} />
                <input type="submit" value="Search" />
                <input type="button" value="Go to directly" onClick={goToLocation} />
            </form>
        </>
    );
};
