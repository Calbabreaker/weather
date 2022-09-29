import React, { FormEvent, useEffect, useRef, useState } from "react";
import Router from "next/router";
import { formatLocation, SearchLocation } from "lib/weather";
import Link from "next/link";
import { faLocationArrow, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Search: React.FC = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<SearchLocation[]>([]);
    const [focused, setFocused] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const timeout = useRef<NodeJS.Timeout>();
    const formElement = useRef<HTMLFormElement>(null);

    async function fillSuggestions() {
        const res = await fetch(`/api/search?query=${query}`);
        const data = await res.json();
        if (data.error) {
            alert(`Error with searching: ${data.error.message}`);
        } else {
            setSuggestions(data);
        }
    }

    function onClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!formElement.current?.contains(target)) {
            setFocused(false);
        }
    }

    useEffect(() => {
        if (!query) return setSuggestions([]);

        // When user stops typing for certain time peform search
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(fillSuggestions, 250);
    }, [query]);

    useEffect(() => {
        Router.events.on("routeChangeComplete", () => setQuery(""));
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, []);

    async function selectSuggestion(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (query) {
            // Fill suggestions as to get the correct url
            if (timeout.current) clearTimeout(timeout.current);
            await fillSuggestions();
            Router.push(`/weather/${suggestions[selectedIndex]?.url ?? query}`);
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

    function onKeyDown(e: React.KeyboardEvent) {
        if (e.code == "ArrowDown") {
            setSelectedIndex(Math.min(selectedIndex + 1, suggestions.length));
            e.preventDefault();
        } else if (e.code == "ArrowUp") {
            setSelectedIndex(Math.max(selectedIndex - 1, 0));
            e.preventDefault();
        }
    }

    function mouseOverSuggestion(i: number) {
        setSelectedIndex(i);
    }

    return (
        <form onSubmit={selectSuggestion} className="search" ref={formElement}>
            <button title="Search using current location" onClick={geolocateSearch} type="button">
                <FontAwesomeIcon icon={faLocationArrow} />
            </button>
            <input
                placeholder="Search location, coordinates, IP address"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
                onFocus={() => setFocused(true)}
                onKeyDown={onKeyDown}
            />
            <button title="Search">
                <FontAwesomeIcon icon={faSearch} />
            </button>
            {focused && (
                <div className="suggestions">
                    {suggestions.map((suggestion, i) => (
                        <Link href={`/weather/${suggestion.url}`} key={i}>
                            <a
                                className={`${i == selectedIndex && "selected"}`}
                                onMouseOver={() => mouseOverSuggestion(i)}
                            >
                                {formatLocation(suggestion)}
                            </a>
                        </Link>
                    ))}
                </div>
            )}
        </form>
    );
};
