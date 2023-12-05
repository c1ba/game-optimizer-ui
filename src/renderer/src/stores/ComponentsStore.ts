import { writable } from "svelte/store";
import { makeSubscribe } from "../utils/FetchUtils";

export const ComponentsStore = () => {
    return writable([], makeSubscribe([], undefined, '/components'))
};