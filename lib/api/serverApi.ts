import { api } from "./api";
import { cookies } from "next/headers";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { AxiosResponse } from "axios";

/**
 * Собираем cookies в строку
 */
const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
};

/**
 * Универсальный helper
 */
const serverRequest = async <T>(
  url: string,
  config?: object
): Promise<AxiosResponse<T>> => {
  const cookieHeader = await getCookieHeader();

  return api.request<T>({
    url,
    ...config,
    headers: {
      Cookie: cookieHeader,
    },
  });
};

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export const fetchNotes = (
  params: FetchNotesParams
): Promise<AxiosResponse<Note[]>> => {
  return serverRequest("/notes", {
    method: "GET",
    params,
  });
};

export const fetchNoteById = (
  id: string
): Promise<AxiosResponse<Note>> => {
  return serverRequest(`/notes/${id}`, {
    method: "GET",
  });
};

export const getMe = (): Promise<AxiosResponse<User>> => {
  return serverRequest("/users/me", {
    method: "GET",
  });
};

export const checkSession = (): Promise<AxiosResponse> => {
  return serverRequest("/auth/session", {
    method: "GET",
  });
};
