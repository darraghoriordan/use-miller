import Editor, {
    type BeforeMount,
    type Monaco,
    type OnMount,
} from "@monaco-editor/react";
import type { components } from "../../../shared/types/api-specs";
import Loading from "../../../components/Loading";

type FileMetaDto = components["schemas"]["FileMetaDto"];

const EditorWrapper = (props: {
    isError: boolean;
    isLoading: boolean;
    data: FileMetaDto | undefined;
}) => {
    const firstContents = "// Welcome to Miller!";
    const { data, isError, isLoading } = props;
    const handleEditorWillMount: BeforeMount = (monaco: Monaco) => {
        monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: false,
        });
        monaco.editor.EditorOptions.readOnly.defaultValue = true;
    };
    const handleEditorOnMount: OnMount = (editor) => {
        editor.addAction({
            id: "askForHelp",
            label: "AI Explain",
            keybindings: [],
            contextMenuGroupId: "9_cutcopypaste",
            run: (codeEditor) => {
                const model = codeEditor.getModel();
                const selectionRange = codeEditor.getSelection();
                const selection =
                    model && selectionRange
                        ? model.getValueInRange(selectionRange)
                        : "";
                alert("Add your custom pasting code here: " + selection);
            },
        });
    };

    if (isError) {
        return (
            <div className="inset-0 z-10 overflow-hidden bg-security-dark">
                <div className="flex flex-col items-center justify-center min-h-full p-8 mt-8 text-center space-y-8">
                    <div className="max-w-lg text-lg text-security-text">
                        {`Error loading file content`}
                    </div>
                </div>
            </div>
        );
    }
    if (isLoading || !data) {
        return <Loading message="Loading editor..." />;
    }

    return (
        <>
            <div className="flex bg-security-dark border-b border-security-border">
                <div className="inline-block px-4 py-2 text-sm font-mono text-accent border-b-2 border-accent bg-security-darker">
                    {data ? data.fileName : "Welcome.txt"}
                </div>
            </div>
            <div className="flex flex-auto">
                <Editor
                    theme="vs-dark"
                    path={data?.fileName}
                    beforeMount={handleEditorWillMount}
                    onMount={handleEditorOnMount}
                    defaultValue={firstContents}
                    value={data?.contents}
                />
            </div>
        </>
    );
};

export default EditorWrapper;
