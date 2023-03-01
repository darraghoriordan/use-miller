import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
const StyledButton = ({ onClick, className, children, }) => {
    const styles = "flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2";
    return (_jsx("button", { type: "button", onClick: () => onClick(), className: clsx(styles, className), children: children }));
};
export default StyledButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3R5bGVkQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbXBvbmVudHMvU3R5bGVkQnV0dG9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBR3hCLE1BQU0sWUFBWSxHQUFHLENBQUMsRUFDbEIsT0FBTyxFQUNQLFNBQVMsRUFDVCxRQUFRLEdBQ3NELEVBQUUsRUFBRTtJQUNsRSxNQUFNLE1BQU0sR0FDUixvTkFBb04sQ0FBQztJQUN6TixPQUFPLENBQ0gsaUJBQ0ksSUFBSSxFQUFDLFFBQVEsRUFDYixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQ3hCLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxZQUVqQyxRQUFRLEdBQ0osQ0FDWixDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBRUYsZUFBZSxZQUFZLENBQUMifQ==