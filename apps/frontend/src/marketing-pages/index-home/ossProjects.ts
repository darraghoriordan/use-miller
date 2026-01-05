export interface OssProject {
    id: string;
    terminalTitle: string;
    displayName: string;
    description: string;
    features: string[];
    stats: {
        stars: number;
        contributors: string;
        extra: string;
    };
    links: {
        github: string;
        npm: string;
    };
    installCommand: string;
    codeExample: {
        comment: string;
        code: string;
    };
    iconType: "shield" | "cube";
}

export const ossProjects: OssProject[] = [
    {
        id: "eslint-plugin",
        terminalTitle: "eslint-plugin-nestjs-typed",
        displayName: "ESLint Plugin for NestJS",
        description:
            "Catch security issues and common bugs at lint time. Trusted by thousands of NestJS developers worldwide.",
        features: [
            "Dependency Injection validation",
            "Swagger/OpenAPI enforcement",
            "Security best practices",
            "CVE prevention rules",
            "Auto-fixable issues",
            "TypeScript support",
        ],
        stats: {
            stars: 215,
            contributors: "30+ Contributors",
            extra: "20+ Rules",
        },
        links: {
            github: "https://github.com/darraghoriordan/eslint-plugin-nestjs-typed",
            npm: "https://www.npmjs.com/package/@darraghor/eslint-plugin-nestjs-typed",
        },
        installCommand: `pnpm add -D \\
  @darraghor/eslint-plugin-nestjs-typed`,
        codeExample: {
            comment: "# eslint.config.mjs",
            code: `import nestjs from 
  "@darraghor/eslint-plugin-nestjs-typed";

export default [
  nestjs.configs.flatRecommended
];`,
        },
        iconType: "shield",
    },
    {
        id: "nest-backend-libs",
        terminalTitle: "@darraghor/nest-backend-libs",
        displayName: "NestJS Backend Libraries",
        description:
            "A collection of NestJS modules that accelerate product builds. Authentication, payments, organizations, and more.",
        features: [
            "Auth0 authentication",
            "Stripe payments integration",
            "TypeORM + PostgreSQL",
            "Organizations & Invitations",
            "Health checks",
            "OpenAPI support",
        ],
        stats: {
            stars: 15,
            contributors: "3 Contributors",
            extra: "10+ Modules",
        },
        links: {
            github: "https://github.com/darraghoriordan/nest-backend-libs",
            npm: "https://www.npmjs.com/package/@darraghor/nest-backend-libs",
        },
        installCommand: `pnpm add \\
  @darraghor/nest-backend-libs`,
        codeExample: {
            comment: "# main.module.ts",
            code: `import { CoreModule } from 
  "@darraghor/nest-backend-libs";

@Module({
  imports: [CoreModule]
})`,
        },
        iconType: "cube",
    },
];
