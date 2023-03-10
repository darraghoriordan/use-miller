import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Loading from "../Loading.js";
const MarkdownWrapper = (props) => {
    const { error, isError, isLoading, data } = props;
    const firstContents = "// Welcome to Miller!";
    if (isError) {
        return (_jsx("div", { className: "inset-0 z-10 overflow-y-auto", children: _jsx("div", { className: "flex flex-col items-center justify-center min-h-full p-8 mt-8 text-center space-y-8", children: _jsx("div", { className: "max-w-lg text-lg text-white", children: `Error loading file content ${error}` }) }) }));
    }
    if (isLoading) {
        return _jsx(Loading, { message: "Loading nearest readme file..." });
    }
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex bg-dark-mid", children: _jsx("div", { className: "inline-block px-4 py-2 text-sm text-orange-300 border-b border-orange-300 bg-dark-shade", children: "Notes for code section" }) }), _jsx("article", { className: "mx-4 mt-2 mb-4 prose prose-sm prose-invert", dangerouslySetInnerHTML: {
                    __html: data || firstContents,
                } })] }));
};
export default MarkdownWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya2Rvd25XcmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY29kZS1leHBsb3Jlci9NYXJrZG93bldyYXBwZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLE9BQU8sTUFBTSxlQUFlLENBQUM7QUFFcEMsTUFBTSxlQUFlLEdBQUcsQ0FBQyxLQUt4QixFQUFFLEVBQUU7SUFDRCxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQ2xELE1BQU0sYUFBYSxHQUFHLHVCQUF1QixDQUFDO0lBRTlDLElBQUksT0FBTyxFQUFFO1FBQ1QsT0FBTyxDQUNILGNBQUssU0FBUyxFQUFDLDhCQUE4QixZQUN6QyxjQUFLLFNBQVMsRUFBQyxxRkFBcUYsWUFDaEcsY0FBSyxTQUFTLEVBQUMsNkJBQTZCLFlBQ3ZDLDhCQUE4QixLQUFLLEVBQUUsR0FDcEMsR0FDSixHQUNKLENBQ1QsQ0FBQztLQUNMO0lBQ0QsSUFBSSxTQUFTLEVBQUU7UUFDWCxPQUFPLEtBQUMsT0FBTyxJQUFDLE9BQU8sRUFBQyxnQ0FBZ0MsR0FBRyxDQUFDO0tBQy9EO0lBRUQsT0FBTyxDQUNILDhCQUNJLGNBQUssU0FBUyxFQUFDLGtCQUFrQixZQUM3QixjQUFLLFNBQVMsRUFBQyx5RkFBeUYsdUNBRWxHLEdBQ0osRUFDTixrQkFDSSxTQUFTLEVBQUMsNENBQTRDLEVBQ3RELHVCQUF1QixFQUFFO29CQUNyQixNQUFNLEVBQUUsSUFBSSxJQUFJLGFBQWE7aUJBQ2hDLEdBQ00sSUFDWixDQUNOLENBQUM7QUFDTixDQUFDLENBQUM7QUFFRixlQUFlLGVBQWUsQ0FBQyJ9