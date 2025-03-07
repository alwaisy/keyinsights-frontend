// src/app/_components/client.tsx
"use client";

import { AlertCircle, PlusCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Header from "~/components/header";
import InputSection from "~/components/input-form";
import InsightsDisplay from "~/components/insights-display";
import RateLimitDisplay from "~/components/rate-limit-display";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { BackgroundBeams } from "~/components/ui/background-beams";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import {
  type ProcessingStatusResponse,
  startCombinedProcessing,
} from "~/lib/api-client";
import { StatusWebSocket } from "~/lib/websocket-client";

export default function YouTubeInsights() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [insights, setInsights] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [showInputForm, setShowInputForm] = useState(true);

  // WebSocket reference
  const wsRef = useRef<StatusWebSocket | null>(null);
  const [wsConnected, setWsConnected] = useState(false);

  // Function to handle the extraction process
  const handleExtract = async () => {
    if (!input.trim()) return;

    // IMPORTANT: Reset all state variables
    setIsLoading(true);
    setError(null);
    setTranscript(""); // Clear previous transcript
    setInsights(null); // Clear previous insights
    setProgress(0);
    setStatusMessage("Starting analysis...");
    setRequestId(null); // Clear previous request ID
    setShowInputForm(false);
    setWsConnected(false);

    // Disconnect any existing WebSocket connection
    if (wsRef.current) {
      wsRef.current.disconnect();
      wsRef.current = null;
    }

    try {
      const response = await startCombinedProcessing(input);
      setRequestId(response.request_id ?? null);
      setStatusMessage(response.message);
      setProgress(response.progress * 100);

      // Toast notification for better UX
      toast.success("Analysis started successfully");
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMsg);
      setIsLoading(false);
      setShowInputForm(true);

      // Toast notification for error
      toast.error(errorMsg);
    }
  };

  // Handle WebSocket connection when requestId changes
  useEffect(() => {
    if (!requestId || !isLoading) return;

    console.log("Setting up WebSocket connection for request:", requestId);
    setWsConnected(false); // Reset connection status when setting up a new connection

    // Handle status updates from WebSocket
    const handleStatusUpdate = (status: ProcessingStatusResponse) => {
      console.log("Received status update:", status);
      setWsConnected(true);

      // Update progress and message
      setProgress(status.progress * 100);
      setStatusMessage(status.message);

      // If transcript is available but processing is still ongoing
      if (status.transcript && !transcript) {
        setTranscript(status.transcript);
        toast.info("Transcript is ready!");
      }

      // If insights are available
      if (status.insights && !insights) {
        setInsights(status.insights);
        toast.success("Insights are ready!");
      }

      // Handle completion status
      if (status.status === "completed") {
        setIsLoading(false);
        if (status.transcript) setTranscript(status.transcript);
        if (status.insights) setInsights(status.insights);

        toast.success("Analysis completed successfully!");

        // Close WebSocket when processing is complete
        if (wsRef.current) {
          wsRef.current.disconnect();
        }
      } else if (status.status === "partial_success") {
        // Handle partial success
        setIsLoading(false);
        if (status.transcript) setTranscript(status.transcript);

        // Show a message about the insights failure
        toast.warning(
          status.message ||
            "Insights couldn't be generated, but transcript is available",
        );

        // Set error for insights section but don't show the main error alert
        setInsights(
          "**Insights Generation Failed**\n\nWe couldn't generate insights for this video. The transcript is available for you to review.",
        );

        // Close WebSocket when processing is complete
        if (wsRef.current) {
          wsRef.current.disconnect();
        }
      } else if (status.status === "failed") {
        setError(status.error ?? "Analysis failed");
        setIsLoading(false);
        setShowInputForm(true);

        toast.error(status.error ?? "Analysis failed");

        // Close WebSocket on failure
        if (wsRef.current) {
          wsRef.current.disconnect();
        }
      }
    };

    // Handle WebSocket errors
    const handleWsError = (errorMsg: string) => {
      console.error("WebSocket error:", errorMsg);
      setWsConnected(false);

      // Only show error toast, don't update error state to avoid disrupting the UI
      toast.error(errorMsg, {
        description: "Trying to reconnect...",
        duration: 3000,
      });

      // Add reconnection attempt
      if (wsRef.current) {
        setTimeout(() => {
          console.log("Attempting to reconnect WebSocket...");
          if (requestId && isLoading) {
            wsRef.current?.connect();
          }
        }, 3000);
      }
    };

    // Create and connect WebSocket
    wsRef.current = new StatusWebSocket(
      requestId,
      handleStatusUpdate,
      handleWsError,
    );
    wsRef.current.connect();

    // Cleanup on unmount or when requestId changes
    return () => {
      console.log("Cleaning up WebSocket connection");
      if (wsRef.current) {
        wsRef.current.disconnect();
        wsRef.current = null;
      }
    };
  }, [requestId, isLoading, transcript, insights]);

  const ConnectionStatus = () => {
    if (!isLoading || !requestId) return null;

    return (
      <div className="absolute right-2 top-2 flex items-center gap-2 text-xs">
        <div
          className={`h-2 w-2 rounded-full ${wsConnected ? "bg-green-500" : "bg-red-500"}`}
        ></div>
        <span className="text-gray-400">
          {wsConnected ? "Connected" : "Connecting..."}
        </span>
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden">
      <BackgroundBeams className="opacity-20" />
      <ConnectionStatus />

      <div className="container relative z-10 mx-auto px-4 py-10">
        <Header />

        {showInputForm ? (
          <InputSection
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            onExtract={handleExtract}
          />
        ) : (
          <div className="mb-8 flex flex-col items-center justify-center gap-y-2">
            <Button
              variant="outline"
              onClick={() => setShowInputForm(true)}
              className="flex items-center gap-2"
            >
              <PlusCircle size={16} />
              Analyze Another Video
            </Button>

            <RateLimitDisplay />
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6 mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <div className="mb-6 mt-4 rounded-md border border-gray-800 bg-black/60 p-4">
            <p className="mb-2 text-gray-300">
              {statusMessage ?? "Analyzing video..."}
            </p>
            <Progress value={progress} className="mb-5 h-2" />
            <RateLimitDisplay />
          </div>
        )}

        {(insights ?? transcript) && (
          <InsightsDisplay transcript={transcript} insights={insights} />
        )}
      </div>
    </div>
  );
}
