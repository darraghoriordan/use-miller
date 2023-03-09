/// <reference types="react" />
import { NodeData } from "@darraghor/react-folder-tree";
import { FileStructureDto } from "@use-miller/shared-api-client";
declare const FileTree: (props: {
    files: FileStructureDto;
    isError: boolean;
    isLoading: boolean;
    handleClick: (opts: {
        defaultOnClick: () => void;
        nodeData: NodeData;
        openMe: () => void;
        closeMe: () => void;
    }) => void;
}) => JSX.Element;
export default FileTree;
