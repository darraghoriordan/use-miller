import Editor from "@monaco-editor/react";
import useGetFileContent from "./course-files/useGetFileContent";

const EditorWrapper = (props: { filePath: string | undefined }) => {
    const firstContents = "// Welcome to Miller!";

    const { data, isError, isLoading } = useGetFileContent(
        "miller",
        props.filePath || ""
    );

    if (isError) {
        return <div>Error getting file content</div>;
    }
    if (isLoading) {
        return <div>Loading</div>;
    }

    return (
        <>
            <div className="flex bg-dark-mid ">
                <div className="text-sm px-4 py-2 text-orange-300 bg-dark-shade inline-block">
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
