import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth0 } from "@auth0/auth0-react";
import StyledButton from "./StyledButton.js";
export const Error = ({ message }) => {
    const { logout } = useAuth0();
    return (_jsx("div", { className: "fixed inset-0 z-10 overflow-y-auto", children: _jsxs("div", { className: "flex flex-col items-center justify-center min-h-full p-8 mt-8 text-center space-y-8", children: [_jsx("div", { className: "max-w-lg text-lg", children: message }), _jsx(StyledButton, { onClick: () => logout(), children: "Logout to attempt a reset" })] }) }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tcG9uZW50cy9FcnJvci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLFlBQVksTUFBTSxtQkFBbUIsQ0FBQztBQUU3QyxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBdUIsRUFBRSxFQUFFO0lBQ3RELE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQztJQUU5QixPQUFPLENBQ0gsY0FBSyxTQUFTLEVBQUMsb0NBQW9DLFlBQy9DLGVBQUssU0FBUyxFQUFDLHFGQUFxRixhQUNoRyxjQUFLLFNBQVMsRUFBQyxrQkFBa0IsWUFBRSxPQUFPLEdBQU8sRUFDakQsS0FBQyxZQUFZLElBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSwwQ0FFdEIsSUFDYixHQUNKLENBQ1QsQ0FBQztBQUNOLENBQUMsQ0FBQyJ9