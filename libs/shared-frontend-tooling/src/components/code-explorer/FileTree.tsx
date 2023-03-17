import { useCallback, useEffect, useState } from "react";
import { FileStructureDto } from "@use-miller/shared-api-client";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { getIconForFile } from "vscode-material-icon-theme-js";
import Tree, {
    DefaultNodeProps,
    treeHandlers,
    useTreeState,
} from "react-hyper-tree";

const VS_MATERIAL_ICONS =
    "https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons";

export type TreeLikeNode = {
    id: string;
    title: string;
    type: string;
    isOpen?: boolean;
    fileLocation: string;
    children?: TreeLikeNode[];
};

function mapFileStructureToTreeNode(
    fileStructure: FileStructureDto
): TreeLikeNode {
    return {
        id: fileStructure.fileLocation,
        title: fileStructure.name,
        type: fileStructure.type,
        isOpen: fileStructure.isOpen,
        fileLocation: fileStructure.fileLocation,
        children: fileStructure.children
            ? fileStructure.children.map((x) => mapFileStructureToTreeNode(x))
            : [],
    };
}

const FileTree = (props: {
    files: FileStructureDto;
    selectedFile: string;
    projectKey: string;
    setSelectedFile: (file: string, projectKey: string) => void;
}) => {
    const { required, handlers } = useTreeState({
        id: "fileTree",
        data: mapFileStructureToTreeNode(props.files),
        childrenKey: "children",
        defaultOpened: false,
        multipleSelect: false,
    });
    const tree = treeHandlers.trees["fileTree"];

    useEffect(() => {
        const node = tree.instance.getNodeById(props.selectedFile);

        if (node) {
            tree.handlers.setOpen(node, true);

            tree.handlers.setSelected(node, true);

            // open all parents of the node
            let parent = node.getParent();

            while (parent) {
                parent.setOpened(true);

                parent = parent.getParent();
            }
        } else {
            console.debug("warning: file node not found in tree");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.selectedFile, props.projectKey, tree.instance.enhancedData]);

    const renderNode = useCallback(
        ({ node, onToggle, onSelect }: DefaultNodeProps) => {
            const nodeData = node.data as TreeLikeNode;
            return (
                <div
                    className="flex items-center text-white outline-none cursor-pointer select-none"
                    key={nodeData.id}
                    onClick={(evt) => {
                        onToggle(evt);
                        if (node.children?.length === 0) {
                            props.setSelectedFile(
                                nodeData.fileLocation,
                                props.projectKey
                            );
                        }
                        tree.handlers.setSelected(node, true);
                    }}
                >
                    <div>
                        {CustomFileIcon({
                            nodeProps: { node, onToggle, onSelect },
                        })}
                    </div>
                    <div className="ml-2 text-white">{nodeData.title}</div>
                </div>
            );
        },
        [props.projectKey, props.setSelectedFile]
    );

    const CustomFileIcon = ({ nodeProps }: { nodeProps: DefaultNodeProps }) => {
        const { node } = nodeProps;

        const { fileLocation, title, isOpen, children, ...restData } =
            node.data;

        // is it a folder?
        if (node.children && node.children.length > 0 && !node.isOpened()) {
            return <ChevronRightIcon className="w-3 h-3 text-white" />;
        }
        if (node.children && node.children.length > 0 && node.isOpened()) {
            return <ChevronDownIcon className="w-3 h-3 text-white" />;
        }

        // custom Style
        const iconPath = `${VS_MATERIAL_ICONS}/${getIconForFile(
            node.data.title
        )}
                `;
        return (
            <div className="w-3 h-3">
                <img src={iconPath} alt="" className="w-3 h-3" />
            </div>
        );
    };

    // if (props.isError) {
    //     return <Error message={"Error finding the project file list"} />;
    // }
    // if (props.isLoading || !props.files) {
    //     return <Loading message="Loading project files..." />;
    // }

    return (
        <div className="px-2 pt-2 bg-dark-mid whitespace-nowrap overflow-x-hidden overflow-y-scroll flex flex-auto code-scroll">
            <Tree
                {...required}
                {...handlers}
                draggable={false}
                gapMode={"padding"}
                classes={{
                    selectedNodeWrapper: "selected-node-wrapper",
                    nodeWrapper: "node-wrapper",
                }}
                disableTransitions={true}
                depthGap={12}
                disableLines={true}
                renderNode={renderNode}
            />
        </div>
    );
};

export default FileTree;
