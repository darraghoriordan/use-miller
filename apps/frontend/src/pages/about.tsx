import { Container } from "../components/Container.jsx";
import Layout from "../components/Layout.jsx";
import portraitImage from "../images/profile-pic.jpg";
import Image from "next/image";

export default function Home() {
    return (
        <Layout
            seoDescription="Miller dev tools save you time so you can focus on building your product and helping your customers."
            seoTitle={`Dev tools to save you time`}
            headerTitle="Miller Dev Tools"
            themeColor="violet"
        >
            <Container>
                <article className="prose prose-lg prose-invert mx-auto">
                    <h1>About Miller</h1>
                    <p className="text-3xl py-8">
                        Hi! Thanks for checking out the Miller products.{" "}
                    </p>
                    <div className="md:flex gap-x-8">
                        <div className="">
                            <p>
                                I'm Darragh ORiordan, I make all the tools that
                                are available here. I'm a software engineer and
                                people leader. I currently live in sunny Sydney,
                                Australia.
                            </p>
                            <p>
                                I have decades of experience building things on
                                the web. I've worked with large complex teams,
                                and teams of one.
                            </p>
                        </div>

                        <Image
                            src={portraitImage}
                            alt="portrait image of darragh oriordan"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="aspect-w-8 aspect-h-8 rounded-lg bg-zinc-100 object-cover dark:bg-zinc-800 md:w-1/3"
                        />
                    </div>

                    <p>
                        I've been trusted to deliver products for companies like
                        <ul>
                            <li>Blackberry (Mobile phones)</li>
                            <li>
                                Trade Me Ltd (Online Auctions and e-commerce)
                            </li>
                            <li>Cin7 (Inventory Management Software)</li>
                            <li>IAG (Insurance)</li>
                            <li>X15 Ventures (FinTech)</li>
                        </ul>
                        and many more in industries like Pharmaceutical
                        Automation, HR Software, Sport analytics, Credit card
                        activation, Medical records processing and Internet of
                        Things.
                    </p>
                    <p>
                        I've spent the last 10 years building and running teams.
                        I love to help people grow and learn as engineers and
                        help people have fulfilling careers.
                    </p>
                    <p>
                        You can read more about me on my main website{" "}
                        <a href="https://www.darraghoriordan.com/about/">
                            https://www.darraghoriordan.com/about/
                        </a>
                        .
                    </p>
                    <p>
                        You can always reach me on{" "}
                        <a href="https://twitter.com/darraghor">Twitter</a> or{" "}
                        <a href="https://www.linkedin.com/in/darraghoriordan/">
                            LinkedIn
                        </a>
                        . My email address is darragh.oriordan (AT) gmail.{" "}
                    </p>
                    <p>
                        I live in Sydney, Australia so my timezone is Australian
                        Eastern Standard Time (AEST). There is some cross over
                        with West-coast USA but not much wih East-coast US and
                        Europe.
                    </p>
                    <p>
                        I have customers from all over the world and I do aim to
                        respond to you within 24 hours.
                    </p>
                </article>
            </Container>
        </Layout>
    );
}
