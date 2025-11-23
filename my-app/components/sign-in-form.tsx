'use client'
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  CardHeader,
  CardFooter,
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from "./ui/card";

import { useActionState } from "react";
import { type Formstate } from "@/validations/auth";
import { FormError } from "./form-error";
import { actions } from "@/actions";

const styles = {
  formContainer: "max-w-2xl mx-auto mt-10 min-w-md",
  card: "shadow-lg",
  header: "mb-4",
  title: "text-2xl font-bold",
  description: "text-gray-600",
  content: "space-y-4",
  footer: "mt-4 flex flex-col items-center",
  label: "block mb-1 font-medium",
  input: "w-full",
  button: "w-full mt-4"
}

const INITIAL_STATE: Formstate = {
  success: false,
  message: undefined,
  strapiErrors: null,
  zodErrors: null,
  data: {
    identifier: '',
    password: '',
  },
};

export function SignInForm() {
  const [formState, formAction] = useActionState(actions.auth.loginUser, INITIAL_STATE);
  console.log(formState)
  return (
    <div className={styles.formContainer}>
      <form action={formAction}>
        <Card className={styles.card}>
          <CardHeader className={styles.header}>
            <CardTitle className={styles.title}>Sign In</CardTitle>
            <CardDescription className={styles.description}>
              Please enter your credentials to sign in.
            </CardDescription>
          </CardHeader>
          <CardContent className={styles.content}>
            <div>
              <Label htmlFor="email" className={styles.label}>Email</Label>
              <Input type="email" name="email" id="email" className={styles.input} defaultValue={formState.data?.email ?? ''}/>
              <FormError error={formState.zodErrors?.identifier} />
            </div>
            <div>
              <Label htmlFor="password" className={styles.label}>Password</Label>
              <Input type="password" id="password" name="password" className={styles.input} defaultValue={formState.data?.password ?? ''}/>
              <FormError error={formState.zodErrors?.password} />
            </div>
          </CardContent>
          <CardFooter className={styles.footer}>
            <Button className={styles.button}>Sign In</Button>
            {formState.strapiErrors && <p className="text-red-600 text-sm mt-2">{formState.strapiErrors.message}</p>}
          </CardFooter>
          <p className="text-center text-sm mt-4">
            Don&apos;t have an account? <a href="/signup" className="text-blue-600 underline">Sign Up</a>
          </p>
        </Card>
      </form>
    </div>
  );
}