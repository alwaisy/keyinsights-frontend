// components/ConversionForm.tsx
"use client";

import { Loader2, Youtube } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";

interface ConversionFormProps {
  input: string;
  setInput: (input: string) => void;
  isLoading: boolean;
  onConvert: () => void;
}

export default function ConversionForm({
  input,
  setInput,
  isLoading,
  onConvert,
}: ConversionFormProps) {
  return (
    <Card className="border border-gray-800 bg-black/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Convert Video</CardTitle>
        <CardDescription>Enter a YouTube URL or video ID</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input
            placeholder="https://www.youtube.com/watch?v=... or video ID"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border-gray-700 bg-black/50"
            disabled={isLoading}
          />
          <Button
            onClick={onConvert}
            disabled={isLoading || !input}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              <>
                <Youtube className="mr-2 h-4 w-4" />
                Convert
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
