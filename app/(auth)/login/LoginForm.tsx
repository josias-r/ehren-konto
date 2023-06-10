"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import PasswordInput from "../PasswordInput";
import useApiLoadingToast from "@/components/ui/use-api-loading-toast";
import login from "@/app/api/auth/login/login";

interface FormShape {
  email: string;
  password: string;
}

function LoginForm() {
  const { apiLoadingToast } = useApiLoadingToast();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormShape>();
  const onSubmit: SubmitHandler<FormShape> = async (data) => {
    await apiLoadingToast(async () => login({ ...data }), {
      loadingMessage: "Logging in...",
      defaultErrorMessage: "Failed to log in",
      getAPIErrorMessage: (apiErr) => {
        switch (apiErr.error.message) {
          // case "email-not-confirmed":
          //   return "Please check your inbox";
          case "invalid-credentials":
            return "Invalid credentials";
          default:
            return "Please try again later";
        }
      },
      onSuccess: () => {
        router.push("/");
        router.refresh();
      },
    });
  };
  return (
    <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Ehre logo"
          width={150}
          height={150}
          className="block mx-auto mb-4"
        />
      </Link>
      <h1 className="text-center font-bold text-2xl">Sign in to ehre</h1>
      <p className="text-center text-gray-500 mb-4">
        Don&apos;t have an account?{" "}
        <Link
          className={cn(
            buttonVariants({ variant: "link" }),
            "p-0 inline text-base"
          )}
          href="/signup"
        >
          Sign up
        </Link>
      </p>
      <Input
        placeholder="Email"
        type="email"
        defaultValue=""
        {...register("email", {
          required: true,
        })}
      />
      <PasswordInput
        placeholder="Password"
        defaultValue=""
        {...register("password", {
          required: true,
        })}
      />
      <Button type="submit" className="block w-full" disabled={isSubmitting}>
        Sign in
      </Button>
    </form>
  );
}

export default LoginForm;
