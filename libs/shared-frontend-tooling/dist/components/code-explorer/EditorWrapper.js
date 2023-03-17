import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Editor from "@monaco-editor/react";
import Loading from "../Loading.js";
const EditorWrapper = (props) => {
    const firstContents = "// Welcome to Miller!";
    const { data, isError, isLoading } = props;
    function handleEditorWillMount(monaco) {
        monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: false,
        });
        monaco.editor.EditorOptions.readOnly.defaultValue = true;
    }
    function handleEditorOnMount(editor, monaco) {
        editor.addAction({
            id: "askForHelp",
            label: "AI Explain",
            keybindings: [],
            contextMenuGroupId: "9_cutcopypaste",
            run: (editor) => {
                const selection = editor
                    .getModel()
                    .getValueInRange(editor.getSelection());
                alert("Add your custom pasting code here: " + selection);
            },
        });
    }
    if (isError) {
        return (_jsx("div", { className: "inset-0 z-10 overflow-hidden", children: _jsx("div", { className: "flex flex-col items-center justify-center min-h-full p-8 mt-8 text-center space-y-8", children: _jsx("div", { className: "max-w-lg text-lg text-white", children: `Error loading file content` }) }) }));
    }
    if (isLoading || !data) {
        return _jsx(Loading, { message: "Loading editor..." });
    }
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex bg-dark-mid", children: _jsx("div", { className: "inline-block px-4 py-2 text-sm text-orange-300 border-b border-orange-300 bg-dark-shade", children: data ? data.fileName : "Welcome.txt" }) }), _jsx("div", { className: "flex flex-auto", children: _jsx(Editor, { theme: "vs-dark", path: data?.fileName, beforeMount: handleEditorWillMount, onMount: handleEditorOnMount, defaultValue: firstContents, value: data?.contents }) })] }));
};
export default EditorWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdG9yV3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvZGUtZXhwbG9yZXIvRWRpdG9yV3JhcHBlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sTUFBa0IsTUFBTSxzQkFBc0IsQ0FBQztBQUV0RCxPQUFPLE9BQU8sTUFBTSxlQUFlLENBQUM7QUFFcEMsTUFBTSxhQUFhLEdBQUcsQ0FBQyxLQUl0QixFQUFFLEVBQUU7SUFDRCxNQUFNLGFBQWEsR0FBRyx1QkFBdUIsQ0FBQztJQUM5QyxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFDM0MsU0FBUyxxQkFBcUIsQ0FBQyxNQUFjO1FBQ3pDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDO1lBQ2pFLG9CQUFvQixFQUFFLElBQUk7WUFDMUIsa0JBQWtCLEVBQUUsS0FBSztTQUM1QixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUM3RCxDQUFDO0lBQ0QsU0FBUyxtQkFBbUIsQ0FBQyxNQUFXLEVBQUUsTUFBYztRQUNwRCxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ2IsRUFBRSxFQUFFLFlBQVk7WUFDaEIsS0FBSyxFQUFFLFlBQVk7WUFDbkIsV0FBVyxFQUFFLEVBQUU7WUFDZixrQkFBa0IsRUFBRSxnQkFBZ0I7WUFDcEMsR0FBRyxFQUFFLENBQUMsTUFBVyxFQUFFLEVBQUU7Z0JBQ2pCLE1BQU0sU0FBUyxHQUFHLE1BQU07cUJBQ25CLFFBQVEsRUFBRTtxQkFDVixlQUFlLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7Z0JBQzVDLEtBQUssQ0FBQyxxQ0FBcUMsR0FBRyxTQUFTLENBQUMsQ0FBQztZQUM3RCxDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELElBQUksT0FBTyxFQUFFO1FBQ1QsT0FBTyxDQUNILGNBQUssU0FBUyxFQUFDLDhCQUE4QixZQUN6QyxjQUFLLFNBQVMsRUFBQyxxRkFBcUYsWUFDaEcsY0FBSyxTQUFTLEVBQUMsNkJBQTZCLFlBQ3ZDLDRCQUE0QixHQUMzQixHQUNKLEdBQ0osQ0FDVCxDQUFDO0tBQ0w7SUFDRCxJQUFJLFNBQVMsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNwQixPQUFPLEtBQUMsT0FBTyxJQUFDLE9BQU8sRUFBQyxtQkFBbUIsR0FBRyxDQUFDO0tBQ2xEO0lBRUQsT0FBTyxDQUNILDhCQUNJLGNBQUssU0FBUyxFQUFDLGtCQUFrQixZQUM3QixjQUFLLFNBQVMsRUFBQyx5RkFBeUYsWUFDbkcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxhQUFhLEdBQ25DLEdBQ0osRUFDTixjQUFLLFNBQVMsRUFBQyxnQkFBZ0IsWUFDM0IsS0FBQyxNQUFNLElBQ0gsS0FBSyxFQUFDLFNBQVMsRUFDZixJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFDcEIsV0FBVyxFQUFFLHFCQUFxQixFQUNsQyxPQUFPLEVBQUUsbUJBQW1CLEVBQzVCLFlBQVksRUFBRSxhQUFhLEVBQzNCLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUN2QixHQUNBLElBQ1AsQ0FDTixDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBRUYsZUFBZSxhQUFhLENBQUMifQ==