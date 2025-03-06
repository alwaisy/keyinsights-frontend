// lib/api-client.ts

import { env } from "~/env";

const API_BASE_URL = env.NEXT_PUBLIC_API_BASE_URL;

export interface TranscriptRequest {
  video_id: string;
}

export interface TranscriptResponse {
  video_id: string;
  transcript: string;
}

export interface CombinedRequest {
  video_id?: string;
  url?: string;
  model?: string;
}

export interface CombinedResponse {
  video_id: string;
  transcript: string;
  insights?: string;
  processing_time?: number;
}

export interface ProcessingStatusResponse {
  status: string;
  progress: number;
  message: string;
  request_id?: string;
  estimated_completion_time?: string;
  error?: string;
  transcript?: string;
  insights?: string;
}

export interface ErrorResponse {
  detail: string;
  error_code?: string;
}

export interface RateLimitInfo {
  current_usage: number;
  limit: number;
  remaining: number;
  reset_at: string;
  reset_in_seconds: number;
  reset_in_minutes: number;
  reset_in_time: string;
  percentage_used: number;
}

// Function to extract video ID from YouTube URL
export function extractVideoId(url: string): string | null {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = regExp.exec(url);

  // Check if match exists and the capture group exists
  if (match?.[7] && match[7].length === 11) {
    return match[7];
  }

  return null;
}

// Function to start combined processing
export async function startCombinedProcessing(
  input: string,
): Promise<ProcessingStatusResponse> {
  const isUrl = input.includes("youtube.com") || input.includes("youtu.be");

  const request: CombinedRequest = isUrl ? { url: input } : { video_id: input };

  const response = await fetch(`${API_BASE_URL}/combined/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = (await response.json()) as ErrorResponse;
    throw new Error(errorData.detail || "Failed to start processing");
  }

  return (await response.json()) as ProcessingStatusResponse;
}

// Function to check processing status
export async function checkProcessingStatus(
  requestId: string,
): Promise<ProcessingStatusResponse> {
  const response = await fetch(`${API_BASE_URL}/status/${requestId}`);

  if (!response.ok) {
    const errorData = (await response.json()) as ErrorResponse;
    throw new Error(errorData.detail || "Failed to check status");
  }

  return (await response.json()) as ProcessingStatusResponse;
}

// Function to get processing result
export async function getProcessingResult(
  requestId: string,
): Promise<CombinedResponse> {
  const response = await fetch(`${API_BASE_URL}/combined/result/${requestId}`);

  if (response.status === 202) {
    // Still processing, no need to parse the response
    throw new Error("Still processing");
  }

  if (!response.ok) {
    const errorData = (await response.json()) as ErrorResponse;
    throw new Error(errorData.detail || "Failed to get result");
  }

  return (await response.json()) as CombinedResponse;
}

export async function getRateLimits(): Promise<RateLimitInfo> {
  const response = await fetch(`${API_BASE_URL}/limits`);

  console.log(response, "response");

  if (!response.ok) {
    throw new Error(`Failed to fetch rate limits: ${response.status}`);
  }

  // Fix: Add explicit type assertion to the response
  return (await response.json()) as RateLimitInfo;
}
