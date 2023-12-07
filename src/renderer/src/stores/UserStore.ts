import { writable } from "svelte/store"
import { parseJwt } from "../utils/JWTUtils";

export type UserDataType = {
    id: string;
    username: string;
    role: string;
}

export const UserStore = () => {
    return writable(localStorage.getItem("apiKey") ? parseJwt(localStorage.getItem("apiKey")) : null);
}

export const saveLogin = (apiKey: string) => {
    localStorage.setItem("apiKey", apiKey);
    UserStore().update(() => parseJwt(localStorage.getItem("apiKey")));
}

export const saveLogout = () => {
    localStorage.removeItem("apiKey");
    UserStore().update(() => null);
}