/// <reference types="react" />
import { FileMetaDto, FileStructureDto } from "@use-miller/shared-api-client";
import { NodeData } from "@darraghor/react-folder-tree";
export default function CodeExplorer({ markdownFile, codeFile, fileList, handleFileClick, }: {
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
}): JSX.Element;
