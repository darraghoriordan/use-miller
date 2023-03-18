import Editor, { Monaco } from "@monaco-editor/react";
import { FileMetaDto } from "@use-miller/shared-api-client";
import Loading from "../../../components/Loading.jsx";

const EditorWrapper = (props: {
    isError: boolean;
    isLoading: boolean;
    data: FileMetaDto | undefined;
}) => {
    const firstContents = "// Welcome to Miller!";
    const { data, isError, isLoading } = props;
    function handleEditorWillMount(monaco: Monaco) {
        monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: false,
        });
        monaco.editor.EditorOptions.readOnly.defaultValue = true;
    }
    function handleEditorOnMount(editor: any, monaco: Monaco) {
        editor.addAction({
            id: "askForHelp",
            label: "AI Explain",
            keybindings: [],
            contextMenuGroupId: "9_cutcopypaste",
            run: (editor: any) => {
                const selection = editor
                    .getModel()
                    .getValueInRange(editor.getSelection());
                alert("Add your custom pasting code here: " + selection);
            },
        });
    }

    if (isError) {
        return (
            <div className="inset-0 z-10 overflow-hidden">
                <div className="flex flex-col items-center justify-center min-h-full p-8 mt-8 text-center space-y-8">
                    <div className="max-w-lg text-lg text-white">
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
            <div className="flex bg-dark-mid">
                <div className="inline-block px-4 py-2 text-sm text-orange-300 border-b border-orange-300 bg-dark-shade">
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
