import SignupForm from "@/app/(auth)/signup/SignupForm";

export const metadata = {
  title: "Sign up",
  description:
    "Experience more with your friends by easily creating and participating in activities together!",
};

function Signup() {
  return (
    <main className="p-4 h-full max-w-md mx-auto grid items-center">
      <SignupForm />
    </main>
  );
}

export default Signup;
