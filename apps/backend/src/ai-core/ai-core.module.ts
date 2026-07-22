import { DynamicModule, Module } from "@nestjs/common";
import type { AiModelClient } from "./ai-model.types.js";
import type { AnyAiToolContract } from "./ai-tool.contract.js";
import { AiCoreService } from "./ai-core.service.js";
import { AI_MODEL_CLIENT, AI_TOOL_CONTRACTS } from "./ai-core.tokens.js";

export interface AiCoreModuleOptions {
    modelClient: AiModelClient;
    tools?: AnyAiToolContract[];
}

@Module({})
export class AiCoreModule {
    static forRoot(options: AiCoreModuleOptions): DynamicModule {
        return {
            module: AiCoreModule,
            providers: [
                {
                    provide: AI_MODEL_CLIENT,
                    useValue: options.modelClient,
                },
                {
                    provide: AI_TOOL_CONTRACTS,
                    useValue: options.tools ?? [],
                },
                AiCoreService,
            ],
            exports: [AiCoreService, AI_MODEL_CLIENT],
        };
    }
}
