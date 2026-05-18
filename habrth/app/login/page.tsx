import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Log In</h1>
      <p className="mt-3 text-gray-300">Welcome back to HABRTH.</p>
      <Link href="/" className="mt-8 text-sm underline underline-offset-4">
        Back to home
      </Link>
    </div>
  );
}
