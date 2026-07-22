/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided -- registered by AiCoreModule.forRoot; dynamic modules are not resolved by this rule */
import {
    ForbiddenException,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import type {
    AiModelClient,
    AiModelRequest,
    AiModelResponse,
} from "./ai-model.types.js";
import type { AiToolContext, AnyAiToolContract } from "./ai-tool.contract.js";
import { AI_MODEL_CLIENT, AI_TOOL_CONTRACTS } from "./ai-core.tokens.js";

@Injectable()
export class AiCoreService {
    private readonly toolsByName: ReadonlyMap<string, AnyAiToolContract>;

    constructor(
        @Inject(AI_MODEL_CLIENT)
        private readonly modelClient: AiModelClient,
        @Inject(AI_TOOL_CONTRACTS)
        toolContracts: AnyAiToolContract[],
    ) {
        this.toolsByName = new Map(
            toolContracts.map((contract) => [
                contract.definition.name,
                contract,
            ]),
        );
    }

    async generate(
        request: Omit<AiModelRequest, "tools">,
    ): Promise<AiModelResponse> {
        return await this.modelClient.generate({
            ...request,
            tools: [...this.toolsByName.values()].map(
                (tool) => tool.definition,
            ),
        });
    }

    async executeTool(
        name: string,
        input: unknown,
        context: AiToolContext,
    ): Promise<unknown> {
        const tool = this.toolsByName.get(name);
        if (!tool) {
            throw new NotFoundException(`AI tool not found: ${name}`);
        }

        const parsedInput = tool.parse(input);
        const isAuthorized = await tool.authorize(context, parsedInput);
        if (!isAuthorized) {
            throw new ForbiddenException(`AI tool is not authorized: ${name}`);
        }

        return await tool.execute(context, parsedInput);
    }
}
