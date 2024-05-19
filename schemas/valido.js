import { setLocale } from "yup";
import { es } from "yup-locales";
import { object, string, boolean } from "yup";

setLocale(es);

export const loginSchema = object({
  username: string().required().strict(),
  password: string().required().strict()
});

export const createtodoSchema = object({
  title: string().required().strict()
});

export const updateTodoSchema = object({
  id: string().required().strict(),
  title: string().optional().strict(),
  completed: boolean().optional().strict(),
});
export const idTodoSchema = object({
  id: string().required().strict()
});