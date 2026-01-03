export type ThemeColor =
    | "primary"
    | "devshell"
    | "localtools"
    | "millerstart"
    | "eslint"
    // Legacy colors for backward compatibility
    | "green"
    | "cyan"
    | "amber"
    | "red"
    | "violet"
    | "pink";

interface ColorVariant {
    foreground: string;
    background: string;
    hoverBackground: string;
    hoverForeground: string;
    border: string;
    hoverBorder: string;
    focusRing: string;
    glow: string;
    hoverGlow: string;
    backgroundMuted: string;
    groupHoverForeground: string;
    // Legacy properties
    hoverShadow: string;
    hoverFocusRing: string;
    backgroundShade: string;
    topMenuHoverBackground: string;
}

export const colorVariants: Record<ThemeColor, ColorVariant> = {
    // Primary accent (security green)
    primary: {
        foreground: "text-accent",
        background: "bg-accent",
        hoverBackground: "hover:bg-accent-dim",
        hoverForeground: "hover:text-accent",
        border: "border-accent/30",
        hoverBorder: "hover:border-accent",
        focusRing: "focus:ring-accent/50",
        glow: "shadow-glow",
        hoverGlow: "hover:shadow-glow-lg",
        backgroundMuted: "bg-accent-muted",
        groupHoverForeground: "group-hover:text-accent",
        hoverShadow: "hover:shadow-glow",
        hoverFocusRing: "focus:ring-accent/50",
        backgroundShade: "bg-accent-muted",
        topMenuHoverBackground: "hover:bg-accent/20",
    },

    // Product: Dev Shell (muted teal-green)
    devshell: {
        foreground: "text-product-devshell",
        background: "bg-product-devshell",
        hoverBackground: "hover:bg-product-devshell/20",
        hoverForeground: "hover:text-product-devshell",
        border: "border-product-devshell/30",
        hoverBorder: "hover:border-product-devshell",
        focusRing: "focus:ring-product-devshell/50",
        glow: "shadow-[0_0_20px_rgba(74,155,124,0.2)]",
        hoverGlow: "hover:shadow-[0_0_30px_rgba(74,155,124,0.3)]",
        backgroundMuted: "bg-product-devshell/10",
        groupHoverForeground: "group-hover:text-product-devshell",
        hoverShadow: "hover:shadow-[0_0_20px_rgba(74,155,124,0.3)]",
        hoverFocusRing: "focus:ring-product-devshell/50",
        backgroundShade: "bg-product-devshell/10",
        topMenuHoverBackground: "hover:bg-product-devshell/20",
    },

    // Product: Local Dev Tools (muted cyan)
    localtools: {
        foreground: "text-product-localtools",
        background: "bg-product-localtools",
        hoverBackground: "hover:bg-product-localtools/20",
        hoverForeground: "hover:text-product-localtools",
        border: "border-product-localtools/30",
        hoverBorder: "hover:border-product-localtools",
        focusRing: "focus:ring-product-localtools/50",
        glow: "shadow-[0_0_20px_rgba(91,138,154,0.2)]",
        hoverGlow: "hover:shadow-[0_0_30px_rgba(91,138,154,0.3)]",
        backgroundMuted: "bg-product-localtools/10",
        groupHoverForeground: "group-hover:text-product-localtools",
        hoverShadow: "hover:shadow-[0_0_20px_rgba(91,138,154,0.3)]",
        hoverFocusRing: "focus:ring-product-localtools/50",
        backgroundShade: "bg-product-localtools/10",
        topMenuHoverBackground: "hover:bg-product-localtools/20",
    },

    // Product: Miller Start (muted violet)
    millerstart: {
        foreground: "text-product-millerstart",
        background: "bg-product-millerstart",
        hoverBackground: "hover:bg-product-millerstart/20",
        hoverForeground: "hover:text-product-millerstart",
        border: "border-product-millerstart/30",
        hoverBorder: "hover:border-product-millerstart",
        focusRing: "focus:ring-product-millerstart/50",
        glow: "shadow-[0_0_20px_rgba(139,123,163,0.2)]",
        hoverGlow: "hover:shadow-[0_0_30px_rgba(139,123,163,0.3)]",
        backgroundMuted: "bg-product-millerstart/10",
        groupHoverForeground: "group-hover:text-product-millerstart",
        hoverShadow: "hover:shadow-[0_0_20px_rgba(139,123,163,0.3)]",
        hoverFocusRing: "focus:ring-product-millerstart/50",
        backgroundShade: "bg-product-millerstart/10",
        topMenuHoverBackground: "hover:bg-product-millerstart/20",
    },

    // Product: ESLint Plugin (muted amber)
    eslint: {
        foreground: "text-product-eslint",
        background: "bg-product-eslint",
        hoverBackground: "hover:bg-product-eslint/20",
        hoverForeground: "hover:text-product-eslint",
        border: "border-product-eslint/30",
        hoverBorder: "hover:border-product-eslint",
        focusRing: "focus:ring-product-eslint/50",
        glow: "shadow-[0_0_20px_rgba(155,138,91,0.2)]",
        hoverGlow: "hover:shadow-[0_0_30px_rgba(155,138,91,0.3)]",
        backgroundMuted: "bg-product-eslint/10",
        groupHoverForeground: "group-hover:text-product-eslint",
        hoverShadow: "hover:shadow-[0_0_20px_rgba(155,138,91,0.3)]",
        hoverFocusRing: "focus:ring-product-eslint/50",
        backgroundShade: "bg-product-eslint/10",
        topMenuHoverBackground: "hover:bg-product-eslint/20",
    },

    // Legacy: green -> primary
    green: {
        foreground: "text-accent",
        background: "bg-accent",
        hoverBackground: "hover:bg-accent-dim",
        hoverForeground: "hover:text-accent",
        border: "border-accent/30",
        hoverBorder: "hover:border-accent",
        focusRing: "focus:ring-accent/50",
        glow: "shadow-glow",
        hoverGlow: "hover:shadow-glow-lg",
        backgroundMuted: "bg-accent-muted",
        groupHoverForeground: "group-hover:text-accent",
        hoverShadow: "hover:shadow-glow",
        hoverFocusRing: "focus:ring-accent/50",
        backgroundShade: "bg-accent-muted",
        topMenuHoverBackground: "hover:bg-accent/20",
    },

    // Legacy: cyan -> localtools
    cyan: {
        foreground: "text-product-localtools",
        background: "bg-product-localtools",
        hoverBackground: "hover:bg-product-localtools/20",
        hoverForeground: "hover:text-product-localtools",
        border: "border-product-localtools/30",
        hoverBorder: "hover:border-product-localtools",
        focusRing: "focus:ring-product-localtools/50",
        glow: "shadow-[0_0_20px_rgba(91,138,154,0.2)]",
        hoverGlow: "hover:shadow-[0_0_30px_rgba(91,138,154,0.3)]",
        backgroundMuted: "bg-product-localtools/10",
        groupHoverForeground: "group-hover:text-product-localtools",
        hoverShadow: "hover:shadow-[0_0_20px_rgba(91,138,154,0.3)]",
        hoverFocusRing: "focus:ring-product-localtools/50",
        backgroundShade: "bg-product-localtools/10",
        topMenuHoverBackground: "hover:bg-product-localtools/20",
    },

    // Legacy: violet -> millerstart
    violet: {
        foreground: "text-product-millerstart",
        background: "bg-product-millerstart",
        hoverBackground: "hover:bg-product-millerstart/20",
        hoverForeground: "hover:text-product-millerstart",
        border: "border-product-millerstart/30",
        hoverBorder: "hover:border-product-millerstart",
        focusRing: "focus:ring-product-millerstart/50",
        glow: "shadow-[0_0_20px_rgba(139,123,163,0.2)]",
        hoverGlow: "hover:shadow-[0_0_30px_rgba(139,123,163,0.3)]",
        backgroundMuted: "bg-product-millerstart/10",
        groupHoverForeground: "group-hover:text-product-millerstart",
        hoverShadow: "hover:shadow-[0_0_20px_rgba(139,123,163,0.3)]",
        hoverFocusRing: "focus:ring-product-millerstart/50",
        backgroundShade: "bg-product-millerstart/10",
        topMenuHoverBackground: "hover:bg-product-millerstart/20",
    },

    // Legacy: amber -> eslint
    amber: {
        foreground: "text-product-eslint",
        background: "bg-product-eslint",
        hoverBackground: "hover:bg-product-eslint/20",
        hoverForeground: "hover:text-product-eslint",
        border: "border-product-eslint/30",
        hoverBorder: "hover:border-product-eslint",
        focusRing: "focus:ring-product-eslint/50",
        glow: "shadow-[0_0_20px_rgba(155,138,91,0.2)]",
        hoverGlow: "hover:shadow-[0_0_30px_rgba(155,138,91,0.3)]",
        backgroundMuted: "bg-product-eslint/10",
        groupHoverForeground: "group-hover:text-product-eslint",
        hoverShadow: "hover:shadow-[0_0_20px_rgba(155,138,91,0.3)]",
        hoverFocusRing: "focus:ring-product-eslint/50",
        backgroundShade: "bg-product-eslint/10",
        topMenuHoverBackground: "hover:bg-product-eslint/20",
    },

    // Legacy: red -> error state
    red: {
        foreground: "text-error",
        background: "bg-error",
        hoverBackground: "hover:bg-error/80",
        hoverForeground: "hover:text-error",
        border: "border-error/30",
        hoverBorder: "hover:border-error",
        focusRing: "focus:ring-error/50",
        glow: "shadow-[0_0_20px_rgba(255,68,68,0.2)]",
        hoverGlow: "hover:shadow-[0_0_30px_rgba(255,68,68,0.3)]",
        backgroundMuted: "bg-error/10",
        groupHoverForeground: "group-hover:text-error",
        hoverShadow: "hover:shadow-[0_0_20px_rgba(255,68,68,0.3)]",
        hoverFocusRing: "focus:ring-error/50",
        backgroundShade: "bg-error/10",
        topMenuHoverBackground: "hover:bg-error/20",
    },

    // Legacy: pink -> millerstart
    pink: {
        foreground: "text-product-millerstart",
        background: "bg-product-millerstart",
        hoverBackground: "hover:bg-product-millerstart/20",
        hoverForeground: "hover:text-product-millerstart",
        border: "border-product-millerstart/30",
        hoverBorder: "hover:border-product-millerstart",
        focusRing: "focus:ring-product-millerstart/50",
        glow: "shadow-[0_0_20px_rgba(139,123,163,0.2)]",
        hoverGlow: "hover:shadow-[0_0_30px_rgba(139,123,163,0.3)]",
        backgroundMuted: "bg-product-millerstart/10",
        groupHoverForeground: "group-hover:text-product-millerstart",
        hoverShadow: "hover:shadow-[0_0_20px_rgba(139,123,163,0.3)]",
        hoverFocusRing: "focus:ring-product-millerstart/50",
        backgroundShade: "bg-product-millerstart/10",
        topMenuHoverBackground: "hover:bg-product-millerstart/20",
    },
};

// Helper to get product color from product key
export const getProductColor = (productKey: string | undefined): ThemeColor => {
    switch (productKey) {
        case "dev-shell":
            return "devshell";
        case "local-dev-tools":
            return "localtools";
        case "miller-start":
            return "millerstart";
        case "eslint-plugin":
            return "eslint";
        default:
            return "primary";
    }
};

// Helper to get product color from internal SKU (for subscription cards)
export const getProductColorFromSku = (
    internalSku: string | undefined,
): ThemeColor => {
    if (!internalSku) return "primary";
    if (internalSku.includes("dev-shell")) return "devshell";
    if (
        internalSku.includes("local-dev-tools") ||
        internalSku.includes("local-tools")
    )
        return "localtools";
    if (internalSku.includes("miller-start")) return "millerstart";
    if (internalSku.includes("eslint")) return "eslint";
    return "primary";
};
