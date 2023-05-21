"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { signup } from "@/app/(auth)/signup/signup.action";
import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import Link from "next/link";

interface FormShape {
  email: string;
  password: string;
}

function SignupForm() {
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const { register, handleSubmit } = useForm<FormShape>();
  const onSubmit: SubmitHandler<FormShape> = (data) => {
    startTransition(async () => {
      const response = await signup({ ...data });
      if (response.error) {
        switch (response.error) {
          case "user-exists":
            toast({
              title: "User already exists",
              variant: "destructive",
            });
            break;
          case "invalid-email":
            toast({
              title: "Invalid email",
              variant: "destructive",
            });
            break;
          case "insufficient-password":
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
          title: "Account created",
          description: "You can now log in",
          // TODO: email verification
          // description: "Please check your email to verify your account",
        });
        redirect("/login");
      }
    });
  };
  return (
    <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Ehre logo"
          width={200}
          height={200}
          className="block mx-auto mb-4"
        />
      </Link>
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
      <Link className={buttonVariants({ variant: "outline" })} href="/login">
        Sign in
      </Link>
    </form>
  );
}

export default SignupForm;
