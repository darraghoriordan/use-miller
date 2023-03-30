import StyledLink from "../../components/StyledLink";
import { Container } from "../../components/Container";
import batImage from "./intro-media/bat.png";
import diffImage from "./intro-media/diff.png";
import exaImage from "./intro-media/exa.png";
import Image from "next/image";
import { UserDto } from "@use-miller/shared-api-client";
import { TwitterCTA } from "../components/TwitterCTA.jsx";
import { CheckIcon } from "@heroicons/react/24/outline";

export function Hero({ user }: { user: UserDto }) {
    const features = [
        "Well tested, re-runnable shell scripts that install everything a developer needs",
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
    const topFeatures = [
        {
            name: "All your packages installed",
            description:
                "All your tools installed via homebrew (Mac) or Apt (Windows WSL). Antigen is pre-configured to manage your zsh plugins.",
        },
        {
            name: "Vscode pre-configured",
            description:
                "Installs vscode, configures sensible settings and installs common extensions (eslint, prettier, tailwind, spell checker, xml and more)",
        },
        {
            name: "Global developer config",
            description:
                "Sensible global git ignores, git config, git aliases, npmrc, zsh aliases and more. Auto-detect flutter, dotnet, miniconda and add to PATH, and more",
        },
        {
            name: "Consistency for Mac and Windows",
            description:
                "Installs zsh to WSL, adds beautiful tools and fonts to match the Mac experience. Aliases commands to match Mac",
        },
        {
            name: "Annoying new Mac setup - gone",
            description:
                "All text files on mac associated with VSCode, 'smart quotes' disabled, DS_Store files disabled where possible and more",
        },

        {
            name: "Full control for you",
            description:
                "Get access to the source code in GitHub so you can edit to suit your needs. Delete parts you don't need and add what you use.",
        },
    ];
    const codeHref = `docs/dev-shell/reference/dev-shell-scripts/${btoa(
        "/README.md"
    )}`;
    const docsHref = `/docs/dev-shell/get-started/quick-start`;
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
                        <div className="md:flex" id="features">
                            <div className="mr-8">
                                <h1 className="leading-snug mx-auto max-w-2xl font-display text-6xl font-medium tracking-tight text-white md:mx-0">
                                    Your full dev environment configured with
                                    one command
                                </h1>
                                <p className="mx-auto mt-6 max-w-2xl text-left text-lg tracking-tight text-gray-400 md:mx-0">
                                    Save 30+ hours configuring your development
                                    environment. Specifically designed to give
                                    you the same shell experience on Mac and
                                    Windows.
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
                        <div className="mx-auto mt-24 flex gap-x-6 md:mx-0">
                            <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
                                {topFeatures.map((tf) => (
                                    <div
                                        key={tf.name}
                                        className="relative pl-9 "
                                    >
                                        <dt className="font-semibold text-white">
                                            <CheckIcon
                                                className="absolute left-0 top-1 h-5 w-5 text-green-500"
                                                aria-hidden="true"
                                            />
                                            {tf.name}
                                        </dt>
                                        <dd className="mt-2  text-gray-400">
                                            {tf.description}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                        <div className="mx-auto mt-10 flex gap-x-6 md:mx-0">
                            <StyledLink
                                href={"#pricing"}
                                color="violet"
                                className="rounded-lg  text-xl px-14 py-4 hover:shadow-lg"
                            >
                                Pricing
                            </StyledLink>
                            <StyledLink
                                href={docsHref}
                                color="violet"
                                className="rounded-lg text-xl px-14 py-4 hover:shadow-lg"
                            >
                                Read the docs
                            </StyledLink>
                            <StyledLink
                                href={codeHref}
                                color="violet"
                                className="rounded-lg  text-xl px-14 py-4 hover:shadow-lg border border-white"
                            >
                                Preview the code
                            </StyledLink>
                        </div>
                    </div>
                    <div className="mt-16" id="">
                        <p className="max-w-4xl text-left font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                            Setup your full Dev Env in minutes
                        </p>
                        <p className="mt-4 text-left font-display text-lg  text-gray-200 mb-8">
                            DevShell scripts will detect your OS and configure
                            your shell, install your favourite packages, set
                            aliases, configure system settings, install vscode
                            settings and extensions, clone your repos and more.
                        </p>
                        <p className="mt-4 text-left font-display text-lg  text-gray-200 mb-8">
                            Preview what this experience looks like on YouTube:
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
                    </div>
                    <div className="mt-16">
                        <p className="mb-8 max-w-4xl text-left font-display text-4xl font-medium tracking-tight text-white">
                            What is DevShell?
                        </p>
                        <p className="mt-4 text-left font-display text-lg  text-gray-200">
                            DevShell is a collection of well-tested scripts for
                            setting up and synchronising your shell across all
                            of your computers.{" "}
                        </p>
                        <p className="mt-4 text-left font-display text-lg text-gray-200">
                            Have one source of truth for all your Macs and PCs -
                            consistent aliases, functions, preferred packages
                            and any other configuration.
                        </p>
                        <p className="mt-4 text-left font-display text-lg text-gray-200">
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
                                heart's content. Every dev will customize their
                                own environment to specific needs.
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

                        <div className="mx-auto mt-10 flex gap-x-6 md:mx-0">
                            <StyledLink
                                href={"#pricing"}
                                color="green"
                                className="rounded-lg text-xl px-14 py-4 hover:shadow-lg"
                            >
                                Pricing
                            </StyledLink>
                            <StyledLink
                                href={docsHref}
                                color="green"
                                className="rounded-lg text-xl px-14 py-4 hover:shadow-lg"
                            >
                                Read the docs
                            </StyledLink>
                            <StyledLink
                                href={codeHref}
                                color="green"
                                className="rounded-lg text-xl px-14 py-4 hover:shadow-lg border border-white"
                            >
                                Preview the code
                            </StyledLink>
                        </div>
                    </div>
                    <div className="mt-16" id="">
                        <p className="mt-8 text-left font-display text-2xl text-gray-200 mb-8">
                            " But I'm a developer, I could build this myself!? "
                        </p>
                        <p className="mt-8 text-left font-display text-lg text-gray-200 mb-8">
                            You absolutely could! It's a great project to learn
                            shell scripting if you'd like to do that. Check out{" "}
                            <a
                                className="hover:cursor-pointer underline"
                                href="https://www.darraghoriordan.com/2022/01/28/developer-shell-modern-bat-fzf-antigen-zsh-wsl-mac/"
                            >
                                my blog post
                            </a>{" "}
                            with some tips for shell tools if you're keen to
                            learn yourself.
                        </p>
                        <p className="mt-8 text-left font-display text-lg text-gray-200 mb-8">
                            It will take 10-20 hours, at least, to build up all
                            the tools and config here so that's ~$3/hour. If you
                            just want to save time... DevShell is for you!
                        </p>
                        <TwitterCTA />
                    </div>
                </div>
            </div>
        </Container>
    );
}
