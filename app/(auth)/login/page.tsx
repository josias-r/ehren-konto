import LoginForm from "@/lib/auth/LoginForm";

function Login() {
  return (
    <main className="p-4 h-full max-w-md mx-auto grid items-center">
      <LoginForm />
      {/* <div className="fixed inset-0 -m-8 -z-10">
        <Image
          className="absolute inset-0 w-full h-full -translate-y-64 object-cover blur-xl opacity-90"
          src="/bg-mountain-transparent.png"
          alt="gradient background image"
          width={50}
          height={50}
        />
      </div> */}
    </main>
  );
}

export default Login;
