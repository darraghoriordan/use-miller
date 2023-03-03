import Editor from "@monaco-editor/react";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import useGetFileContent from "./course-files/useGetFileContent";

const EditorWrapper = (props: { filePath: string | undefined }) => {
    const firstContents = "// Welcome to Miller!";

    const { data, isError, isLoading, error } = useGetFileContent(
        "miller",
        props.filePath || ""
    );

    if (isError) {
        return (
            <div className="fixed inset-0 z-10 overflow-y-auto relative">
                <div className="flex flex-col items-center justify-center min-h-full p-8 mt-8 text-center space-y-8">
                    <div className="max-w-lg text-lg text-white">
                        {`Error loading file content ${error}`}
                    </div>
                </div>
            </div>
        );
    }
    if (isLoading) {
        return <Loading message="Loading editor..." />;
    }

    return (
        <>
            <div className="flex bg-dark-mid ">
                <div className="inline-block px-4 py-2 text-sm text-orange-300 bg-dark-shade">
                    {data.fileLocation.split("/").pop()}
                </div>
            </div>
            <Editor
                theme="vs-dark"
                height="90vh"
                path={data.fileLocation}
                defaultValue={firstContents}
                value={data.contents}
            />
        </>
    );
};

export default EditorWrapper;
