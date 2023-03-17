/// <reference types="react" />
import { FileStructureDto } from "@use-miller/shared-api-client";
export type TreeLikeNode = {
    id: string;
    title: string;
    type: string;
    isOpen?: boolean;
    fileLocation: string;
    children?: TreeLikeNode[];
};
declare const FileTree: (props: {
    files: FileStructureDto;
    selectedFile: string;
    projectKey: string;
    setSelectedFile: (file: string, projectKey: string) => void;
}) => JSX.Element;
export default FileTree;
