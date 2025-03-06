// src/lib/websocket-client.ts
import type { ProcessingStatusResponse } from "./api-client";

export class StatusWebSocket {
  private socket: WebSocket | null = null;
  private requestId: string;
  private onStatusUpdate: (status: ProcessingStatusResponse) => void;
  private onError: (error: string) => void;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second delay
  private pingInterval: NodeJS.Timeout | null = null;

  constructor(
    requestId: string,
    onStatusUpdate: (status: ProcessingStatusResponse) => void,
    onError: (error: string) => void,
  ) {
    this.requestId = requestId;
    this.onStatusUpdate = onStatusUpdate;
    this.onError = onError;
  }

  connect(): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      console.log("WebSocket already connected");
      return;
    }

    try {
      const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsBase =
        process.env.NEXT_PUBLIC_WS_BASE_URL ??
        `${wsProtocol}//${window.location.host}/api/v1`;

      const wsUrl = `${wsBase}/ws/${this.requestId}`;

      console.log(`Connecting to WebSocket: ${wsUrl}`);
      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = (): void => {
        console.log("WebSocket connected successfully");
        this.reconnectAttempts = 0;

        // Send an initial message to trigger status update
        setTimeout(() => {
          if (this.socket?.readyState === WebSocket.OPEN) {
            console.log("Sending initial ping to get status");
            this.socket.send("ping");
          }
        }, 500);

        // Set up ping interval
        if (this.pingInterval) clearInterval(this.pingInterval);
        this.pingInterval = setInterval(() => this.ping(), 30000);
      };

      this.socket.onmessage = (event: MessageEvent): void => {
        console.log("Received WebSocket message:", event.data);

        // Handle simple "pong" response
        if (event.data === "pong") {
          console.log("Received pong response");
          return;
        }

        try {
          // Parse the JSON
          const parsedData: unknown = JSON.parse(event.data as string);
          console.log("Parsed WebSocket data:", parsedData);

          // Validate the parsed data
          if (
            parsedData &&
            typeof parsedData === "object" &&
            "status" in parsedData
          ) {
            // Now it's safe to use as ProcessingStatusResponse
            this.onStatusUpdate(parsedData as ProcessingStatusResponse);
          } else {
            console.error("Received invalid message format", parsedData);
          }
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Unknown parsing error";
          console.error("Failed to parse WebSocket message", errorMessage);
        }
      };

      this.socket.onerror = (event: Event): void => {
        console.error("WebSocket error:", event);
        this.onError("Connection error. Status updates may be delayed.");
        this.attemptReconnect();
      };

      this.socket.onclose = (event: CloseEvent): void => {
        console.log("WebSocket closed:", event.code, event.reason);

        // Clear ping interval
        if (this.pingInterval) {
          clearInterval(this.pingInterval);
          this.pingInterval = null;
        }

        // Attempt to reconnect if not closed cleanly
        if (!event.wasClean) {
          this.attemptReconnect();
        }
      };
    } catch (error) {
      console.error("Error setting up WebSocket:", error);
      this.onError("Failed to establish connection. Will retry automatically.");
      this.attemptReconnect();
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.onError("Connection lost. Please refresh the page to try again.");
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    console.log(
      `Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`,
    );

    setTimeout(() => this.connect(), delay);
  }

  // Send a ping to keep the connection alive
  ping(): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log("Sending ping to keep connection alive");
      this.socket.send("ping");
    }
  }

  disconnect(): void {
    // Clear ping interval
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }

    // Close socket
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}
