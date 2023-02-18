import { useLayoutEffect, useState } from "react";
import FolderTree, { NodeData } from "react-folder-tree";
import { FileIcon, defaultStyles } from "react-file-icon";
import { FileStructureDto } from "@use-miller/shared-api-client";

const FileTree = (props: { files: FileStructureDto }) => {
    let [data, setData] = useState(props.files);

    const handleClick = (opts: {
        defaultOnClick: () => void;
        nodeData: NodeData;
    }) => {
        console.log(opts.nodeData);
    };

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

    useLayoutEffect(() => {
        try {
            let savedData = localStorage.getItem("folderTree");
            if (savedData) {
                let savedStructure = JSON.parse(savedData);
                setData(savedStructure);
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <FolderTree
            showCheckbox={false}
            data={data}
            onNameClick={handleClick}
            initOpenStatus={"custom"}
            readOnly
            iconComponents={{
                FileIcon: CustomFileIcon,
            }}
        />
    );
};

export default FileTree;
