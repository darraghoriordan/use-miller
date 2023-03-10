import EditorWrapper from "./EditorWrapper.js";
import FileTree from "./FileTree.js";
import { PanelGroup, Panel } from "react-resizable-panels";
import ResizeHandle from "./ResizeHandle";
import MarkdownWrapper from "./MarkdownWrapper.js";
import { FileMetaDto, FileStructureDto } from "@use-miller/shared-api-client";
import { NodeData } from "@darraghor/react-folder-tree";

export default function CodeExplorer({
    markdownFile,
    codeFile,
    fileList,
    handleFileClick,
}: {
    handleFileClick: (opts: {
        defaultOnClick: () => void;
        nodeData: NodeData;
        openMe: () => void;
        closeMe: () => void;
    }) => void;
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
}) {
    return (
        <PanelGroup direction="horizontal">
            <Panel defaultSize={15} minSize={5}>
                <FileTree
                    files={fileList.data}
                    isError={fileList.isError}
                    isLoading={fileList.isLoading}
                    handleClick={handleFileClick}
                />
            </Panel>
            <ResizeHandle className="bg-dark-shade" />
            <Panel minSize={40}>
                <EditorWrapper
                    data={codeFile.data}
                    isLoading={codeFile.isLoading}
                    isError={codeFile.isError}
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
    );
}
