export type Capability =
    "ai" | "auth" | "billing" | "email" | "jobs" | "observability";

export type SetupCapability = Extract<Capability, "auth" | "billing">;
export type SetupProfile = "local" | "production";

export type ServiceKind =
    "database" | "cache" | "telemetry" | "tracing" | "metrics";

export interface MillerServiceConfig {
    kind: ServiceKind;
    application: "backend" | "frontend";
    source: string;
    composeService: string;
    capability?: Capability;
    requiredEnvironment?: string[];
}

export interface MillerConfig {
    $schema?: string;
    schemaVersion: 1;
    project: { name: string; slug: string };
    runtime: { node: string; packageManager: string };
    applications: { backend: string; frontend: string };
    capabilities: Record<Capability, boolean>;
    infrastructure?: {
        provider: "terraform";
        profiles: Record<
            SetupProfile,
            Partial<Record<SetupCapability, string>> & { environment?: string }
        >;
    };
    services?: Record<string, MillerServiceConfig>;
}

export interface CheckResult {
    id: string;
    status: "pass" | "fail" | "warn";
    message: string;
    fix?: string;
}

export interface SetupChange {
    target: string;
    action: "create" | "update";
    keys: string[];
}

export interface SetupStep {
    id: string;
    status: "planned" | "applied" | "unchanged" | "skipped";
    message: string;
}

export interface SetupResult {
    ok: true;
    profile: SetupProfile;
    capabilities: SetupCapability[];
    applied: boolean;
    changed: boolean;
    changes: SetupChange[];
    steps: SetupStep[];
    credentials: CredentialInstruction[];
}

export interface CredentialInstruction {
    id: string;
    capability: SetupCapability;
    required: boolean;
    configured: boolean;
    environmentVariables: string[];
    destination: string;
    destinationKeys: string[];
    sourceUrl?: string;
    instructions: string;
    relatedUrl?: string;
}

export interface ConfigurationReport {
    status: "configured" | "unconfigured" | "development";
    sources: string[];
    presentKeys: string[];
    missingKeys: string[];
    notes: string[];
}

export interface InfrastructureReport {
    provider: "terraform";
    profile: SetupProfile;
    path: string;
    status: "configured" | "unconfigured" | "unknown";
    variables: "configured" | "missing";
    initialized: boolean;
    outputs: "available" | "unavailable" | "not-checked";
}

export interface CapabilityReport {
    id: Capability;
    enabled: boolean;
    status: "ready" | "attention" | "disabled";
    configuration: ConfigurationReport;
    infrastructure?: InfrastructureReport;
    services: string[];
}

export interface ServiceReport {
    id: string;
    kind: ServiceKind;
    capability?: Capability;
    status:
        | "disabled"
        | "configured"
        | "unconfigured"
        | "running"
        | "stopped"
        | "unknown";
    source: string;
    composeService: string;
    missingKeys: string[];
    runtime: "running" | "stopped" | "unavailable" | "not-checked";
}

export interface ReportRecommendation {
    id: string;
    severity: "warning" | "error";
    message: string;
    command?: string;
    mutates: "none" | "local" | "external";
}

export interface ProjectReport {
    ok: true;
    schemaVersion: 1;
    profile: SetupProfile;
    deep: boolean;
    project: MillerConfig["project"];
    summary: {
        status: "ready" | "attention";
        enabledCapabilities: number;
        readyCapabilities: number;
        attentionCapabilities: number;
        disabledCapabilities: number;
        runningServices: number;
        serviceAttention: number;
    };
    capabilities: CapabilityReport[];
    infrastructure: InfrastructureReport[];
    services: ServiceReport[];
    recommendations: ReportRecommendation[];
    credentials: CredentialInstruction[];
}

export interface MultiProfileReport {
    ok: true;
    schemaVersion: 1;
    project: MillerConfig["project"];
    summary: { status: "ready" | "attention" };
    profiles: ProjectReport[];
}
