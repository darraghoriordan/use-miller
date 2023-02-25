import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
const StyledLink = ({ href, className, children, }) => {
    const styles = "inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2";
    return (_jsx("a", { href: href, className: clsx(styles, className), children: children }));
};
export default StyledLink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3R5bGVkTGluay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL1N0eWxlZExpbmsudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFHeEIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxFQUNoQixJQUFJLEVBQ0osU0FBUyxFQUNULFFBQVEsR0FDK0MsRUFBRSxFQUFFO0lBQzNELE1BQU0sTUFBTSxHQUNSLDJOQUEyTixDQUFDO0lBQ2hPLE9BQU8sQ0FDSCxZQUFHLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLFlBQzVDLFFBQVEsR0FDVCxDQUNQLENBQUM7QUFDTixDQUFDLENBQUM7QUFFRixlQUFlLFVBQVUsQ0FBQyJ9