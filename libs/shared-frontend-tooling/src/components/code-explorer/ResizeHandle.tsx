import { PanelResizeHandle } from "react-resizable-panels";
export default function ResizeHandle({
    className,
    id,
}: {
    className?: string;
    id?: string;
}) {
    return (
        <PanelResizeHandle
            className={`flex items-stretch justify-between outline-none p-[.5rem] flex-[0_0_1.1rem] leading-[1.5em] ${className}`}
            id={id}
        >
            <div className="relative flex-1 rounded-[.75rem]">
                <svg
                    className="absolute hidden text-blue-400 w-[1rem] h-[1rem] fill-zinc-200 top-[calc(50%-0.5rem)] left-[calc(50%-0.5rem)]"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M18,16V13H15V22H13V2H15V11H18V8L22,12L18,16M2,12L6,16V13H9V22H11V2H9V11H6V8L2,12Z"
                    ></path>
                </svg>
                <svg className="hidden" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M8,18H11V15H2V13H22V15H13V18H16L12,22L8,18M12,2L8,6H11V9H2V11H22V9H13V6H16L12,2Z"
                    ></path>
                </svg>
            </div>
        </PanelResizeHandle>
    );
}
