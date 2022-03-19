import { FormEvent, useEffect, useRef, useState } from "react";
import Router from "next/router";
import { formatLocation, SearchLocation } from "lib/weather";
import Link from "next/link";
import { FaLocationArrow, FaSearch } from "react-icons/fa";

export const Search: React.FC = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<SearchLocation[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const timeout = useRef<NodeJS.Timeout>();

    async function fillSuggestions() {
        const res = await fetch(`/api/search?query=${query}`);
        const data = await res.json();
        if (data.error) {
            alert(`Error with searching: ${data.error.message}`);
        } else {
            setSuggestions(data);
        }
    }

    useEffect(() => {
        if (!query) return setSuggestions([]);

        // when user stops typing for certain time peform search
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(fillSuggestions, 250);
    }, [query]);

    useEffect(() => {
        Router.events.on("routeChangeComplete", () => setQuery(""));
    }, []);

    async function searchLocation(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (query) {
            // fill suggestions as to get the correct url
            if (timeout.current) clearTimeout(timeout.current);
            await fillSuggestions();
            Router.push(`/weather/${suggestions[0]?.url ?? query}`);
        }
    }

    function geolocateSearch() {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                Router.push(`/weather/${coords.latitude},${coords.longitude}`);
            },
            () => alert("Failed to get current location.")
        );
    }

    function unfocusInput() {
        if (document.activeElement?.className != "suggestions") {
            setIsFocused(false);
        }
    }

    return (
        <form onSubmit={searchLocation} className="search">
            <button title="Search using current location" onClick={geolocateSearch} type="button">
                <FaLocationArrow />
            </button>
            <input
                placeholder="Search location, coordinates, IP address"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={unfocusInput}
            />
            <button title="Search">
                <FaSearch />
            </button>
            {isFocused && (
                <div className="suggestions">
                    {suggestions.map((suggestion) => (
                        <Link href={`/weather/${suggestion.url}`} key={suggestion.id}>
                            {formatLocation(suggestion)}
                        </Link>
                    ))}
                </div>
            )}
        </form>
    );
};
