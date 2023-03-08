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
import useGetMarkdownContent from "./api/useGetMarkdownContent.js";
import {
    LeftMenu,
    MenuItem,
    MenuSection,
} from "@use-miller/shared-frontend-tooling";

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

    const markdownFile = useGetMarkdownContent(
        projectKey,
        fileData?.nearestReadmeLocation || "",
        fileData?.nearestReadmeLocation !== undefined
    );
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
    const menuSections: MenuSection[] = [
        { name: "Get Started", items: [] },
        {
            name: "Projects",
            items: projects.data.map((project) => {
                return {
                    name: project.name,
                    path: `/open/code-doc/${project.key}`,
                    isCurrent: location.pathname.includes(project.key),
                } as MenuItem;
            }),
        },
    ];

    return (
        <>
            <Container className="w-full h-full min-w-full pl-2 mx-auto bg-neutral-900">
                <PanelGroup direction="horizontal">
                    <Panel defaultSize={15} minSize={5}>
                        <LeftMenu menuSections={menuSections} />
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
                            data={markdownFile.data?.contents}
                            isLoading={markdownFile.isLoading}
                            isError={markdownFile.isError}
                            error={markdownFile.error}
                        ></MarkdownWrapper>
                    </Panel>
                </PanelGroup>
            </Container>
        </>
    );
};

export default Home;
