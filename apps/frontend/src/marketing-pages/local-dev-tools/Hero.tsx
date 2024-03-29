import StyledLink from "../../components/StyledLink";
import { Container } from "../../components/Container";
import giturlsImage from "./intro-media/giturls.png";
import jwt from "./intro-media/jwt.png";
import timestamps from "./intro-media/timestamps.png";
import Image from "next/image";
import { UserDto } from "@use-miller/shared-api-client";
import { CheckIcon } from "@heroicons/react/24/outline";
import { GithubLink } from "../index-home/SingleProductCard.jsx";
const version = "1.73.5";
const winArm64Download = `https://assets.darraghoriordan.com/localDevTools/gr-hosting/${version}/LocalDevTools-${version}-arm64.exe`;
const macArm64Download = `https://assets.darraghoriordan.com/localDevTools/gr-hosting/${version}/LocalDevTools-${version}-arm64.dmg`;
const macX64Download = `https://assets.darraghoriordan.com/localDevTools/gr-hosting/${version}/LocalDevTools-${version}-x64.dmg`;
const winX64Download = `https://assets.darraghoriordan.com/localDevTools/gr-hosting/${version}/LocalDevTools-${version}-x64.exe`;

export function Hero({ user }: { user: UserDto }) {
    const features = [
        "Offline encoding and decoding tools for base64, JWT and JSON",
        "An AI powered ESLint rule generator agent [Uses Open AI - Not local]",
        "Save $1000's with an AI powered Marketing tool for builders and busy engineers",
        "A color converter with 'nearest tailwind color' and harmonious colors feature",
        "Encoders and decoders for Html and CSS Unicode characters, uri components",
        "A git url parser and generator that is aware of your local ssh aliases",
        "A git repo summary tool to verify user name is consistent across ssh alias related repos",
        "A tool to quickly parse and map timestamps in different formats, local and UTC",
        "String tools - A case converter and an internationalisation aware string sorter. Simple, but better than most online tools",
    ];
    const topFeatures = [
        {
            name: "All your dev tools in one place",
            description:
                "Encoders, decoders, tailwind colors, git repository tools, time wrangling tools, string tools and more. All in one place.",
        },
        {
            name: "Powerful AI tools",
            description:
                "Bring your own Open AI API key and get powerful agents for ESLint generation and git repo aware work summaries for stand ups, reports or marketing.",
        },
        {
            name: "Universal license",
            description:
                "By a licence and use the tool on all your Mac and Windows machines.",
        },
    ];
    const codeHref = `/docs/local-dev-tools/get-started/quick-start`;
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
                                    Control your data with local dev utilities
                                </h1>
                                <p className="mx-auto mt-6 max-w-2xl text-left text-lg text-gray-400 md:mx-0">
                                    Offline utilities for developers, keep your
                                    business data safe and local.
                                </p>
                            </div>
                            <div className="intro-image-rotation md:relative w-1/2 md:w-full mt-20 mb-32 md:mt-0 md:mb-0">
                                <div>
                                    <Image
                                        priority
                                        alt="admin image"
                                        src={timestamps}
                                        className="intro-image absolute md:-translate-y-16 md:translate-x-14 -translate-y-4 translate-x-2"
                                    />
                                    <Image
                                        priority
                                        alt="product image"
                                        src={giturlsImage}
                                        className="intro-image absolute md:-translate-x-7 translate-x-7"
                                    />
                                    <Image
                                        priority
                                        alt="code image"
                                        src={jwt}
                                        className="intro-image md:translate-x-8 md:translate-y-32 translate-y-8"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto mt-20 flex gap-x-6 md:mx-0">
                            <GithubLink
                                githubUrl={
                                    "https://github.com/darraghoriordan/ssh-tool-new-electron"
                                }
                            />
                        </div>
                        <div className="mx-auto mt-32 flex gap-x-6 md:mx-0">
                            <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
                                {[
                                    ...topFeatures.map((tf) => (
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
                                    )),
                                    <div
                                        key={"open-source"}
                                        className="relative pl-9 "
                                    >
                                        <dt className="font-semibold text-white">
                                            <CheckIcon
                                                className="absolute left-0 top-1 h-5 w-5 text-green-500"
                                                aria-hidden="true"
                                            />
                                            {"Open source"}
                                        </dt>
                                        <dd className="mt-2  text-gray-400">
                                            Dev tools is open source and you can
                                            contribute on{" "}
                                            <a
                                                className="underline underline-offset-2"
                                                target="_blank"
                                                href="https://github.com/darraghoriordan/ssh-tool-new-electron"
                                            >
                                                GitHub
                                            </a>
                                        </dd>
                                    </div>,
                                ]}
                            </dl>
                            d
                        </div>
                        <div className="mx-auto mt-10 flex gap-x-6 md:mx-0">
                            <StyledLink
                                href={"#download"}
                                color="violet"
                                className="rounded-lg  text-xl px-14 py-4 hover:shadow-lg"
                            >
                                Try for free!
                            </StyledLink>
                            <StyledLink
                                href={codeHref}
                                color="violet"
                                className="rounded-lg  text-xl px-14 py-4 hover:shadow-lg border-white border"
                            >
                                Read the docs
                            </StyledLink>
                        </div>
                    </div>
                    <div className="mt-16" id="download">
                        <p className="mb-8 max-w-4xl text-left font-display text-4xl font-medium tracking-tight text-white">
                            What are Local Dev Tools?
                        </p>
                        <p className="mt-4 text-left font-display text-lg text-gray-200">
                            Local dev tools are a collection of safe, offline
                            utilities for developers. You can paste in your
                            company's or client's data safely in to tools for
                            tasks like JWT decoding, list sorting and uri
                            encoding.
                        </p>
                        <p className="mt-4 text-left font-display text-lg text-gray-200">
                            The tools work offline so you can use your business
                            data with confidence rather than using random
                            websites. The tools work on both Mac and Windows.
                        </p>
                        <p className="mt-4 text-left font-display text-lg text-gray-200">
                            Any online tools use your API keys (e.g.
                            OpenAI/ChatGPT) and never transmit data to a
                            UseMiller server.
                        </p>
                    </div>
                    <div className="mt-16">
                        <p className="mb-8 max-w-4xl text-left font-display text-4xl font-medium tracking-tight text-white">
                            Download Local Dev Tools (v{version})
                        </p>
                        <p className="mt-4 text-left font-display text-lg text-gray-200">
                            Download for free Trial. Buy a license later if you
                            find it useful. Source available{" "}
                            <a
                                className="hover:underline"
                                href="https://github.com/darraghoriordan/ssh-tool-new-electron"
                            >
                                on Github
                            </a>
                            .
                        </p>
                        <div className="md:flex md:gap-x-8 mt-8 justify-stretch">
                            <div className="border rounded-lg p-8 mb-8 md:mb-0">
                                <h3 className="mb-8 leading-snug mx-auto max-w-2xl font-display text-2xl font-medium tracking-tight text-white md:mx-0">
                                    Mac
                                </h3>
                                <p className="mt-4 text-left font-display text-lg tracking-tight text-gray-200">
                                    Apple Silicon (Arm 64) -{" "}
                                    <a
                                        href={macArm64Download}
                                        className="underline underline-offset-2 font-semibold"
                                    >
                                        Download Now
                                    </a>
                                </p>
                                <p className="mt-4 text-left font-display text-lg tracking-tight text-gray-200">
                                    Intel x64 Mac -{" "}
                                    <a
                                        href={macX64Download}
                                        className="underline underline-offset-2 font-semibold"
                                    >
                                        Download Now
                                    </a>
                                </p>
                            </div>
                            <div className="border rounded-lg p-8">
                                <h3 className="mb-8 leading-snug mx-auto max-w-2xl font-display text-2xl font-medium tracking-tight text-white md:mx-0">
                                    Windows
                                </h3>
                                <p className="mt-4 text-left font-display text-lg tracking-tight text-gray-200">
                                    Intel x64 -{" "}
                                    <a
                                        href={winX64Download}
                                        className="underline underline-offset-2 font-semibold"
                                    >
                                        Download Now
                                    </a>
                                </p>
                                <p className="mt-4 text-left font-display text-lg tracking-tight text-gray-200">
                                    Arm 64 -{" "}
                                    <a
                                        href={winArm64Download}
                                        className="underline underline-offset-2 font-semibold"
                                    >
                                        Download Now
                                    </a>
                                </p>
                            </div>
                        </div>
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
                                href="/local-dev-tools/#pricing"
                                color="green"
                                className="rounded-lg  text-xl px-14 py-4 hover:shadow-lg"
                            >
                                Buy once, use forever.
                            </StyledLink>
                            <StyledLink
                                href={codeHref}
                                color="green"
                                className="rounded-lg text-xl px-14 py-4 hover:shadow-lg border-white border"
                            >
                                View the docs
                            </StyledLink>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
