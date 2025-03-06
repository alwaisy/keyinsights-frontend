// components/ResultsDisplay.tsx
"use client";

import { Copy, Download, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";

interface ResultsDisplayProps {
  convertedText: string;
  setConvertedText: (text: string) => void;
  hasInsights?: boolean;
}

export default function ResultsDisplay({
  convertedText,
  setConvertedText,
  hasInsights = false,
}: ResultsDisplayProps) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(convertedText);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([convertedText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "youtube-transcript.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Card className="mt-8 border border-gray-800 bg-black/60 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Converted Text</CardTitle>
          {hasInsights && (
            <Badge
              variant="outline"
              className="border-purple-700 bg-purple-900/30 text-purple-300"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              AI Insights Included
            </Badge>
          )}
        </div>
        <CardDescription>
          The text has been extracted from the video
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/50">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="markdown">Markdown</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="mt-4">
            <div className="prose prose-invert h-[300px] max-w-none overflow-y-auto rounded-md border border-gray-700 bg-black/30 p-4">
              <ReactMarkdown>{convertedText}</ReactMarkdown>
            </div>
          </TabsContent>
          <TabsContent value="markdown" className="mt-4">
            <Textarea
              value={convertedText}
              onChange={(e) => setConvertedText(e.target.value)}
              className="h-[300px] border-gray-700 bg-black/30 font-mono"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={handleCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </Button>
        <Button variant="default" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
