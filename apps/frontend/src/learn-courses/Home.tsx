import { useState } from "react";
import { useEffect } from "react";
import { NodeData } from "@darraghor/react-folder-tree";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { Container } from "../layout/Container";
import useGetFiles from "./api/useGetFiles";
import EditorWrapper from "./EditorWrapper";
import FileTree from "./FileTree";
import { useParams, useLocation } from "react-router";
import { PanelGroup, Panel } from "react-resizable-panels";
import ResizeHandle from "./ResizeHandle";
import { StyledLink } from "@use-miller/shared-frontend-tooling";
import StyledHeader1 from "../components/StyledHeader1";

const Home = () => {
    const params = useParams();
    const location = useLocation();

    const { data, isError, isLoading } = useGetFiles(
        params["project"] || "miller"
    );

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
        return <Error message={"Error finding the project file list"} />;
    }
    if (isLoading) {
        return <Loading message="Loading project files..." />;
    }

    const handleClick = (opts: {
        defaultOnClick: () => void;
        openMe: () => void;
        closeMe: () => void;
        nodeData: NodeData;
    }) => {
        if (opts.nodeData.type === "file") {
            setSelectedItemPath(opts.nodeData.fileLocation);
        }
        if (opts.nodeData.type === "folder") {
            opts.defaultOnClick();
            console.log("clicked folder");
            opts.nodeData.isOpen ? opts.closeMe() : opts.openMe();
        }
    };

    return (
        <Container className="h-full min-w-full px-2 pt-2 mx-auto border-t border-black bg-dark-shade sm:px-2 lg:px-2">
            <StyledHeader1>
                {projects.find((p) => p.slug === params["project"])?.name}{" "}
                Reference Documentation
            </StyledHeader1>
            <div className="flex items-center py-8 text-white bg-dark-mid gap-x-4">
                <h2>Switch projects </h2>
                {projects
                    .filter((p) => !location.pathname.endsWith(p.slug))
                    .map((project) => (
                        <StyledLink
                            key={project.slug}
                            href={`/open/code-doc/${project.slug}`}
                            color={project.color as any}
                        >
                            {project.name}
                        </StyledLink>
                    ))}
            </div>
            <PanelGroup direction="horizontal">
                <Panel defaultSize={20} minSize={5}>
                    <FileTree files={data} handleClick={handleClick} />
                </Panel>
                <ResizeHandle />
                <Panel minSize={30}>
                    <EditorWrapper filePath={selectedItemPath} />
                </Panel>
                <ResizeHandle />
                <Panel defaultSize={20} minSize={20}>
                    <div className="">
                        An `.npmrc` file is a configuration file used by the
                        Node Package Manager (npm) to set various options and
                        preferences for managing packages. If an `.npmrc` file
                        contains the line `v18.13.0`, it likely means that it is
                        specifying the version of Node.js that should be used
                        when installing or working with packages managed by npm.
                        Specifically, `v18.13.0` refers to version 18.13.0 of
                        Node.js, which was released in January 2022. By setting
                        the Node.js version in the `.npmrc` file, you can ensure
                        that the packages you install are compatible with that
                        version of Node.js. This can be important because
                        different versions of Node.js may have slightly
                        different APIs and behaviors, which could impact the
                        functionality of certain packages.
                    </div>
                </Panel>
            </PanelGroup>
        </Container>
    );
};

export default Home;
