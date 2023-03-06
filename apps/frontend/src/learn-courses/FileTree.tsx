import { useLayoutEffect, useState } from "react";
import FolderTree, { NodeData } from "@darraghor/react-folder-tree";
import { FileIcon, defaultStyles } from "react-file-icon";
import { FileStructureDto } from "@use-miller/shared-api-client";

const FileTree = (props: {
    files: FileStructureDto;
    handleClick: (opts: {
        defaultOnClick: () => void;
        nodeData: NodeData;
        openMe: () => void;
        closeMe: () => void;
    }) => void;
}) => {
    let [data, setData] = useState(props.files);

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
        <div className="h-full bg-dark-mid">
            {/* // css here is in the css file because // the classes are specific
            to the folder tree library */}
            <FolderTree
                showCheckbox={false}
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
