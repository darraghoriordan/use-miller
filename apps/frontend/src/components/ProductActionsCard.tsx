import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { colorVariants } from "@use-miller/shared-frontend-tooling";
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
