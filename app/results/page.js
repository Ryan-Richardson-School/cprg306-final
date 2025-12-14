import { Suspense } from "react";
import ResultsClient from "./ResultsClient";

export const dynamic = "force-dynamic";

export default function ResultsPage() {
  return (
    <Suspense fallback={<p className="p-10">Loading results...</p>}>
      <ResultsClient />
    </Suspense>
  );
}
