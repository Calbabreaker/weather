import { FormEvent, useState } from "react";

export default function Index() {
    const [location, setLocation] = useState("");

    function searchLocation(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        alert(`Search ${location}`);
    }

    return (
        <>
            <h1>Find out the Weather</h1>
        </>
    );
}
