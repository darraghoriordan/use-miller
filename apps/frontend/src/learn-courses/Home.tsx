import React, { useState, useEffect } from "react";
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

const Home = () => {
    const params = useParams();
    const location = useLocation();
    const projectKey = params["project"] || "unknown";
    const filePath = params["filePath"];

    const fileList = useGetFiles(projectKey);
    const projects = useGetAllCourses({
        apiBase: import.meta.env.VITE_API_BASE,
    });
    const [selectedFile, setSelectedFile] = useState(filePath || "");
    const codeFile = useGetFileContent(
        projectKey,
        selectedFile || "",
        selectedFile !== undefined
    );
    // set the first file on first load
    useEffect(() => {
        if (!selectedFile) {
            setSelectedFile(filePath || btoa("/README.md"));
        }
    }, [fileList.data, selectedFile, filePath]);

    const markdownFile = useGetMarkdownContent(
        projectKey,
        codeFile.data?.nearestReadmeLocation || "",
        codeFile.data?.nearestReadmeLocation !== undefined
    );

    useEffect(() => {
        if (selectedFile) {
            window.history.replaceState(
                null,
                `${projectKey} File`,
                `/open/code-doc/${projectKey}/${selectedFile}`
            );
        }
    }, [selectedFile]);

    const menuSections: MenuSection[] = [
        { name: "Get Started", items: [] },
        {
            name: "Projects",
            items:
                projects.data?.map((project) => {
                    return {
                        name: project.name,
                        path: `/open/code-doc/${project.key}`,
                        isCurrent:
                            location.pathname.includes(`/${project.key}/`) ||
                            location.pathname.endsWith(project.key),
                    } as MenuItem;
                }) || [],
        },
    ];
    if (!fileList.data && codeFile.data && markdownFile.data) {
        console.log("waiting...");
        return <div>Waiting...</div>;
    }
    return (
        <Container className="w-full  min-w-full mx-auto bg-neutral-900">
            <div className="flex items-stretch">
                <LeftMenu menuSections={menuSections} />

                <CodeExplorer
                    markdownFile={markdownFile}
                    codeFile={codeFile}
                    fileList={fileList}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                />
            </div>
        </Container>
    );
};

export default Home;
