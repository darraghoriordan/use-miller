import StyledLink from "../../components/StyledLink";
import { Container } from "../../components/Container";
import batImage from "./intro-media/bat.png";
import diffImage from "./intro-media/diff.png";
import exaImage from "./intro-media/exa.png";
import Image from "next/image";
import { UserDto } from "@use-miller/shared-api-client";
import { BuyNowButton } from "../../components/BuyNowButton.jsx";
import { TwitterCTA } from "../components/TwitterCTA.jsx";

export function Hero({ user }: { user: UserDto }) {
    const features = [
        "14+ well tested, re-runnable shell scripts that install everything a developer needs",
        "All tools configured to be available on Mac and Windows WSL Ubuntu where possible",
        "Near-instant searching on the CLI with fzf",
        "Great developer settings for your global git and npm configurations.",
        "Install all the tools you need from brew during setup, use my list or edit to suit your own needs.",
        "Dot files with all of the configuration I use for development",
        "Pre configured, git-aware terminal commands like ls (using exa), git and code syntax highlighting aware cat (using bat).",
        "A beautiful shell prompt (Pure prompt)",
        "Clean developer fonts from HackerFonts installed on Windows and Mac.",
        "Clone all of your repositories to a new computer during setup",
        "Synchronise environment changes on all your computers with a simple command. All packages, zsh plugins and your scripts",
        "Get the full source - you can place these in a git repo and edit to suit your needs.",
        "VSCode configuration which has many improvements and common extensions to make your life easier",
        "Own the scripts forever - you get the source and I keep the scripts updated and you can get the latest versions for as long as I update them!",
    ];
    const codeHref = `docs/dev-shell/reference/dev-shell-scripts/${btoa(
        "/README.md"
    )}`;
    return (
        <Container className="pt-20 text-left">
            <div className="flex">
                <div className="flex flex-col">
                    <div
                        style={{
                            background:
                                "linear-gradient(#d2a8ff, #a371f7 10%, #196c2e 70%, #2ea043 80%, #56d364)",
                        }}
                        className="mr-4 h-full w-[2px] lg:mr-12"
                    >
                        &nbsp;
                    </div>
                </div>
                <div>
                    <div id="hero">
                        <div className="md:flex">
                            <div className="mr-8">
                                <h1 className="leading-snug mx-auto max-w-2xl font-display text-6xl font-medium tracking-tight text-white md:mx-0">
                                    DevShell Terminal for Mac and Windows WSL
                                </h1>
                                <p className="mx-auto mt-6 max-w-2xl text-left text-lg tracking-tight text-gray-400 md:mx-0">
                                    Save 30+ hours configuring your development
                                    environment. Designed to give you the same
                                    shell experience on Mac and Windows.
                                </p>
                            </div>
                            <div className="intro-image-rotation md:relative w-1/2 md:w-full mt-20 mb-32 md:mt-0 md:mb-0">
                                <div>
                                    <Image
                                        priority
                                        alt="admin image"
                                        src={exaImage}
                                        className="intro-image absolute md:-translate-y-16 md:translate-x-14 -translate-y-4 translate-x-2"
                                    />
                                    <Image
                                        priority
                                        alt="product image"
                                        src={diffImage}
                                        className="intro-image absolute md:-translate-x-7 translate-x-7"
                                    />
                                    <Image
                                        priority
                                        alt="code image"
                                        src={batImage}
                                        className="intro-image md:translate-x-8 md:translate-y-32 translate-y-8"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto mt-10 flex gap-x-6 md:mx-0">
                            <BuyNowButton
                                user={user}
                                productKey="dev-shell"
                                color="violet"
                            />

                            <StyledLink
                                href={codeHref}
                                color="violet"
                                className="rounded-lg  text-xl px-14 py-4 hover:shadow-lg"
                            >
                                View the code
                            </StyledLink>
                        </div>
                    </div>
                    <div className="mt-16" id="features">
                        <p className="mb-8 max-w-4xl text-left font-display text-4xl font-medium tracking-tight text-white">
                            What is DevShell?
                        </p>
                        <p className="mt-4 text-left font-display text-lg tracking-tight text-gray-200">
                            DevShell is a collection of well-tested scripts for
                            setting up and synchronising your shell across all
                            of your computers. Have one source of truth for all
                            your aliases, functions, preferred packages and any
                            other configuration.
                        </p>
                        <p className="mt-4 text-left font-display text-lg tracking-tight text-gray-200">
                            DevShell also includes all the latest and greatest
                            terminal tooling to help a productive developer. The
                            windows tools are already aliased to the mac
                            commands so you can use the same commands on both
                            platforms.
                        </p>
                        <p className="mt-8 text-left font-display text-lg font-medium tracking-tight text-gray-200">
                            DevShell focuses on four main things:
                        </p>
                        <ul>
                            <li className="mt-4 ml-8 list-disc text-lg text-gray-200">
                                <strong>Fast setup.</strong> Save hours with
                                DevShell. Call one script that gathers required
                                parameters, detects the host OS and runs the
                                appropriate commands to setup your entire dev
                                env - set aliases, certs, clone repos, install
                                packages.
                            </li>
                            <li className="mt-4 ml-8 list-disc text-lg text-gray-200">
                                <strong>
                                    Champion modern tools for developers.
                                </strong>{" "}
                                DevShell installs improved modern tools and
                                aliases the commands for you. With DevShell you
                                get Git file status in your "ls" output. Have
                                syntax highlighted "cat" output. Get near
                                instant search with "fzf".
                            </li>
                            <li className="mt-4 ml-8 list-disc text-lg text-gray-200">
                                <strong>Mac and Windows Support.</strong> I
                                regularly swap between Mac and Windows machines
                                for development. DevShell ensures that the same
                                aliases, tools, fonts and configuration are
                                consistent on both platforms (where possible).
                            </li>
                            <li className="mt-4 ml-8 list-disc text-lg text-gray-200">
                                <strong>Open tooling.</strong> This is not a
                                SaaS product. When you purchase DevShell you get
                                the source code. You can modify it to your
                                heart's content. Customize your environment to
                                your specific needs.
                            </li>
                        </ul>
                    </div>
                    <div className="mt-16" id="">
                        <p className="max-w-4xl text-left font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                            What you get
                        </p>
                        <ul>
                            {features.map((feature, key) => (
                                <li
                                    key={key}
                                    className="mt-4 ml-8 list-disc text-lg text-gray-200"
                                >
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-8 text-left font-display text-lg tracking-tight text-gray-200 mb-8">
                            "But I'm a developer, I could build this myself" -
                            You absolutely could. If you want to learn shell
                            scripting, it's a great project to do that. But it
                            will take 10-20 hours at least to build up all the
                            tools and config here so you will be "paying
                            yourself" $3/hour or less. Check out{" "}
                            <a
                                className="hover:underline hover:cursor-pointer"
                                href="https://www.darraghoriordan.com/2022/01/28/developer-shell-modern-bat-fzf-antigen-zsh-wsl-mac/"
                            >
                                my blog post
                            </a>{" "}
                            with some tips for shell tools if you're keen to go
                            that route.
                        </p>
                        <div className="mx-auto mt-10 flex gap-x-6 md:mx-0">
                            <BuyNowButton
                                user={user}
                                productKey="dev-shell"
                                color="green"
                                text="Buy Now - $29"
                            />
                            <StyledLink
                                href={codeHref}
                                color="green"
                                className="rounded-lg text-xl px-14 py-4 hover:shadow-lg"
                            >
                                View the code
                            </StyledLink>
                        </div>
                    </div>
                    <div className="mt-16" id="">
                        <p className="max-w-4xl text-left font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                            Setup your full Dev Env in minutes
                        </p>
                        <p className="mt-4 text-left font-display text-lg tracking-tight text-gray-200 mb-8">
                            DevShell scripts will detect your OS and configure
                            your shell, install your favourite packages, set
                            aliases, configure system settings, install vscode
                            settings and extensions, clone your repos and more.
                        </p>
                        <iframe
                            width="710"
                            height="399"
                            src="https://www.youtube.com/embed/laX7U9bc7rw"
                            title="Developer Shell setup script demo on MacOS"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                        <TwitterCTA />
                    </div>
                </div>
            </div>
        </Container>
    );
}