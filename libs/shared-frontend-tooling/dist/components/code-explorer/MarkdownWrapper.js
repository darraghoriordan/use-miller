import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Loading } from "../Loading.js";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya2Rvd25XcmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY29kZS1leHBsb3Jlci9NYXJrZG93bldyYXBwZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhDLE1BQU0sZUFBZSxHQUFHLENBQUMsS0FLeEIsRUFBRSxFQUFFO0lBQ0QsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNsRCxNQUFNLGFBQWEsR0FBRyx1QkFBdUIsQ0FBQztJQUU5QyxJQUFJLE9BQU8sRUFBRTtRQUNULE9BQU8sQ0FDSCxjQUFLLFNBQVMsRUFBQyw4QkFBOEIsWUFDekMsY0FBSyxTQUFTLEVBQUMscUZBQXFGLFlBQ2hHLGNBQUssU0FBUyxFQUFDLDZCQUE2QixZQUN2Qyw4QkFBOEIsS0FBSyxFQUFFLEdBQ3BDLEdBQ0osR0FDSixDQUNULENBQUM7S0FDTDtJQUNELElBQUksU0FBUyxFQUFFO1FBQ1gsT0FBTyxLQUFDLE9BQU8sSUFBQyxPQUFPLEVBQUMsZ0NBQWdDLEdBQUcsQ0FBQztLQUMvRDtJQUVELE9BQU8sQ0FDSCw4QkFDSSxjQUFLLFNBQVMsRUFBQyxrQkFBa0IsWUFDN0IsY0FBSyxTQUFTLEVBQUMseUZBQXlGLHVDQUVsRyxHQUNKLEVBQ04sa0JBQ0ksU0FBUyxFQUFDLDRDQUE0QyxFQUN0RCx1QkFBdUIsRUFBRTtvQkFDckIsTUFBTSxFQUFFLElBQUksSUFBSSxhQUFhO2lCQUNoQyxHQUNNLElBQ1osQ0FDTixDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBRUYsZUFBZSxlQUFlLENBQUMifQ==