// src/app/_components/rate-limit-display.tsx
import { InfoIcon } from "lucide-react";
import useSWR, { type SWRResponse } from "swr";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { env } from "~/env";

interface RateLimitInfo {
  current_usage: number;
  limit: number;
  remaining: number;
  reset_at: string;
  reset_in_seconds: number;
  reset_in_minutes: number;
  reset_in_time: string;
  percentage_used: number;
}

// Fetcher function
const fetcher = async (url: string): Promise<RateLimitInfo> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }

  return (await response.json()) as RateLimitInfo;
};

export default function RateLimitDisplay() {
  // Use SWR with proper typing
  const { data, error, isLoading }: SWRResponse<RateLimitInfo, Error> = useSWR<
    RateLimitInfo,
    Error
  >(`${env.NEXT_PUBLIC_API_BASE_URL}/limits`, fetcher, {
    refreshInterval: 60000, // Refresh every minute
    revalidateOnFocus: true,
    dedupingInterval: 10000, // Deduplicate requests within 10 seconds
  });

  if (isLoading) {
    return <div className="text-xs text-gray-500">Loading limits...</div>;
  }

  if (error || !data) {
    return null; // Don't show anything on error
  }

  // Now we can safely use data
  const limits = data;

  // Calculate progress bar color based on usage percentage
  const getProgressColor = (percentage: number) => {
    if (percentage < 60) return "bg-green-500";
    if (percentage < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="flex items-center gap-1 text-xs text-gray-400">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex cursor-help items-center gap-1">
              <InfoIcon size={12} />
              <span>
                API: {limits.remaining}/{limits.limit}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <div className="space-y-2">
              <p>
                You&apos;ve used {limits.current_usage} of your {limits.limit}{" "}
                hourly API requests.
              </p>
              <p>Limit resets in {limits.reset_in_time}.</p>
              <div className="mt-1 h-2 w-full rounded-full bg-gray-700">
                <div
                  className={`h-2 rounded-full ${getProgressColor(limits.percentage_used)}`}
                  style={{ width: `${Math.min(100, limits.percentage_used)}%` }}
                />
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
