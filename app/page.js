import Login from "./components/login";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main className="h-screen flex flex-col items-center justify-center gap-10">

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
