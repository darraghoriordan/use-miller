import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Editor from "@monaco-editor/react";
import { Loading } from "../Loading.js";
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
        return (_jsx("div", { className: "inset-0 z-10 overflow-y-auto", children: _jsx("div", { className: "flex flex-col items-center justify-center min-h-full p-8 mt-8 text-center space-y-8", children: _jsx("div", { className: "max-w-lg text-lg text-white", children: `Error loading file content` }) }) }));
    }
    if (isLoading || !data) {
        return _jsx(Loading, { message: "Loading editor..." });
    }
    return (_jsxs("div", { className: "h-full bg-dark-shade", children: [_jsx("div", { className: "flex bg-dark-mid ", children: _jsx("div", { className: "inline-block px-4 py-2 text-sm text-orange-300 border-b border-orange-300 bg-dark-shade", children: data ? data.fileName : "Welcome.txt" }) }), _jsx(Editor, { theme: "vs-dark", height: "90vh", path: data?.fileName, beforeMount: handleEditorWillMount, onMount: handleEditorOnMount, defaultValue: firstContents, value: data?.contents })] }));
};
export default EditorWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdG9yV3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvZGUtZXhwbG9yZXIvRWRpdG9yV3JhcHBlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sTUFBa0IsTUFBTSxzQkFBc0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhDLE1BQU0sYUFBYSxHQUFHLENBQUMsS0FJdEIsRUFBRSxFQUFFO0lBQ0QsTUFBTSxhQUFhLEdBQUcsdUJBQXVCLENBQUM7SUFDOUMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQzNDLFNBQVMscUJBQXFCLENBQUMsTUFBYztRQUN6QyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RSxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQztZQUNqRSxvQkFBb0IsRUFBRSxJQUFJO1lBQzFCLGtCQUFrQixFQUFFLEtBQUs7U0FDNUIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDN0QsQ0FBQztJQUNELFNBQVMsbUJBQW1CLENBQUMsTUFBVyxFQUFFLE1BQWM7UUFDcEQsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUNiLEVBQUUsRUFBRSxZQUFZO1lBQ2hCLEtBQUssRUFBRSxZQUFZO1lBQ25CLFdBQVcsRUFBRSxFQUFFO1lBQ2Ysa0JBQWtCLEVBQUUsZ0JBQWdCO1lBQ3BDLEdBQUcsRUFBRSxDQUFDLE1BQVcsRUFBRSxFQUFFO2dCQUNqQixNQUFNLFNBQVMsR0FBRyxNQUFNO3FCQUNuQixRQUFRLEVBQUU7cUJBQ1YsZUFBZSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO2dCQUM1QyxLQUFLLENBQUMscUNBQXFDLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDN0QsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUFJLE9BQU8sRUFBRTtRQUNULE9BQU8sQ0FDSCxjQUFLLFNBQVMsRUFBQyw4QkFBOEIsWUFDekMsY0FBSyxTQUFTLEVBQUMscUZBQXFGLFlBQ2hHLGNBQUssU0FBUyxFQUFDLDZCQUE2QixZQUN2Qyw0QkFBNEIsR0FDM0IsR0FDSixHQUNKLENBQ1QsQ0FBQztLQUNMO0lBQ0QsSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDcEIsT0FBTyxLQUFDLE9BQU8sSUFBQyxPQUFPLEVBQUMsbUJBQW1CLEdBQUcsQ0FBQztLQUNsRDtJQUVELE9BQU8sQ0FDSCxlQUFLLFNBQVMsRUFBQyxzQkFBc0IsYUFDakMsY0FBSyxTQUFTLEVBQUMsbUJBQW1CLFlBQzlCLGNBQUssU0FBUyxFQUFDLHlGQUF5RixZQUNuRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQWEsR0FDbkMsR0FDSixFQUNOLEtBQUMsTUFBTSxJQUNILEtBQUssRUFBQyxTQUFTLEVBQ2YsTUFBTSxFQUFDLE1BQU0sRUFDYixJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFDcEIsV0FBVyxFQUFFLHFCQUFxQixFQUNsQyxPQUFPLEVBQUUsbUJBQW1CLEVBQzVCLFlBQVksRUFBRSxhQUFhLEVBQzNCLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUN2QixJQUNBLENBQ1QsQ0FBQztBQUNOLENBQUMsQ0FBQztBQUVGLGVBQWUsYUFBYSxDQUFDIn0=