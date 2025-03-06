// components/InsightsDisplay.tsx
"use client";

import { AlignLeft, Copy, Download, FileText, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";

interface InsightsDisplayProps {
  transcript: string;
  insights: string | null;
}

export default function InsightsDisplay({
  transcript,
  insights,
}: InsightsDisplayProps) {
  // Use insights if available, otherwise use transcript
  const content = insights ?? "No insights available yet.";

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleDownload = (text: string, filename: string) => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Card className="overflow-hidden border border-gray-800 bg-black/60 backdrop-blur-sm">
      <CardContent className="p-0">
        {/* Enhanced Typography for Insights */}
        <div className="typography-container p-6">
          <ReactMarkdown
            components={{
              h1: ({ ...props }) => (
                <h1
                  className="mb-4 mt-6 scroll-m-20 text-4xl font-bold tracking-tight first:mt-0 lg:text-5xl"
                  {...props}
                />
              ),
              h2: ({ ...props }) => (
                <h2
                  className="mb-4 mt-10 scroll-m-20 border-b border-gray-800 pb-2 text-3xl font-semibold tracking-tight first:mt-0"
                  {...props}
                />
              ),
              h3: ({ ...props }) => (
                <h3
                  className="mb-3 mt-8 scroll-m-20 text-2xl font-semibold tracking-tight"
                  {...props}
                />
              ),
              h4: ({ ...props }) => (
                <h4
                  className="mb-2 mt-6 scroll-m-20 text-xl font-semibold tracking-tight"
                  {...props}
                />
              ),
              p: ({ ...props }) => (
                <p
                  className="leading-7 [&:not(:first-child)]:mt-6"
                  {...props}
                />
              ),
              ul: ({ ...props }) => (
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
              ),
              ol: ({ ...props }) => (
                <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
              ),
              li: ({ ...props }) => <li className="mt-2" {...props} />,
              blockquote: ({ ...props }) => (
                <blockquote
                  className="mt-6 border-l-2 border-gray-400 pl-6 italic text-gray-300"
                  {...props}
                />
              ),
              a: ({ ...props }) => (
                <a
                  className="font-medium text-purple-400 underline underline-offset-4 hover:text-purple-300"
                  {...props}
                />
              ),
              code: ({ ...props }) => (
                <code
                  className="relative rounded bg-gray-800 px-[0.3rem] py-[0.2rem] font-mono text-sm"
                  {...props}
                />
              ),
              table: ({ ...props }) => (
                <div className="my-6 w-full overflow-y-auto">
                  <table className="w-full" {...props} />
                </div>
              ),
              thead: ({ ...props }) => <thead {...props} />,
              tbody: ({ ...props }) => <tbody {...props} />,
              tr: ({ ...props }) => (
                <tr
                  className="m-0 border-t border-gray-700 p-0 even:bg-gray-900/20"
                  {...props}
                />
              ),
              th: ({ ...props }) => (
                <th
                  className="border border-gray-700 px-4 py-2 text-left font-bold"
                  {...props}
                />
              ),
              td: ({ ...props }) => (
                <td
                  className="border border-gray-700 px-4 py-2 text-left"
                  {...props}
                />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-gray-800 bg-black/30 p-4">
          {/* Transcript Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <AlignLeft className="mr-1 h-4 w-4" />
                View Transcript
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl border border-gray-800 bg-black/90">
              <DialogHeader>
                <DialogTitle>Video Transcript</DialogTitle>
                <DialogDescription>
                  Raw transcript extracted from the video
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 max-h-[60vh] overflow-y-auto rounded-md border border-gray-700 bg-black/50 p-4">
                <p className="text-sm text-gray-300">
                  {transcript || "Transcript not available."}
                </p>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(transcript)}
                  disabled={!transcript}
                >
                  <Copy className="mr-1 h-4 w-4" />
                  Copy Transcript
                </Button>
                <DialogClose asChild>
                  <Button variant="outline" size="sm">
                    <X className="mr-1 h-4 w-4" />
                    Close
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>

          {/* Markdown Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <FileText className="mr-1 h-4 w-4" />
                Markdown
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl border border-gray-800 bg-black/90">
              <DialogHeader>
                <DialogTitle>Content</DialogTitle>
                <DialogDescription>
                  View and export content in different formats
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="insights" className="mt-4">
                <TabsList className="grid w-full grid-cols-2 bg-black/50">
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                  <TabsTrigger value="transcript">Transcript</TabsTrigger>
                </TabsList>
                <TabsContent value="insights" className="mt-4">
                  <Textarea
                    value={insights ?? "No insights available."}
                    readOnly
                    className="h-[300px] border-gray-700 bg-black/50 font-mono text-sm"
                  />
                  <div className="mt-4 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleDownload(insights ?? "", "youtube-insights.md")
                      }
                      disabled={!insights}
                    >
                      <Download className="mr-1 h-4 w-4" />
                      Download
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleCopy(insights ?? "")}
                      disabled={!insights}
                    >
                      <Copy className="mr-1 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="transcript" className="mt-4">
                  <Textarea
                    value={transcript || "No transcript available."}
                    readOnly
                    className="h-[300px] border-gray-700 bg-black/50 font-mono text-sm"
                  />
                  <div className="mt-4 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleDownload(
                          transcript || "",
                          "youtube-transcript.md",
                        )
                      }
                      disabled={!transcript}
                    >
                      <Download className="mr-1 h-4 w-4" />
                      Download
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleCopy(transcript || "")}
                      disabled={!transcript}
                    >
                      <Copy className="mr-1 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          {/* Quick Actions */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCopy(content)}
            className="text-gray-400 hover:text-white"
          >
            <Copy className="mr-1 h-4 w-4" />
            Copy
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDownload(content, "youtube-insights.md")}
            className="text-gray-400 hover:text-white"
          >
            <Download className="mr-1 h-4 w-4" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
