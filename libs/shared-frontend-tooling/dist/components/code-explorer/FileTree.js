import { jsx as _jsx } from "react/jsx-runtime";
import { useLayoutEffect, useState } from "react";
import FolderTree from "@darraghor/react-folder-tree";
import { FileIcon, defaultStyles } from "react-file-icon";
import { Loading } from "../Loading.js";
import { Error } from "../Error.js";
const FileTree = (props) => {
    let [data, setData] = useState(props.files);
    useLayoutEffect(() => {
        setData(props.files);
    }, [props.files]);
    const CustomFileIcon = ({ onClick, nodeData, }) => {
        if (!nodeData)
            return _jsx(FileIcon, {});
        const { path, name, checked, isOpen, ...restData } = nodeData;
        const extension = name?.split(".").pop();
        if (extension !== undefined) {
            const defaultStyle = defaultStyles[extension];
            if (defaultStyle !== undefined) {
                // custom Style
                return _jsx(FileIcon, { extension: extension, ...defaultStyle });
            }
        }
        return _jsx(FileIcon, {});
    };
    if (props.isError) {
        return _jsx(Error, { message: "Error finding the project file list" });
    }
    if (props.isLoading || !data || !props.files) {
        return _jsx(Loading, { message: "Loading project files..." });
    }
    console.log("rendering file tree", data);
    return (_jsx("div", { className: "h-full bg-dark-mid", children: _jsx(FolderTree, { showCheckbox: false, data: data, onNameClick: props.handleClick, initOpenStatus: "custom", readOnly: true, iconComponents: {
                FileIcon: CustomFileIcon,
            } }) }));
};
export default FileTree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZVRyZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9jb2RlLWV4cGxvcmVyL0ZpbGVUcmVlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDbEQsT0FBTyxVQUF3QixNQUFNLDhCQUE4QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFMUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXBDLE1BQU0sUUFBUSxHQUFHLENBQUMsS0FVakIsRUFBRSxFQUFFO0lBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTVDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7UUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUVsQixNQUFNLGNBQWMsR0FBRyxDQUFDLEVBQ3BCLE9BQU8sRUFDUCxRQUFRLEdBSVgsRUFBRSxFQUFFO1FBQ0QsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPLEtBQUMsUUFBUSxLQUFHLENBQUM7UUFDbkMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLFFBQVEsRUFBRSxHQUFHLFFBQVEsQ0FBQztRQUU5RCxNQUFNLFNBQVMsR0FBRyxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUN6QixNQUFNLFlBQVksR0FDZCxhQUFhLENBQUMsU0FBOEMsQ0FBQyxDQUFDO1lBQ2xFLElBQUksWUFBWSxLQUFLLFNBQVMsRUFBRTtnQkFDNUIsZUFBZTtnQkFDZixPQUFPLEtBQUMsUUFBUSxJQUFDLFNBQVMsRUFBRSxTQUFTLEtBQU0sWUFBWSxHQUFJLENBQUM7YUFDL0Q7U0FDSjtRQUVELE9BQU8sS0FBQyxRQUFRLEtBQUcsQ0FBQztJQUN4QixDQUFDLENBQUM7SUFFRixJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7UUFDZixPQUFPLEtBQUMsS0FBSyxJQUFDLE9BQU8sRUFBRSxxQ0FBcUMsR0FBSSxDQUFDO0tBQ3BFO0lBQ0QsSUFBSSxLQUFLLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtRQUMxQyxPQUFPLEtBQUMsT0FBTyxJQUFDLE9BQU8sRUFBQywwQkFBMEIsR0FBRyxDQUFDO0tBQ3pEO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUV6QyxPQUFPLENBQ0gsY0FBSyxTQUFTLEVBQUMsb0JBQW9CLFlBRy9CLEtBQUMsVUFBVSxJQUNQLFlBQVksRUFBRSxLQUFLLEVBQ25CLElBQUksRUFBRSxJQUFJLEVBQ1YsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFrQixFQUNyQyxjQUFjLEVBQUUsUUFBUSxFQUN4QixRQUFRLFFBQ1IsY0FBYyxFQUFFO2dCQUNaLFFBQVEsRUFBRSxjQUFjO2FBQzNCLEdBQ0gsR0FDQSxDQUNULENBQUM7QUFDTixDQUFDLENBQUM7QUFFRixlQUFlLFFBQVEsQ0FBQyJ9