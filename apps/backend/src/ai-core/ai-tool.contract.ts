import type { AiToolDefinition } from "./ai-model.types.js";

export interface AiToolContext {
    userId: string;
    organisationId?: string;
}

export interface AiToolContract<TInput, TOutput> {
    definition: AiToolDefinition;
    parse(input: unknown): TInput;
    authorize(context: AiToolContext, input: TInput): Promise<boolean>;
    execute(context: AiToolContext, input: TInput): Promise<TOutput>;
}

export type AnyAiToolContract = AiToolContract<unknown, unknown>;
