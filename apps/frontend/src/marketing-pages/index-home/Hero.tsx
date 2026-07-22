import Link from "next/link";

const capabilities = [
    ["Identity", "Auth, organizations, roles, and invitations"],
    ["Revenue", "Subscriptions, webhooks, and customer billing"],
    ["Operations", "Jobs, email, telemetry, and health checks"],
    ["Agent contract", "A manifest, commands, rules, and verification"],
];

const steps = [
    [
        "01",
        "Create",
        "Generate one supported application foundation, not a bag of disconnected snippets.",
    ],
    [
        "02",
        "Give your agent the brief",
        "Miller exposes the architecture and enabled capabilities in a format agents can inspect.",
    ],
    [
        "03",
        "Verify the work",
        "Run narrow checks after every change, then use the full build before you ship.",
    ],
];

function ArrowIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-4 w-4 fill-none stroke-current stroke-2"
        >
            <path d="M3 10h13M11 5l5 5-5 5" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-5 w-5 fill-none stroke-current stroke-2"
        >
            <path d="m4 10 4 4 8-9" />
        </svg>
    );
}

export function Hero() {
    return (
        <div className="miller-site">
            <header className="miller-nav">
                <Link
                    href="/"
                    className="miller-wordmark"
                    aria-label="Miller home"
                >
                    <span className="miller-mark" aria-hidden="true">
                        M
                    </span>
                    <span>Miller</span>
                </Link>
                <nav
                    aria-label="Primary navigation"
                    className="miller-nav-links"
                >
                    <a href="#system">Product</a>
                    <a href="#workflow">How it works</a>
                    <Link href="/docs">Docs</Link>
                    <a href="https://github.com/darraghoriordan/use-miller">
                        GitHub
                    </a>
                </nav>
                <a className="miller-nav-cta" href="#quickstart">
                    Create an app <ArrowIcon />
                </a>
            </header>

            <main>
                <section className="miller-hero">
                    <div className="miller-hero-copy">
                        <p className="miller-kicker">
                            Application foundation for agent-led development
                        </p>
                        <h1>
                            Build the app.
                            <br />
                            <span>Keep the foundation.</span>
                        </h1>
                        <p className="miller-lede">
                            Miller gives your coding agent a production
                            application, an explicit architecture, and safe
                            commands for extending it. You build what makes the
                            business different.
                        </p>
                        <div className="miller-actions">
                            <a
                                href="#quickstart"
                                className="miller-button miller-button-primary"
                            >
                                Create a Miller app <ArrowIcon />
                            </a>
                            <a
                                href="#workflow"
                                className="miller-button miller-button-secondary"
                            >
                                See the workflow
                            </a>
                        </div>
                        <ul
                            className="miller-trust"
                            aria-label="Miller principles"
                        >
                            <li>
                                <CheckIcon /> Ordinary TypeScript
                            </li>
                            <li>
                                <CheckIcon /> No runtime lock-in
                            </li>
                            <li>
                                <CheckIcon /> Agent-verifiable
                            </li>
                        </ul>
                    </div>

                    <div
                        className="miller-blueprint"
                        aria-label="Miller application architecture"
                    >
                        <div className="blueprint-label">APPLICATION / 001</div>
                        <div className="blueprint-title">YOUR PRODUCT</div>
                        <div className="blueprint-product">
                            <span>domain</span>
                            <span>workflows</span>
                            <span>experience</span>
                        </div>
                        <div className="blueprint-joint">built on</div>
                        <div className="blueprint-base">
                            <strong>MILLER FOUNDATION</strong>
                            <div>
                                <span>AUTH</span>
                                <span>BILLING</span>
                                <span>JOBS</span>
                                <span>EMAIL</span>
                                <span>OBSERVE</span>
                            </div>
                        </div>
                        <div className="blueprint-agent">
                            <span>AGENT INTERFACE</span>
                            <code>describe · doctor · add · verify</code>
                        </div>
                        <div className="blueprint-stamp">OWN THE CODE</div>
                    </div>
                </section>

                <section className="miller-statement">
                    <p>AI can generate a prototype.</p>
                    <h2>
                        It should not invent your permissions, billing model,
                        and production conventions every time it opens the
                        repository.
                    </h2>
                </section>

                <section id="system" className="miller-system">
                    <div className="miller-section-heading">
                        <span>THE SYSTEM</span>
                        <h2>
                            A foundation your agent can read, change, and prove.
                        </h2>
                    </div>
                    <div className="miller-capabilities">
                        {capabilities.map(([title, description], index) => (
                            <article key={title}>
                                <span>
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <h3>{title}</h3>
                                <p>{description}</p>
                            </article>
                        ))}
                    </div>
                    <div className="miller-receipt">
                        <div className="receipt-copy">
                            <p>Not another magic layer</p>
                            <h3>The CLI leaves a receipt.</h3>
                            <p>
                                Commands support dry runs and structured output.
                                The result is inspectable application code that
                                keeps working without Miller running.
                            </p>
                        </div>
                        <pre aria-label="Example Miller doctor output">
                            <code>
                                <span>$</span> pnpm mill doctor{"\n\n"}
                                <b>PASS</b> runtime.node{"\n"}
                                <b>PASS</b> workspace.lockfile{"\n"}
                                <b>PASS</b> backend.envTemplate{"\n"}
                                <b>PASS</b> frontend.envTemplate{"\n"}
                                <b>PASS</b> capability.ai{"\n\n"}6 checks
                                passed. Ready to build.
                            </code>
                        </pre>
                    </div>
                </section>

                <section id="workflow" className="miller-workflow">
                    <div className="miller-section-heading">
                        <span>THE WORKFLOW</span>
                        <h2>From blank directory to useful work.</h2>
                    </div>
                    <div className="miller-steps">
                        {steps.map(([number, title, description]) => (
                            <article key={number}>
                                <span>{number}</span>
                                <div>
                                    <h3>{title}</h3>
                                    <p>{description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="quickstart" className="miller-quickstart">
                    <div>
                        <p className="miller-kicker">
                            Start with the real thing
                        </p>
                        <h2>
                            Your next prompt should build the product, not
                            rebuild the plumbing.
                        </h2>
                    </div>
                    <div className="miller-command">
                        <span>QUICK START</span>
                        <code>
                            git clone
                            https://github.com/darraghoriordan/use-miller my-app
                        </code>
                        <code>cd my-app &amp;&amp; pnpm install</code>
                        <code>pnpm mill doctor</code>
                        <a href="https://github.com/darraghoriordan/use-miller">
                            Open Miller on GitHub <ArrowIcon />
                        </a>
                    </div>
                </section>
            </main>

            <footer className="miller-footer">
                <div className="miller-wordmark">
                    <span className="miller-mark">M</span>
                    <span>Miller</span>
                </div>
                <p>
                    Production foundations for developers who build with agents.
                </p>
                <div>
                    <Link href="/docs">Docs</Link>
                    <a href="https://github.com/darraghoriordan/use-miller">
                        GitHub
                    </a>
                </div>
            </footer>
        </div>
    );
}
