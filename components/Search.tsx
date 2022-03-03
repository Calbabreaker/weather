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

    Router.events.on("routeChangeComplete", () => setQuery(""));

    return (
        <form onSubmit={searchLocation} className="search">
            <button>
                <FaLocationArrow />
            </button>
            <input
                placeholder="Search location, coordinates, IP address"
                type="text"
                onInput={(e) => setQuery(e.currentTarget.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            />
            <button>
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
