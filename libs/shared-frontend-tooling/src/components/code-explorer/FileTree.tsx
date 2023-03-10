import { useLayoutEffect, useState } from "react";
import FolderTree, { NodeData } from "@darraghor/react-folder-tree";
import { FileIcon, defaultStyles } from "react-file-icon";
import { FileStructureDto } from "@use-miller/shared-api-client";
import { Loading } from "../Loading.js";
import { Error } from "../Error.js";

const FileTree = (props: {
    files?: FileStructureDto;
    isError: boolean;
    isLoading: boolean;
    handleClick: (opts: {
        defaultOnClick: () => void;
        nodeData: NodeData;
        openMe: () => void;
        closeMe: () => void;
    }) => void;
}) => {
    let [data, setData] = useState(props.files);

    useLayoutEffect(() => {
        setData(props.files);
    }, [props.files]);

    const CustomFileIcon = ({
        onClick,
        nodeData,
    }: {
        onClick: () => void;
        nodeData: NodeData;
    }) => {
        if (!nodeData) return <FileIcon />;
        const { path, name, checked, isOpen, ...restData } = nodeData;

        const extension = name?.split(".").pop();
        if (extension !== undefined) {
            const defaultStyle =
                defaultStyles[extension as any as keyof typeof defaultStyles];
            if (defaultStyle !== undefined) {
                // custom Style
                return <FileIcon extension={extension} {...defaultStyle} />;
            }
        }

        return <FileIcon />;
    };

    if (props.isError) {
        return <Error message={"Error finding the project file list"} />;
    }
    if (props.isLoading || !data || !props.files) {
        return <Loading message="Loading project files..." />;
    }
    console.log("rendering file tree", data);

    return (
        <div className="h-full bg-dark-mid">
            {/* // css here must be overridden in the css file because // the classes are specific
            to the folder tree library */}
            <FolderTree
                data={data}
                onNameClick={props.handleClick as any}
                initOpenStatus={"custom"}
                readOnly
                iconComponents={{
                    FileIcon: CustomFileIcon,
                }}
            />
        </div>
    );
};

export default FileTree;
