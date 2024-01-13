import { writable } from "svelte/store"
import { parseJwt } from "../utils/JWTUtils";
import { api } from "../services/api";

export type UserDataType = {
    id: string;
    username: string;
    role: string;
}

export const UserStore = writable(localStorage.getItem("apiKey") ? 
    parseJwt(localStorage.getItem("apiKey")).exp > (new Date().getTime() / 1000) ? parseJwt(localStorage.getItem("apiKey")) : null 
: null)

export const saveLogin = (apiKey: string) => {
    localStorage.setItem("apiKey", apiKey);
    UserStore.update(() => parseJwt(localStorage.getItem("apiKey")));
    api.defaults.headers['Authorization'] = `Bearer ${apiKey}`;
}

export const saveLogout = () => {
    localStorage.removeItem("apiKey");
    api.defaults.headers['Authorization'] = "";
    UserStore.update(() => null);
}