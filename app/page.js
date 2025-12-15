import Login from "./components/login";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main className="h-screen flex flex-col items-center justify-center gap-10">
      <Image
        src="/Assets/Elmo.jpg"
        alt="Background"
        fill
        priority
        className="object-cover -z-10 opacity-30"
      />
      <h1 className="rainbow-text text-[70px] underline decoration-white text-center">
        NCR Movie Watchlist
      </h1>

      <p className="rainbow-text text-[40px] text-center">
        Sign in to continue
      </p>

      <Login />

    </main>
  );
}
