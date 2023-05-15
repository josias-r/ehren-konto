"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { signup } from "@/lib/auth/signup.action";
import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

interface FormShape {
  email: string;
  password: string;
}

function SignupForm() {
  const [isPending, startTransition] = useTransition();

  const { toast, toasts } = useToast();

  const { register, handleSubmit } = useForm<FormShape>();
  const onSubmit: SubmitHandler<FormShape> = (data) => {
    startTransition(async () => {
      const response = await signup({ ...data });
      if (response.error) {
        if (response.error === "user-exists") {
          toast({
            description: "User already exists",
            variant: "destructive",
          });
        } else if (response.error === "invalid-email") {
          toast({
            description: "Invalid email",
            variant: "destructive",
          });
        } else if (response.error === "insufficient-password") {
          toast({
            title: "Insufficient password",
            description: (
              <>
                {response.pwValidationMessages.map((msg, i) => (
                  <p key={i}>{msg}</p>
                ))}
              </>
            ),
            variant: "destructive",
          });
        }
      } else if (response.success) {
        toast({
          title: "Account created",
          description: "Please check your email to verify your account",
        });
        redirect("/login");
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
        Sign up
      </Button>
      <Separator />
      <Button variant="outline" className="block w-full">
        Sign in
      </Button>
    </form>
  );
}

export default SignupForm;
