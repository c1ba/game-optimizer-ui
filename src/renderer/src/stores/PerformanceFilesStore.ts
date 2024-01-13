import { writable } from "svelte/store";
import { api } from "../services/api";

export type FileResponseType = {
    name: string;
    link: string;
};

export type PerformanceFilesType = {
    files: FileResponseType[];
    by: string;
}

export const PerformanceFilesStore =  writable([]);

export const getPerformanceFilesByGameAndComponents = async (args: {gameId: string; processorId: string; graphicsId: string; ramId: string;}) => {
    const response = await api.get(`/performance_files/${args.gameId}?processorId=${args.processorId}&graphicsId=${args.graphicsId}&ramId=${args.ramId}`);
    PerformanceFilesStore.set(response.data);
    return response.data;
}