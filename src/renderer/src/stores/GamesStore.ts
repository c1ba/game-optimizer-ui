import { writable } from "svelte/store";
import { makeSubscribe } from "../utils/FetchUtils";

export type GamesType = {
    id: string;
    name: string;
    releaseYear: number;
}

export const GamesStore = () => {
    return writable([], makeSubscribe([], undefined, '/games'))
};