import LoginForm from "@/app/(auth)/login/LoginForm";

export const metadata = {
  title: "Sign in",
  description:
    "Experience more with your friends by easily creating and participating in activities together!",
};

async function Login() {
  return (
    <main className="p-4 h-full max-w-md mx-auto grid items-center">
      <LoginForm />
    </main>
  );
}

export default Login;
