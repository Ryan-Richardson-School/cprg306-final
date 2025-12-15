import { Suspense } from "react";
import ResultsClient from "./ResultsClient";

export const dynamic = "force-dynamic";

export default function ResultsPage() {
  return (
    <Suspense fallback={<p className="p-10 rainbow-text text-[30px]">Loading results...</p>}>
      <ResultsClient />
    </Suspense>
  );
}