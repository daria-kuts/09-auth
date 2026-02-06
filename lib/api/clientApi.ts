import { api } from "./api";
import type { Note } from "@/types/note";
import { User } from "@/types/user";

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { data } = await api.get("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const { data } = await api.post("/notes", payload);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};



interface AuthPayload {
  email: string;
  password: string;
}

export const register = async (payload: AuthPayload): Promise<User> => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

export const login = async (payload: AuthPayload): Promise<User> => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  const { data } = await api.get("/auth/session");
  return data ?? null;
};


export const getMe = async (): Promise<User> => {
  const { data } = await api.get("/users/me");
  return data;
};

export const updateMe = async (username: string): Promise<User> => {
  const { data } = await api.patch("/users/me", { username });
  return data;
};
