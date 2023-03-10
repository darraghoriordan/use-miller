import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { getIconForFile } from "vscode-material-icon-theme-js";
import Tree, { treeHandlers, useTreeState, } from "react-hyper-tree";
const VS_MATERIAL_ICONS = "https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons";
function mapFileStructureToTreeNode(fileStructure) {
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
const FileTree = (props) => {
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
            console.log("node", node.data);
            // open all parents of the node
            let parent = node.getParent();
            while (parent) {
                parent.setOpened(true);
                parent = parent.getParent();
            }
        }
        else {
            console.log("node not found");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.selectedFile, tree.instance.enhancedData]);
    const renderNode = useCallback(({ node, onToggle, onSelect }) => {
        const nodeData = node.data;
        return (_jsxs("div", { className: "flex items-center text-white outline-none cursor-pointer select-none", onClick: (evt) => {
                onToggle(evt);
                if (node.children?.length === 0) {
                    props.setSelectedFile(nodeData.fileLocation);
                }
                tree.handlers.setSelected(node, true);
            }, children: [_jsx("div", { children: CustomFileIcon({
                        nodeProps: { node, onToggle, onSelect },
                    }) }), _jsx("div", { className: "ml-2 text-white", children: nodeData.title })] }, nodeData.id));
    }, []);
    const CustomFileIcon = ({ nodeProps }) => {
        const { node } = nodeProps;
        const { fileLocation, title, isOpen, children, ...restData } = node.data;
        // is it a folder?
        if (node.children && node.children.length > 0 && !node.isOpened()) {
            return _jsx(ChevronRightIcon, { className: "w-3 h-3 text-white" });
        }
        if (node.children && node.children.length > 0 && node.isOpened()) {
            return _jsx(ChevronDownIcon, { className: "w-3 h-3 text-white" });
        }
        // custom Style
        const iconPath = `${VS_MATERIAL_ICONS}/${getIconForFile(node.data.title)}
                `;
        return (_jsx("div", { className: "w-3 h-3", children: _jsx("img", { src: iconPath, alt: "", className: "w-3 h-3" }) }));
    };
    // if (props.isError) {
    //     return <Error message={"Error finding the project file list"} />;
    // }
    // if (props.isLoading || !props.files) {
    //     return <Loading message="Loading project files..." />;
    // }
    return (_jsx("div", { className: "h-full px-2 pt-2 bg-dark-mid", children: _jsx(Tree, { ...required, ...handlers, draggable: false, gapMode: "padding", classes: {
                selectedNodeWrapper: "selected-node-wrapper",
                nodeWrapper: "node-wrapper",
            }, disableTransitions: true, depthGap: 12, disableLines: true, renderNode: renderNode }) }));
};
export default FileTree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZVRyZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9jb2RlLWV4cGxvcmVyL0ZpbGVUcmVlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQVksTUFBTSxPQUFPLENBQUM7QUFFekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLElBQUksRUFBRSxFQUVULFlBQVksRUFDWixZQUFZLEdBQ2YsTUFBTSxrQkFBa0IsQ0FBQztBQUUxQixNQUFNLGlCQUFpQixHQUNuQiwyRUFBMkUsQ0FBQztBQVdoRixTQUFTLDBCQUEwQixDQUMvQixhQUErQjtJQUUvQixPQUFPO1FBQ0gsRUFBRSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1FBQzlCLEtBQUssRUFBRSxhQUFhLENBQUMsSUFBSTtRQUN6QixJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUk7UUFDeEIsTUFBTSxFQUFFLGFBQWEsQ0FBQyxNQUFNO1FBQzVCLFlBQVksRUFBRSxhQUFhLENBQUMsWUFBWTtRQUN4QyxRQUFRLEVBQUUsYUFBYSxDQUFDLFFBQVE7WUFDNUIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRSxDQUFDLENBQUMsRUFBRTtLQUNYLENBQUM7QUFDTixDQUFDO0FBRUQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUlqQixFQUFFLEVBQUU7SUFDRCxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLFlBQVksQ0FBQztRQUN4QyxFQUFFLEVBQUUsVUFBVTtRQUNkLElBQUksRUFBRSwwQkFBMEIsQ0FBQyxLQUFLLENBQUMs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