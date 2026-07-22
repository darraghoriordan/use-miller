# AI core capability

This optional module supplies provider-neutral model and tool contracts. It deliberately
does not select an AI vendor, model, prompt, storage layer, or user experience.

Enable the capability in project metadata with `pnpm mill -- add ai`. Then provide an
`AiModelClient` adapter from the application composition root and register narrowly
scoped tools through `AiCoreModule.forRoot`.

Every tool must parse its input, authorize against the current user and organisation,
and execute through an application service. Controllers and model-generated arguments
must never bypass those checks. Production adapters should add timeout handling, rate
limits, cost accounting, tracing with content redaction, and deterministic test fakes.
