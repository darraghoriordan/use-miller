import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

export class ProductAction {
    title!: string;
    href!: string;
    description!: string;
    icon!: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    iconForeground!: "green" | "red" | "amber" | "cyan" | "violet" | "pink";
}
export default function ProductActionsCard({
    actions,
}: {
    actions: ProductAction[];
}) {
    const colorVariants = {
        green: {
            hoverShadow: "hover:shadow-green-500/30",
            foreground: "text-green-500",
            hoverForeground: "hover:text-green-500",
        },
        red: {
            hoverShadow: "hover:shadow-red-500/30",
            foreground: "text-red-500",
            hoverForeground: "hover:text-red-500",
        },
        amber: {
            hoverShadow: "hover:shadow-amber-500/30",
            foreground: "text-amber-500",
            hoverForeground: "hover:text-amber-500",
        },
        cyan: {
            hoverShadow: "hover:shadow-cyan-500/30",
            foreground: "text-cyan-500",
            hoverForeground: "hover:text-cyan-500",
        },
        violet: {
            hoverShadow: "hover:shadow-violet-500/30",
            foreground: "text-violet-500",
            hoverForeground: "hover:text-violet-500",
        },
        pink: {
            hoverShadow: "hover:shadow-pink-500/30",
            foreground: "text-pink-500",
            hoverForeground: "hover:text-pink-500",
        },
    };

    return (
        <div className=" rounded-md divide-gray-200 grid grid-cols-2 divide-y-0 gap-4 ">
            {actions.map((action, actionIdx) => (
                <div
                    key={actionIdx}
                    className={`p-4 mb-8 overflow-hidden cursor-pointer rounded-md text-gray-500 bg-dark-accent hover:shadow-lg ${
                        colorVariants[action.iconForeground].hoverShadow
                    } ${colorVariants[action.iconForeground].hoverForeground}`}
                >
                    <NavLink to={action.href}>
                        <div className="flex items-center justify-start space-x-4">
                            <span
                                className={
                                    colorVariants[action.iconForeground]
                                        .foreground
                                }
                            >
                                <action.icon
                                    className="w-8 h-8"
                                    aria-hidden="true"
                                />
                            </span>
                            <h3 className="text-4xl font-medium text-light-accent">
                                {action.title}
                            </h3>
                        </div>
                        <div className="flex items-center justify-between mt-8">
                            <p className=" mr-8 text-sm text-gray-500">
                                {action.description}
                            </p>
                            <span className={`block `}>
                                <ArrowLongRightIcon
                                    className="w-8 h-8"
                                    aria-hidden="true"
                                />
                            </span>
                        </div>
                    </NavLink>
                </div>
            ))}
        </div>
    );
}
