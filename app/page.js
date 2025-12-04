import Login from "./components/login";

export const dynamic = "force-dynamic";  // required to stop SSR for Firebase auth

export default function Page() {
  return (
    <main style={{ display:"flex", flexDirection:"column", alignItems:"center", marginTop:"50px" }}>
      <h1>Welcome — Sign in Below</h1>
      <Login />  {/* Firebase login now loads ONLY on the client (safe for deploy) */}
    </main>
  );
}
