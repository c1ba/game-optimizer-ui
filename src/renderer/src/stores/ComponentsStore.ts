import { writable } from "svelte/store";
import { makeSubscribe } from "../utils/FetchUtils";

export enum ComponentTypeEnum {
    PROCESSOR = 'PROCESSOR',
    GRAPHICS_CARD = 'GRAPHICS_CARD',
    RAM = 'RAM'
}

export type ComponentType = {
    id: string;
    name: string;
    type: ComponentTypeEnum;
    capacity: number;
}

export type SortedComponentsResponse = {
    processors: ComponentType[];
    graphicCards: ComponentType[];
    rams: ComponentType[];
}

export const capacityType = (componentType: ComponentTypeEnum) => {
    switch (componentType) {
        case 'PROCESSOR':
            return 'GHz';
        case 'GRAPHICS_CARD':
            return 'GB';
        case 'RAM':
            return 'GB';
        default:
                throw new Error("Type not in range.");
    }
}

export const ComponentsStore = () => {
    return writable([], makeSubscribe([], undefined, '/components'))
};