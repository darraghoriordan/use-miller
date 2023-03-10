import React, { useState, useEffect } from "react";
import { NodeData } from "@darraghor/react-folder-tree";
import { Container } from "../layout/Container";
import useGetFiles from "./api/useGetFiles";
import { useParams, useLocation } from "react-router";
import useGetFileContent from "./api/useGetFileContent.js";
import useGetMarkdownContent from "./api/useGetMarkdownContent.js";
import {
    CodeExplorer,
    LeftMenu,
    MenuItem,
    MenuSection,
    useGetAllCourses,
} from "@use-miller/shared-frontend-tooling";
import FileTree from "./FileTree.js";

type SelectedItem = {
    path: string;
};
const Home = () => {
    const params = useParams();
    const location = useLocation();
    const projectKey = params["project"] || "unknown";
    const filePath = params["filePath"];

    const fileList = useGetFiles(projectKey);
    const projects = useGetAllCourses({
        apiBase: import.meta.env.VITE_API_BASE,
    });

    const [selectedItem, setSelectedItemPath] = useState<
        SelectedItem | undefined
    >(filePath ? { path: filePath } : undefined);

    const codeFile = useGetFileContent(
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
    }, [fileList.data]);

    const markdownFile = useGetMarkdownContent(
        projectKey,
        codeFile.data?.nearestReadmeLocation || "",
        codeFile.data?.nearestReadmeLocation !== undefined
    );

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
                `/open/code-doc/${projectKey}/${codeFile.data?.fileLocation}`
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
            items:
                projects.data?.map((project) => {
                    return {
                        name: project.name,
                        path: `/open/code-doc/${project.key}`,
                        isCurrent: location.pathname.includes(project.key),
                    } as MenuItem;
                }) || [],
        },
    ];
    const treeState = {
        name: "root [half checked and opened]",
        isOpen: true, // this folder is opened, we can see it's children
        children: [
            { name: "children 1 [not checked]" },
            {
                name: "children 2 [half checked and not opened]",

                isOpen: false,
                children: [
                    { name: "children 2-1 [not checked]" },
                    { name: "children 2-2 [checked]" },
                ],
            },
        ],
    };

    return (
        <Container className="w-full h-full min-w-full mx-auto bg-neutral-900">
            <div className="flex items-stretch">
                <LeftMenu menuSections={menuSections} />
                <FileTree
                    files={{ data: treeState } as any}
                    handleClick={handleClick}
                />
                <CodeExplorer
                    markdownFile={markdownFile}
                    codeFile={codeFile}
                    fileList={fileList}
                    handleFileClick={handleClick}
                />
            </div>
        </Container>
    );
};

export default Home;
