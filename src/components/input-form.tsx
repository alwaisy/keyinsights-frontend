// components/input-form.tsx
"use client";

import { Loader2, Search } from "lucide-react";
import RateLimitDisplay from "./rate-limit-display";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

interface InputSectionProps {
  input: string;
  setInput: (input: string) => void;
  isLoading: boolean;
  onExtract: () => void;
}

export default function InputForm({
  input,
  setInput,
  isLoading,
  onExtract,
}: InputSectionProps) {
  return (
    <Card className="mb-8 border border-gray-800 bg-black/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Extract Video Insights</CardTitle>
        <CardDescription>
          Enter a YouTube URL or video ID to analyze
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex space-x-2">
          <Input
            placeholder="https://www.youtube.com/watch?v=... or video ID"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border-gray-700 bg-black/50"
            disabled={isLoading}
          />
          <Button
            onClick={onExtract}
            disabled={isLoading || !input}
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Analyze
              </>
            )}
          </Button>
        </div>
        <RateLimitDisplay />
      </CardContent>
    </Card>
  );
}
