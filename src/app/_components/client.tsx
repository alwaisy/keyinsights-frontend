// components/YouTubeConverter.tsx
"use client";

import { useEffect, useState } from "react";

import { AlertCircle } from "lucide-react";
import ConversionForm from "~/components/conversion-form";
import Header from "~/components/header";
import ResultsDisplay from "~/components/results-display";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { BackgroundBeams } from "~/components/ui/background-beams";
import { Progress } from "~/components/ui/progress";
import {
  checkProcessingStatus,
  startCombinedProcessing,
} from "~/lib/api-client";

export default function YouTubeConverter() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [convertedText, setConvertedText] = useState("");
  const [insights, setInsights] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Function to handle the conversion process
  const handleConvert = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);
    setConvertedText("");
    setInsights(null);
    setProgress(0);
    setStatusMessage("Starting processing...");

    try {
      const response = await startCombinedProcessing(input);
      setRequestId(response.request_id ?? null);
      setStatusMessage(response.message);
      setProgress(response.progress * 100);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!requestId || !isLoading) return;

    const pollInterval = 2000; // Poll every 2 seconds
    let timeoutId: NodeJS.Timeout;

    // Define the async function
    const checkStatus = async () => {
      try {
        const status = await checkProcessingStatus(requestId);
        setProgress(status.progress * 100);
        setStatusMessage(status.message);

        // If transcript is available but processing is still ongoing
        if (status.transcript && !convertedText) {
          setConvertedText(status.transcript);
        }

        // If insights are available
        if (status.insights) {
          setInsights(status.insights);
        }

        if (status.status === "completed") {
          setIsLoading(false);
          if (status.transcript) setConvertedText(status.transcript);
          if (status.insights) setInsights(status.insights);
        } else if (status.status === "failed") {
          setError(status.error ?? "Processing failed");
          setIsLoading(false);
        } else {
          // Schedule next poll
          timeoutId = setTimeout(executeCheckStatus, pollInterval);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to check status");
        setIsLoading(false);
      }
    };

    // Wrapper function that doesn't return a Promise
    const executeCheckStatus = () => {
      checkStatus().catch((err) => {
        console.error("Error in status check:", err);
        setError("Failed to check processing status");
        setIsLoading(false);
      });
    };

    // Start polling with the wrapper function
    timeoutId = setTimeout(executeCheckStatus, pollInterval);

    // Cleanup on unmount or when requestId changes
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [requestId, isLoading, convertedText]);

  // Combine transcript and insights for display
  const combinedMarkdown = insights
    ? `${convertedText}\n\n## AI-Generated Insights\n\n${insights}`
    : convertedText;

  return (
    <div className="relative overflow-hidden">
      <BackgroundBeams className="opacity-20" />

      <div className="container relative z-10 mx-auto px-4 py-10">
        <Header />

        <ConversionForm
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          onConvert={handleConvert}
        />

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <div className="mt-4 rounded-md border border-gray-800 bg-black/60 p-4">
            <p className="mb-2 text-gray-300">
              {statusMessage ?? "Processing..."}
            </p>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {convertedText && (
          <ResultsDisplay
            convertedText={combinedMarkdown}
            setConvertedText={setConvertedText}
            hasInsights={!!insights}
          />
        )}
      </div>
    </div>
  );
}
