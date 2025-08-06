type WebSocketMessage = {
  type: 'connected' | 'refresh';
  message: string;
  project_id: string;
};

type WebSocketEventHandlers = {
  onConnected?: (event: Event) => void;
  onDisconnected?: (event: CloseEvent) => void;
  onError?: (error: Event) => void;
  onRefreshNeeded?: (data: WebSocketMessage) => void;
  onMaxReconnectAttemptsReached?: () => void;
};

export class MonocleWebSocket {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private projectId: string;
  private serverUrl: string;
  private handlers: WebSocketEventHandlers;

  constructor(
    projectId: string,
    serverUrl: string = 'ws://localhost:3000',
    handlers: WebSocketEventHandlers = {}
  ) {
    this.projectId = projectId;
    this.serverUrl = serverUrl;
    this.handlers = handlers;
  }

  connect(): void {
    const wsUrl = `${this.serverUrl}/api/ws/${this.projectId}`;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = (event) => {
        console.log('Connected to Monocle WebSocket');
        this.reconnectAttempts = 0;
        this.reconnectDelay = 1000;
        this.handlers.onConnected?.(event);
      };

      this.ws.onmessage = (event) => {
        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event.code, event.reason);
        this.handlers.onDisconnected?.(event);
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.handlers.onError?.(error);
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      this.handlers.onError?.(error as Event);
    }
  }

  private handleMessage(data: WebSocketMessage): void {
    switch (data.type) {
      case 'connected':
        console.log(
          'WebSocket connection confirmed for project:',
          data.project_id
        );
        break;
      case 'refresh':
        console.log('Dashboard refresh requested:', data.message);
        this.handlers.onRefreshNeeded?.(data);
        break;
      default:
        console.log('Unknown message type:', data.type, data);
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${this.reconnectDelay}ms`
      );

      this.reconnectTimeout = setTimeout(() => {
        this.connect();
      }, this.reconnectDelay);

      // Exponential backoff
      this.reconnectDelay = Math.min(this.reconnectDelay * 2, 30000);
    } else {
      console.error('Max reconnection attempts reached');
      this.handlers.onMaxReconnectAttemptsReached?.();
    }
  }

  disconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  updateHandlers(handlers: Partial<WebSocketEventHandlers>): void {
    this.handlers = { ...this.handlers, ...handlers };
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}
