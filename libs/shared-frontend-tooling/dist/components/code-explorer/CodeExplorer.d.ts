/// <reference types="react" />
import { FileMetaDto, FileStructureDto } from "@use-miller/shared-api-client";
export default function CodeExplorer({ markdownFile, codeFile, fileList, selectedFile, setSelectedFile, projectKey, }: {
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
}): JSX.Element;
