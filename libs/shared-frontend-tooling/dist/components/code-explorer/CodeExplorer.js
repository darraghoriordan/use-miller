import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import EditorWrapper from "./EditorWrapper.js";
import FileTree from "./FileTree.js";
import { PanelGroup, Panel } from "react-resizable-panels";
import ResizeHandle from "./ResizeHandle";
import MarkdownWrapper from "./MarkdownWrapper.js";
export default function CodeExplorer({ markdownFile, codeFile, fileList, selectedFile, setSelectedFile, }) {
    return (_jsxs(PanelGroup, { direction: "horizontal", children: [_jsx(Panel, { defaultSize: 20, minSize: 5, children: fileList.data && (_jsx(FileTree, { files: fileList.data, selectedFile: selectedFile, setSelectedFile: setSelectedFile })) }), _jsx(ResizeHandle, { className: "bg-dark-shade" }), _jsx(Panel, { minSize: 40, children: _jsx(EditorWrapper, { data: codeFile.data, isLoading: codeFile.isLoading, isError: codeFile.isError }) }), _jsx(ResizeHandle, { className: "bg-dark-shade" }), _jsx(Panel, { defaultSize: 40, minSize: 20, children: _jsx(MarkdownWrapper, { data: markdownFile.data?.contents, isLoading: markdownFile.isLoading, isError: markdownFile.isError, error: markdownFile.error }) })] }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29kZUV4cGxvcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY29kZS1leHBsb3Jlci9Db2RlRXhwbG9yZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLGFBQWEsTUFBTSxvQkFBb0IsQ0FBQztBQUMvQyxPQUFPLFFBQVEsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMzRCxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLGVBQWUsTUFBTSxzQkFBc0IsQ0FBQztBQUduRCxNQUFNLENBQUMsT0FBTyxVQUFVLFlBQVksQ0FBQyxFQUNqQyxZQUFZLEVBQ1osUUFBUSxFQUNSLFFBQVEsRUFDUixZQUFZLEVBQ1osZUFBZSxHQXNCbEI7SUFDRyxPQUFPLENBQ0gsTUFBQyxVQUFVLElBQUMsU0FBUyxFQUFDLFlBQVksYUFDOUIsS0FBQyxLQUFLLElBQUMsV0FBVyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxZQUM3QixRQUFRLENBQUMsSUFBSSxJQUFJLENBQ2QsS0FBQyxRQUFRLElBQ0wsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQ3BCLFlBQVksRUFBRSxZQUFZLEVBQzFCLGVBQWUsRUFBRSxlQUFlLEdBQ2xDLENBQ0wsR0FDRyxFQUNSLEtBQUMsWUFBWSxJQUFDLFNBQVMsRUFBQyxlQUFlLEdBQUcsRUFDMUMsS0FBQyxLQUFLLElBQUMsT0FBTyxFQUFFLEVBQUUsWUFDZCxLQUFDLGFBQWEsSUFDVixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksRUFDbkIsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTLEVBQzdCLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTyxHQUMzQixHQUNFLEVBQ1IsS0FBQyxZQUFZLElBQUMsU0FBUyxFQUFDLGVBQWUsR0FBRyxFQUMxQyxLQUFDLEtBQUssSUFBQyxXQUFXLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLFlBQy9CLEtBQUMsZUFBZSxJQUNaLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFDakMsU0FBUyxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQ2pDLE9BQU8sRUFBRSxZQUFZLENBQUMsT0FBTyxFQUM3QixLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUssR0FDVixHQUNmLElBQ0MsQ0FDaEIsQ0FBQztBQUNOLENBQUMifQ==