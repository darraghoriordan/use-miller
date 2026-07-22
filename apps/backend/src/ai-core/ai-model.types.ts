export interface AiMessage {
    role: "assistant" | "system" | "tool" | "user";
    content: string;
    toolCallId?: string;
}

export interface AiToolCall {
    id: string;
    name: string;
    arguments: unknown;
}

export interface AiModelResponse {
    text?: string;
    toolCalls: AiToolCall[];
    usage?: {
        inputTokens?: number;
        outputTokens?: number;
    };
}

export interface AiToolDefinition {
    name: string;
    description: string;
    inputSchema: Record<string, unknown>;
}

export interface AiModelRequest {
    messages: AiMessage[];
    tools?: AiToolDefinition[];
    model?: string;
    abortSignal?: AbortSignal;
}

export interface AiModelClient {
    generate(request: AiModelRequest): Promise<AiModelResponse>;
}
