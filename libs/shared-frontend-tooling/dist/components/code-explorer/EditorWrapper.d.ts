/// <reference types="react" />
import { FileMetaDto } from "@use-miller/shared-api-client";
declare const EditorWrapper: (props: {
    isError: boolean;
    isLoading: boolean;
    data: FileMetaDto | undefined;
}) => JSX.Element;
export default EditorWrapper;
