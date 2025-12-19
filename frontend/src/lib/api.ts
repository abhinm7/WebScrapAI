import { CreateTaskResponse } from "../types/task";
import api from "./axios";
import { getErrorMessage } from "./error";

export async function createTask(url: string, question: string) {
    try {
        const res = await api.post('/tasks', { url, question });
        return res.data;
    } catch (err) {
        throw new Error(getErrorMessage(err));
    }

}

export async function fetchTask(id: string) {
    try {
        const res = await api.get(`/tasks/${id}`);
        return res.data;
    } catch (err) {
        throw new Error(getErrorMessage(err));
    }
}   