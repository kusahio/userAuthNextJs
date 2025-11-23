import { z } from "zod";

export const SigninSchema = z.object({
    identifier: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password must be at most 100 characters"),
});

export const SignupSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be at most 30 characters"),
    email: z.email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password must be at most 100 characters"),
});

export type SigninSchemaType = z.infer<typeof SigninSchema>;
export type SignupSchemaType = z.infer<typeof SignupSchema>;

export type Formstate = {
    success?: boolean;
    message?: string;
    data?: {
        identifier?: string;
        username?: string;
        email?: string;
        password?: string;
    };
    strapiErrors?: {
        status: number;
        username: string;
        message: string;
        details?: Record<string, string[]>;
    } | null;
    zodErrors?: {
        identifier?: string[];
        username?: string[];
        email?: string[];
        password?: string[];
    } | null;
}