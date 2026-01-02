import EditorWrapper from "./EditorWrapper";
import FileTree from "./FileTree";
import { Group, Panel } from "react-resizable-panels";
import ResizeHandle from "./ResizeHandle";
import MarkdownWrapper from "./MarkdownWrapper";
import type { components } from "../../../shared/types/api-specs";

type FileMetaDto = components["schemas"]["FileMetaDto"];
type FileStructureDto = components["schemas"]["FileStructureDto"];

export default function CodeExplorer({
    markdownFile,
    codeFile,
    fileList,
    selectedFile,
    setSelectedFile,
    projectKey,
}: {
    selectedFile: string;
    setSelectedFile: (file: string, projectKey: string) => void;
    fileList: {
        data?: FileStructureDto;
        isLoading: boolean;
        isError: boolean;
        error: unknown;
    };
    codeFile: {
        data?: FileMetaDto;
        isLoading: boolean;
        isError: boolean;
        error: unknown;
    };
    markdownFile: {
        data?: FileMetaDto;
        isLoading: boolean;
        isError: boolean;
        error: unknown;
    };
    projectKey: string;
}) {
    return (
        <Group orientation="horizontal" className="overflow-scroll">
            <Panel defaultSize={20} minSize={5} style={{ display: "flex" }}>
                {fileList.data && (
                    <FileTree
                        files={fileList.data}
                        selectedFile={selectedFile}
                        projectKey={projectKey}
                        setSelectedFile={(fileName: string) => {
                            setSelectedFile(fileName, projectKey);
                        }}
                    />
                )}
            </Panel>
            <ResizeHandle className="bg-dark-shade" />
            <Panel
                defaultSize={40}
                minSize={40}
                style={{
                    display: "flex",
                    //alignItems: "stretch",
                    flexDirection: "column",
                }}
            >
                <EditorWrapper
                    data={codeFile.data}
                    isLoading={codeFile.isLoading}
                    isError={codeFile.isError}
                />
            </Panel>
            <ResizeHandle className="bg-dark-shade" />
            <Panel
                defaultSize={40}
                minSize={20}
                style={{ display: "flex", flexDirection: "column" }}
            >
                <MarkdownWrapper
                    data={markdownFile.data?.contents}
                    isLoading={markdownFile.isLoading}
                    isError={markdownFile.isError}
                    error={markdownFile.error}
                ></MarkdownWrapper>
            </Panel>
        </Group>
    );
}
