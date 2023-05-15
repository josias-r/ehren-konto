"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "@/lib/auth/login.action";
import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";

interface FormShape {
  email: string;
  password: string;
}

function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const { toast, toasts } = useToast();

  const { register, handleSubmit } = useForm<FormShape>();
  const onSubmit: SubmitHandler<FormShape> = (data) => {
    startTransition(async () => {
      const response = await login({ ...data });
      if (response.error) {
        switch (response.error) {
          case "email-not-confirmed":
            toast({
              title: "Email not confirmed",
              description: "Please check your inbox",
              variant: "destructive",
            });
            break;
          case "invalid-credentials":
            toast({
              title: "Invalid credentials",
              variant: "destructive",
            });
            break;
          default:
            toast({
              title: "Unknown error",
              description: "Please try again later",
              variant: "destructive",
            });
        }
      } else if (response.success) {
        toast({
          title: "Signed in",
        });
      }
    });
  };
  return (
    <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Image
        src="/Ehre-bright.svg"
        alt="Ehre logo"
        width={200}
        height={200}
        className="block mx-auto"
      />
      <Input
        placeholder="Email"
        type="email"
        defaultValue=""
        {...register("email", {
          required: true,
        })}
      />
      <Input
        type="password"
        placeholder="Password"
        defaultValue=""
        {...register("password", {
          required: true,
        })}
      />
      <Button type="submit" className="block w-full" disabled={isPending}>
        Sign in
      </Button>
      <Separator />
      <Button variant="outline" className="block w-full">
        Sign up
      </Button>
    </form>
  );
}

export default LoginForm;
