# Product contract

Miller helps a developer and their coding agent move from an application idea to a
maintainable production system without reconstructing authentication, billing, operations,
and project conventions from scratch.

## Principles

1. Generated code remains ordinary, inspectable application code.
2. The CLI is an automation interface, not a proprietary runtime dependency.
3. One supported default is better than many partially supported stacks.
4. Capabilities include tests, configuration, authorization, observability, and removal or
   upgrade paths—not only source scaffolding.
5. AI inside the product is optional; agent-assisted development is a core capability.

## Success criteria

- A fresh developer can diagnose setup from `mill doctor`.
- An agent can understand enabled capabilities from `mill describe --json`.
- Running a capability command twice produces no additional changes.
- Every generated capability has a narrow verification command.
- Upgrades preserve application-owned code and identify manual decisions explicitly.
