import { FormEvent, useEffect, useRef, useState } from "react";
import Router from "next/router";
import { formatLocation, SearchLocation } from "lib/weather";
import Link from "next/link";

export const Search: React.FC = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<SearchLocation[]>([]);
    const timeout = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (!query) return setSuggestions([]);

        // when user stops typing for certain time peform search
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(async () => {
            const res = await fetch(`/api/search?query=${query}`);
            const data = await res.json();
            if (data.error) {
                alert(`Error with searching: ${data.error.message}`);
            } else {
                setSuggestions(data);
            }
        }, 250);
    }, [query]);

    function searchLocation(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        Router.push(`/weather/${query}`);
    }

    return (
        <form onSubmit={searchLocation} className="search">
            <input
                placeholder="Location, Coordinates, IP Address"
                type="text"
                onInput={(e) => setQuery(e.currentTarget.value)}
            />
            <div>
                {suggestions.map((suggestion) => (
                    <Link href={`/weather/${suggestion.url}`} key={suggestion.id}>
                        {formatLocation(suggestion)}
                    </Link>
                ))}
            </div>
        </form>
    );
};
