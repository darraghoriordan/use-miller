import Editor from "@monaco-editor/react";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import useGetFileContent from "./course-files/useGetFileContent";

const EditorWrapper = (props: { filePath: string | undefined }) => {
    const firstContents = "// Welcome to Miller!";

    const { data, isError, isLoading } = useGetFileContent(
        "miller",
        props.filePath || ""
    );

    if (isError) {
        return <Error message={"Error loading a file"} />;
    }
    if (isLoading) {
        return <Loading />;
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
