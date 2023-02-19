import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { NodeData } from "react-folder-tree";
import { Container } from "../layout/Container";
import HeaderContext from "../layout/HeaderContext";
import useGetFiles from "./course-files/useGetFiles";
import EditorWrapper from "./EditorWrapper";
import FileTree from "./FileTree";

const Home = () => {
    const { setContext } = useContext(HeaderContext);

    useEffect(() => {
        setContext({ title: "Miller / Learn" });
    }, []);

    const { data, isError, isLoading } = useGetFiles("miller");

    const [selectedItemPath, setSelectedItemPath] = useState<
        string | undefined
    >(undefined);
    useEffect(() => {
        const firstFile = data?.children?.find(
            (file) => file.type === "file" && file.name === "README.md"
        );
        if (!selectedItemPath && firstFile) {
            setSelectedItemPath(firstFile.fileLocation);
        }
    }, [data]);

    if (isError) {
        return <div>Error...</div>;
    }
    if (isLoading) {
        return <div>Loading</div>;
    }

    const handleClick = (opts: {
        defaultOnClick: () => void;
        nodeData: NodeData;
    }) => {
        if (opts.nodeData.type === "file") {
            setSelectedItemPath(opts.nodeData.fileLocation);
        }
        if (opts.nodeData.type === "folder") {
            opts.nodeData.isOpen = !opts.nodeData.isOpen;
        }
    };

    return (
        <Container className="min-w-full bg-dark-shade">
            <div className="flex w-full h-full">
                <div className="w-1/6">
                    <FileTree files={data} handleClick={handleClick} />
                </div>
                <div className="w-3/6">
                    <EditorWrapper filePath={selectedItemPath} />
                </div>
                <div className="w-2/6">
                    An `.npmrc` file is a configuration file used by the Node
                    Package Manager (npm) to set various options and preferences
                    for managing packages. If an `.npmrc` file contains the line
                    `v18.13.0`, it likely means that it is specifying the
                    version of Node.js that should be used when installing or
                    working with packages managed by npm. Specifically,
                    `v18.13.0` refers to version 18.13.0 of Node.js, which was
                    released in January 2022. By setting the Node.js version in
                    the `.npmrc` file, you can ensure that the packages you
                    install are compatible with that version of Node.js. This
                    can be important because different versions of Node.js may
                    have slightly different APIs and behaviors, which could
                    impact the functionality of certain packages.
                </div>
            </div>
        </Container>
    );
};

export default Home;
