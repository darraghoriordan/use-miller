import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { colorVariants } from "../themeColors.js";
import { LeftMenuItem } from "./LeftMenuItem.js";
export function LeftMenu({ menuSections, currentPath, }) {
    const [currentPathMatcher, setCurrentPathMatcher] = useState(currentPath || "");
    useEffect(() => {
        if (currentPathMatcher === "") {
            setCurrentPathMatcher(window?.location?.pathname);
        }
    }, []);
    return (_jsxs("div", { className: "flex", children: [_jsxs("div", { className: "flex flex-col flex-grow ml-4 pt-[1em]", children: [_jsx("h1", { className: clsx(`mb-8 font-bold uppercase`, colorVariants["green"].foreground), children: "Docs" }), menuSections?.map((section) => (_jsxs("div", { children: [_jsx("h3", { className: "mb-2 font-bold text-white uppercase", children: section.name }), _jsx("ul", { className: "mr-4", children: section.items.map((item) => (_jsx(LeftMenuItem, { item: item, isCurrent: item.path === currentPathMatcher }, item.path))) })] }, section.name)))] }), _jsx("div", { className: "flex flex-col", children: _jsx("div", { style: {
                        background: "linear-gradient(#56d364, #00bcd4)",
                    }, className: "h-full w-[2px]", children: "\u00A0" }) })] }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGVmdE1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tcG9uZW50cy9MZWZ0TWVudS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUN4QixPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM1QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBVWpELE1BQU0sVUFBVSxRQUFRLENBQUMsRUFDckIsWUFBWSxFQUNaLFdBQVcsR0FJZDtJQUNHLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxxQkFBcUIsQ0FBQyxHQUFHLFFBQVEsQ0FDeEQsV0FBVyxJQUFJLEVBQUUsQ0FDcEIsQ0FBQztJQUNGLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDWCxJQUFJLGtCQUFrQixLQUFLLEVBQUUsRUFBRTtZQUMzQixxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3JEO0lBQ0wsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRVAsT0FBTyxDQUNILGVBQUssU0FBUyxFQUFDLE1BQU0sYUFDakIsZUFBSyxTQUFTLEVBQUMsdUNBQXVDLGFBQ2xELGFBQ0ksU0FBUyxFQUFFLElBQUksQ0FDWCwwQkFBMEIsRUFDMUIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FDcEMscUJBR0EsRUFDSixZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUM1QiwwQkFDSSxhQUFJLFNBQVMsRUFBQyxxQ0FBcUMsWUFDOUMsT0FBTyxDQUFDLElBQUksR0FDWixFQUNMLGFBQUksU0FBUyxFQUFDLE1BQU0sWUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FDekIsS0FBQyxZQUFZLElBRVQsSUFBSSxFQUFFLElBQUksRUFDVixTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksS0FBSyxrQkFBa0IsSUFGdEMsSUFBSSxDQUFDLElBQUksQ0FHaEIsQ0FDTCxDQUFDLEdBQ0QsS0FaQyxPQUFPLENBQUMsSUFBSSxDQWFoQixDQUNULENBQUMsSUFDQSxFQUNOLGNBQUssU0FBUyxFQUFDLGVBQWUsWUFDMUIsY0FDSSxLQUFLLEVBQUU7d0JBQ0gsVUFBVSxFQUFFLG1DQUFtQztxQkFDbEQsRUFDRCxTQUFTLEVBQUMsZ0JBQWdCLHVCQUd4QixHQUNKLElBQ0osQ0FDVCxDQUFDO0FBQ04sQ0FBQyJ9