import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import type { AiModelClient } from "./ai-model.types.js";
import type { AiToolContext, AnyAiToolContract } from "./ai-tool.contract.js";
import { AiCoreService } from "./ai-core.service.js";

describe("AiCoreService", () => {
    const modelGenerate = vi.fn(() =>
        Promise.resolve({ text: "done", toolCalls: [] }),
    );
    const modelClient: AiModelClient = {
        generate: modelGenerate,
    };

    const authorizeTool = vi.fn((context: AiToolContext) =>
        Promise.resolve(context.userId === "owner"),
    );
    const executeTool = vi.fn((context: AiToolContext, input: unknown) => {
        void context;
        return Promise.resolve(input);
    });

    const tool: AnyAiToolContract = {
        definition: {
            name: "rename_project",
            description: "Rename a project",
            inputSchema: { type: "object" },
        },
        parse(input) {
            if (!input || typeof input !== "object" || !("name" in input)) {
                throw new Error("name is required");
            }
            return input;
        },
        authorize: authorizeTool,
        execute: executeTool,
    };

    it("passes registered tool definitions to the provider", async () => {
        const service = new AiCoreService(modelClient, [tool]);

        await service.generate({
            messages: [{ role: "user", content: "Rename it" }],
        });

        expect(modelGenerate).toHaveBeenCalledWith(
            expect.objectContaining({
                tools: [expect.objectContaining({ name: "rename_project" })],
            }),
        );
    });

    it("parses and authorizes a tool before execution", async () => {
        const service = new AiCoreService(modelClient, [tool]);
        const result = await service.executeTool(
            "rename_project",
            { name: "New name" },
            { userId: "owner" },
        );

        expect(result).toEqual({ name: "New name" });
        expect(authorizeTool).toHaveBeenCalled();
        expect(executeTool).toHaveBeenCalled();
    });

    it("rejects an unauthorized tool call", async () => {
        const service = new AiCoreService(modelClient, [tool]);

        await expect(
            service.executeTool(
                "rename_project",
                { name: "New name" },
                { userId: "stranger" },
            ),
        ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it("rejects an unknown tool", async () => {
        const service = new AiCoreService(modelClient, [tool]);

        await expect(
            service.executeTool("missing", {}, { userId: "owner" }),
        ).rejects.toBeInstanceOf(NotFoundException);
    });
});
