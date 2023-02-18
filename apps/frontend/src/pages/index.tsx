import dynamic from "next/dynamic";
import Head from "next/head";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import Editor from "@monaco-editor/react";
import { getAccessToken, withPageAuthRequired } from "@auth0/nextjs-auth0";
import useGetFiles from "../components/course-files/useGetFiles";

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async (context) => {
        const token = getAccessToken(context.req!, context.res!);
        return {
            props: {
                accessToken: token,
            },
        };
    },
});

const Home = (props: { accessToken: string }) => {
    const FileTree = dynamic(() => import("../components/FileTree"), {
        ssr: false,
    });

    const { data, isError, isLoading } = useGetFiles(
        props.accessToken,
        "miller"
    );
    if (isError) {
        return <div>Error</div>;
    }
    if (isLoading) {
        return <div>Loading</div>;
    }

    const firstContents = "// Welcome to Miller!";

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
                <div className="ml-10 bg-white h-full flex">
                    <FileTree files={data} />
                    <Editor
                        theme="vs-dark"
                        height="90vh"
                        defaultLanguage="javascript"
                        defaultValue={firstContents}
                    />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Home;
