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
import useGetAllCourses from "./api/useGetAllCourses.js";
import MarkdownWrapper from "./MarkdownWrapper.js";
import useGetFileContent from "./api/useGetFileContent.js";
import clsx from "clsx";
import { colorVariants } from "@use-miller/shared-frontend-tooling";

type SelectedItem = {
    path: string;
};
const Home = () => {
    const params = useParams();
    const location = useLocation();
    const projectKey = params["project"] || "unknown";
    const filePath = params["filePath"];

    const { data, isError, isLoading } = useGetFiles(projectKey);
    const projects = useGetAllCourses();

    const [selectedItem, setSelectedItemPath] = useState<
        SelectedItem | undefined
    >(filePath ? { path: filePath } : undefined);
    const {
        data: fileData,
        isError: fileIsError,
        isLoading: fileIsLoading,
    } = useGetFileContent(
        projectKey,
        selectedItem?.path || "",
        selectedItem?.path !== undefined
    );
    // set the first file on first load
    useEffect(() => {
        if (!selectedItem) {
            setSelectedItemPath({
                path: btoa("README.md"),
            });
        }
    }, [data]);

    if (isError) {
        return <Error message={"Error finding the project file list"} />;
    }
    if (isLoading || !projects.data) {
        return <Loading message="Loading project files..." />;
    }

    const handleClick = (opts: {
        defaultOnClick: () => void;
        openMe: () => void;
        closeMe: () => void;
        nodeData: NodeData;
    }) => {
        if (opts.nodeData.type === "file") {
            window.history.replaceState(
                null,
                `${projectKey} File`,
                `/open/code-doc/${projectKey}/${fileData?.fileLocation}`
            );

            setSelectedItemPath({
                path: opts.nodeData.fileLocation,
            });
        }
        if (opts.nodeData.type === "folder") {
            opts.defaultOnClick();

            opts.nodeData.isOpen ? opts.closeMe() : opts.openMe();
        }
    };

    return (
        <>
            <Container className="w-full h-full min-w-full mx-auto bg-white pl-2">
                <PanelGroup direction="horizontal">
                    <Panel defaultSize={15} minSize={5} className="pt-[1em]">
                        <h1
                            className={clsx(
                                `mb-8 font-bold uppercase`,
                                colorVariants["green"].foreground
                            )}
                        >
                            Docs
                        </h1>
                        <h3 className="mt-6 mb-2 font-bold uppercase text-slate-900">
                            Get Started
                        </h3>
                        <h3 className="mb-2 font-bold uppercase text-slate-900">
                            Code Reference
                        </h3>
                        <ul className="mr-4">
                            {projects.data.map((project) => {
                                if (location.pathname.endsWith(project.key)) {
                                    return (
                                        <li
                                            key={project.key}
                                            className={clsx(
                                                "px-2 py-1 mb-2 ml-1 text-sm rounded-md whitespace-nowrap",
                                                colorVariants["green"]
                                                    .backgroundShade
                                            )}
                                        >
                                            <p
                                                className={clsx(
                                                    colorVariants["green"]
                                                        .foreground
                                                )}
                                            >
                                                {project.name}
                                            </p>
                                        </li>
                                    );
                                }

                                return (
                                    <li
                                        key={project.key}
                                        className="px-2 mb-2 ml-1 text-sm  whitespace-nowrap"
                                    >
                                        <a
                                            href={`/open/code-doc/${project.key}`}
                                            className="cursor-pointer"
                                        >
                                            {project.name}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </Panel>
                    <ResizeHandle className="bg-dark-shade" />
                    <Panel defaultSize={15} minSize={5}>
                        <FileTree files={data} handleClick={handleClick} />
                    </Panel>
                    <ResizeHandle className="bg-dark-shade" />
                    <Panel minSize={40}>
                        <EditorWrapper
                            data={fileData}
                            isLoading={fileIsLoading}
                            isError={fileIsError}
                        />
                    </Panel>
                    <ResizeHandle className="bg-dark-shade" />
                    <Panel defaultSize={30} minSize={20}>
                        <MarkdownWrapper
                            filePath={fileData?.nearestReadmeLocation}
                            courseKey={projectKey}
                            enabled={
                                fileData?.nearestReadmeLocation !== undefined
                            }
                        ></MarkdownWrapper>
                    </Panel>
                </PanelGroup>
            </Container>
        </>
    );
};

export default Home;
