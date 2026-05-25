import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="flex items-end gap-3">
        <h1 className="text-5xl font-bold">HABRTH</h1>
        <h4 className="text-xl">"Forge Your Character"</h4>
      </div>
      <div className="mt-8 flex gap-4">
        <Link
          href="/signup"
          className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200"
        >
          Sign Up
        </Link>
        <Link
          href="/login"
          className="px-6 py-2 bg-gray-700 text-white font-semibold rounded hover:bg-gray-600"
        >
          Log In
        </Link>
      </div>
    </main>
  );
}
