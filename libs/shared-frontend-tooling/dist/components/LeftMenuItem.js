import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
import { colorVariants } from "../themeColors.js";
export function LeftMenuItem({ item, isCurrent, }) {
    return (_jsx("li", { className: clsx("px-2 mb-2 ml-1 text-sm text-white whitespace-nowrap", {
            [colorVariants["green"].backgroundShade]: isCurrent,
            ["rounded-md"]: isCurrent,
        }), children: _jsx("a", { href: item.path, className: clsx("cursor-pointer", {
                [colorVariants["green"].foreground]: isCurrent,
            }), children: item.name }) }, item.path));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGVmdE1lbnVJdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbXBvbmVudHMvTGVmdE1lbnVJdGVtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRXhCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUdsRCxNQUFNLFVBQVUsWUFBWSxDQUFDLEVBQ3pCLElBQUksRUFDSixTQUFTLEdBSVo7SUFDRyxPQUFPLENBQ0gsYUFFSSxTQUFTLEVBQUUsSUFBSSxDQUNYLHFEQUFxRCxFQUNyRDtZQUNJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFLFNBQVM7WUFDbkQsQ0FBQyxZQUFZLENBQUMsRUFBRSxTQUFTO1NBQzVCLENBQ0osWUFFRCxZQUNJLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUNmLFNBQVMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQzlCLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFNBQVM7YUFDakQsQ0FBQyxZQUVELElBQUksQ0FBQyxJQUFJLEdBQ1YsSUFoQkMsSUFBSSxDQUFDLElBQUksQ0FpQmIsQ0FDUixDQUFDO0FBQ04sQ0FBQyJ9