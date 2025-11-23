'use server'

import z from "zod";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SigninSchema, SignupSchema, type Formstate } from "@/validations/auth"
import { registerUserService, loginUserService } from "@/lib/strapi";

const cookieConfig = {
    maxAge : 60 * 60 * 24 * 7, // 1 week
    path : '/',
    httpOnly : true,
    domain: process.env.HOST ?? 'localhost',
    secure: process.env.NODE_ENV === 'production', 
};

export async function registerUser(prevState: Formstate, formData: FormData): Promise<Formstate> {

    const fields = {
        username: formData.get('username') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const validateFields = SignupSchema.safeParse(fields);

    if (!validateFields.success) {
        const flattennedErrors = z.flattenError(validateFields.error);

        console.log(flattennedErrors.fieldErrors);
        
        return {
            success: false,
            message: "Validation errors",
            strapiErrors: null,
            zodErrors: flattennedErrors.fieldErrors,
            data: {
                ...prevState.data,
                ...fields,
            },
        };
    }

    const response = await registerUserService(validateFields.data);

    if (!response || response.error) {
        return {
            success: false,
            message: response?.error?.message || "Registration failed",
            strapiErrors: response?.error || null,
            zodErrors: null,
            data: fields
        };
    }

    const cookieStore = await cookies();
    cookieStore.set('jwt', response.jwt, cookieConfig);
    redirect('/dashboard');  
}

export async function loginUser(prevState: Formstate, formData: FormData): Promise<Formstate> {

    const fields = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const validateFields = SigninSchema.safeParse(fields);

    if (!validateFields.success) {
        const flattennedErrors = z.flattenError(validateFields.error);

        console.log(flattennedErrors.fieldErrors);
        
        return {
            success: false,
            message: "Validation errors",
            strapiErrors: null,
            zodErrors: flattennedErrors.fieldErrors,
            data: {
                ...prevState.data,
                ...fields,
            },
        };
    }
    const response = await loginUserService(validateFields.data);

    if (!response || response.error) {
        return {
            success: false,
            message: response?.error?.message || "Registration failed",
            strapiErrors: response?.error || null,
            zodErrors: null,
            data: fields
        };
    }

    const cookieStore = await cookies();
    cookieStore.set('jwt', response.jwt, cookieConfig);
    redirect('/dashboard');  
}