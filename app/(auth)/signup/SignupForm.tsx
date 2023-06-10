"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import PasswordInput from "../PasswordInput";
import useApiLoadingToast from "@/components/ui/use-api-loading-toast";
import signup from "@/app/api/auth/signup/signup";
import { useToast } from "@/components/ui/use-toast";

interface FormShape {
  email: string;
  password: string;
}

function SignupForm() {
  const { apiLoadingToast } = useApiLoadingToast();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormShape>();
  const onSubmit: SubmitHandler<FormShape> = async (data) => {
    await apiLoadingToast(async () => await signup({ ...data }), {
      loadingMessage: "Signing up...",
      defaultErrorMessage: "Failed to sign up",
      getAPIErrorMessage: (apiErr) => {
        switch (apiErr.error.message) {
          case "user-exists":
            return "User already exists";
          case "invalid-email":
            return "Invalid email";
          case "insufficient-password":
            return "Insufficient password";
          default:
            return "Please try again later";
        }
      },
      onSuccess: () => {
        toast({
          title: "Account created",
          description: "You can now log in",
          // TODO: email verification
          // description: "Please check your email to verify your account",
        });
        redirect("/login");
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
      <h1 className="text-center font-bold text-2xl">Sign up to ehre</h1>
      <p className="text-center text-gray-500 mb-4">
        Already have an account?{" "}
        <Link
          className={cn(
            buttonVariants({ variant: "link" }),
            "p-0 inline text-base"
          )}
          href="/login"
        >
          Sign in
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
        validatePasswordStrength
        defaultValue=""
        {...register("password", {
          required: true,
        })}
      />
      <Button type="submit" className="block w-full" disabled={isSubmitting}>
        Sign up
      </Button>

      <p className="text-center text-xs text-gray-500 mt-4">
        By signing up, you agree to our <br />
        <Link
          className={cn(
            buttonVariants({ variant: "link" }),
            "p-0 inline text-muted-foreground text-xs"
          )}
          href="/terms"
          target="_blank"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          className={cn(
            buttonVariants({ variant: "link" }),
            "p-0 inline text-muted-foreground text-xs"
          )}
          href="/privacy"
          target="_blank"
        >
          Privacy Policy
        </Link>
        <br />
        ... once they exist :)
      </p>
    </form>
  );
}

export default SignupForm;
