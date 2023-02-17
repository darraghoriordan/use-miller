import dynamic from "next/dynamic";
import Head from "next/head";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { FileStructure, mapFiles } from "../fileMapper";
import util from "util";

export async function getServerSideProps() {
    const files = await mapFiles();
    console.log(
        "files",
        util.inspect(files, false, null, true /* enable colors */)
    );

    return {
        props: {
            files: files,
            // files: {
            //     name: "USE-MILLER-FAKE",
            //     type: "folder",
            //     isOpen: true,
            //     path: "/",
            //     children: [],
            // },
        }, // will be passed to the page component as props
    };
}

export default function Home({ files }: { files: FileStructure }) {
    const FileTree = dynamic(() => import("../components/FileTree"), {
        ssr: false,
    });

    return (
        <>
            <Head>
                <title>Miller - A product kit for makers</title>
                <meta
                    name="description"
                    content="Have an idea for a product? Skip straight to the good stuff - providing valuable features to your customers. Miller has all the technology sorted."
                />
            </Head>
            <Header />
            <main>
                <div className="ml-10 bg-white">
                    <FileTree files={files} />
                </div>
            </main>
            <Footer />
        </>
    );
}
