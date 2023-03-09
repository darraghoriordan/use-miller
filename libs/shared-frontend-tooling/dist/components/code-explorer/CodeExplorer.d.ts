/// <reference types="react" />
import { FileMetaDto, FileStructureDto } from "@use-miller/shared-api-client";
import { NodeData } from "@darraghor/react-folder-tree";
export declare function CodeExplorer({ markdownFile, codeFile, fileList, handleFileClick, }: {
    handleFileClick: (opts: {
        defaultOnClick: () => void;
        nodeData: NodeData;
        openMe: () => void;
        closeMe: () => void;
    }) => void;
    fileList: {
        data: FileStructureDto;
        isLoading: boolean;
        isError: boolean;
        error: Error;
    };
    codeFile: {
        data: FileMetaDto;
        isLoading: boolean;
        isError: boolean;
        error: Error;
    };
    markdownFile: {
        data: FileMetaDto;
        isLoading: boolean;
        isError: boolean;
        error: Error;
    };
}): JSX.Element;
