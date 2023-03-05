import Editor, { Monaco } from "@monaco-editor/react";
import { FileMetaDto } from "@use-miller/shared-api-client";
import { Loading } from "../components/Loading";

const EditorWrapper = (props: {
    isError: boolean;
    isLoading: boolean;
    data: FileMetaDto | undefined;
}) => {
    const firstContents = "// Welcome to Miller!";
    const { data, isError, isLoading } = props;
    function handleEditorWillMount(monaco: Monaco) {
        // here is the monaco instance
        // do something before editor is mounted
        monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: false,
        });
        monaco.lineNumbers = false;
        monaco.editor.readOnly = true;
    }

    if (isError) {
        return (
            <div className="inset-0 z-10 overflow-y-auto">
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
            <div className="flex bg-dark-mid ">
                <div className="inline-block px-4 py-2 text-sm text-orange-300 border-b border-orange-300 bg-dark-shade">
                    {data ? data.fileLocation.split("/").pop() : "Welcome.txt"}
                </div>
            </div>
            <Editor
                theme="vs-dark"
                height="90vh"
                path={data?.fileLocation}
                beforeMount={handleEditorWillMount}
                defaultValue={firstContents}
                value={data?.contents}
            />
        </>
    );
};

export default EditorWrapper;
