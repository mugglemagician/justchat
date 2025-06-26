"use client";

import * as React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
    motion,
    MotionValue,
    animate,
    useMotionValue,
    useSpring,
    useTransform,
    HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

type MotionDivProps = HTMLMotionProps<"div">;

export type HoverStyle =
    | "default"
    | "subtle"
    | "dramatic"
    | "smooth"
    | "bouncy"
    | "elastic"
    | "quick"
    | "lazy"
    | "slide"
    | "magnetic"
    | "float"
    | "ripple"
    | "groove"
    | "wave"
    | "orbit"
    | "pulse";

const hoverPresets: Record<
    HoverStyle,
    {
        scale: number;
        distance: number;
        nudge: number;
        spring: { mass: number; stiffness: number; damping: number };
    }
> = {
    default: {
        scale: 2.25,
        distance: 110,
        nudge: 40,
        spring: {
            mass: 0.1,
            stiffness: 170,
            damping: 12,
        },
    },
    subtle: {
        scale: 1.8,
        distance: 150,
        nudge: 15,
        spring: {
            mass: 0.05,
            stiffness: 500,
            damping: 25,
        },
    },
    dramatic: {
        scale: 3.5,
        distance: 180,
        nudge: 80,
        spring: {
            mass: 0.5,
            stiffness: 200,
            damping: 3,
        },
    },
    smooth: {
        scale: 2.5,
        distance: 200,
        nudge: 60,
        spring: {
            mass: 1,
            stiffness: 80,
            damping: 30,
        },
    },
    bouncy: {
        scale: 2.8,
        distance: 140,
        nudge: 55,
        spring: {
            mass: 0.2,
            stiffness: 400,
            damping: 4,
        },
    },
    elastic: {
        scale: 2.6,
        distance: 160,
        nudge: 70,
        spring: {
            mass: 0.05,
            stiffness: 800,
            damping: 2,
        },
    },
    quick: {
        scale: 2.2,
        distance: 120,
        nudge: 45,
        spring: {
            mass: 0.02,
            stiffness: 900,
            damping: 10,
        },
    },
    lazy: {
        scale: 3,
        distance: 250,
        nudge: 100,
        spring: {
            mass: 2,
            stiffness: 50,
            damping: 40,
        },
    },
    slide: {
        scale: 1,
        distance: 200,
        nudge: 80,
        spring: {
            mass: 0.3,
            stiffness: 200,
            damping: 25,
        },
    },
    magnetic: {
        scale: 1,
        distance: 150,
        nudge: 60,
        spring: {
            mass: 0.1,
            stiffness: 500,
            damping: 15,
        },
    },
    float: {
        scale: 1,
        distance: 180,
        nudge: 50,
        spring: {
            mass: 1,
            stiffness: 50,
            damping: 20,
        },
    },
    ripple: {
        scale: 1,
        distance: 120,
        nudge: 50,
        spring: {
            mass: 0.05,
            stiffness: 500,
            damping: 8,
        },
    },
    groove: {
        scale: 1,
        distance: 100,
        nudge: 65,
        spring: {
            mass: 0.8,
            stiffness: 300,
            damping: 30,
        },
    },
    wave: {
        scale: 1,
        distance: 250,
        nudge: 70,
        spring: {
            mass: 0.4,
            stiffness: 150,
            damping: 12,
        },
    },
    orbit: {
        scale: 1,
        distance: 160,
        nudge: 90,
        spring: {
            mass: 0.2,
            stiffness: 400,
            damping: 5,
        },
    },
    pulse: {
        scale: 1,
        distance: 140,
        nudge: 50,
        spring: {
            mass: 0.15,
            stiffness: 600,
            damping: 10,
        },
    },
};

export type DockVariant =
    | "modern"
    | "glass"
    | "wooden"
    | "metallic"
    | "neon"
    | "chalk"
    | "paper"
    | "canvas"
    | "frost"
    | "sunset"
    | "ocean"
    | "forest"
    | "desert"
    | "cosmic"
    | "cyber";

const variantStyles: Record<DockVariant, string> = {
    modern:
        "bg-zinc-900/80 dark:bg-zinc-950/80 backdrop-blur-md border border-zinc-800/50 dark:border-zinc-700/50 shadow-lg",
    glass:
        "bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-2xl shadow-white/10 dark:shadow-black/10",
    wooden:
        "bg-linear-to-t from-amber-900/30 to-amber-800/20 dark:from-amber-950/30 dark:to-amber-900/20 backdrop-blur-xs border border-amber-800/30 dark:border-amber-700/30 shadow-md",
    metallic:
        "bg-linear-to-t from-slate-400/30 to-slate-300/20 dark:from-slate-600/30 dark:to-slate-500/20 backdrop-blur-lg border border-slate-300/50 dark:border-slate-400/30 shadow-lg",
    neon: "bg-black/40 backdrop-blur-xl border-2 border-fuchsia-500/50 dark:border-fuchsia-600/50 shadow-lg shadow-fuchsia-500/20 dark:shadow-fuchsia-600/20",
    chalk:
        "bg-slate-50/90 dark:bg-slate-900/90 border-2 border-dashed border-slate-300 dark:border-slate-700 shadow-xs",
    paper:
        "bg-linear-to-t from-stone-100/90 to-white/80 dark:from-stone-900/90 dark:to-stone-950/80 border border-stone-200/50 dark:border-stone-800/50",
    canvas:
        "bg-linear-to-t from-neutral-100/95 to-neutral-50/90 dark:from-neutral-900/95 dark:to-neutral-950/90 border-2 border-neutral-200/50 dark:border-neutral-800/50",
    frost:
        "bg-linear-to-t from-blue-100/30 to-blue-50/20 dark:from-blue-900/30 dark:to-blue-950/20 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/30 shadow-lg shadow-blue-500/10",
    sunset:
        "bg-linear-to-t from-orange-500/20 via-pink-500/20 to-purple-500/20 dark:from-orange-600/20 dark:via-pink-600/20 dark:to-purple-600/20 backdrop-blur-xs border border-orange-500/30 dark:border-orange-400/30",
    ocean:
        "bg-linear-to-t from-cyan-500/20 to-blue-500/20 dark:from-cyan-600/20 dark:to-blue-600/20 backdrop-blur-xs border border-cyan-500/30 dark:border-cyan-400/30",
    forest:
        "bg-linear-to-t from-green-800/20 to-emerald-600/20 dark:from-green-900/20 dark:to-emerald-800/20 backdrop-blur-xs border border-green-600/30 dark:border-green-500/30",
    desert:
        "bg-linear-to-t from-yellow-700/20 to-orange-600/20 dark:from-yellow-800/20 dark:to-orange-700/20 backdrop-blur-xs border border-yellow-600/30 dark:border-yellow-500/30",
    cosmic:
        "bg-linear-to-t from-violet-900/30 via-purple-800/20 to-fuchsia-900/30 dark:from-violet-950/30 dark:via-purple-900/20 dark:to-fuchsia-950/30 backdrop-blur-xl border border-violet-500/30 dark:border-violet-400/30 shadow-lg shadow-violet-500/20",
    cyber:
        "bg-linear-to-t from-teal-500/20 via-cyan-500/10 to-blue-500/20 dark:from-teal-600/20 dark:via-cyan-600/10 dark:to-blue-600/20 backdrop-blur-lg border border-teal-400/30 dark:border-teal-500/30 shadow-lg shadow-teal-500/20",
};

const itemVariantStyles: Record<DockVariant, string> = {
    modern:
        "bg-zinc-800/50 hover:bg-zinc-700/50 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/50",
    glass:
        "bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-lg",
    wooden:
        "bg-amber-800/20 hover:bg-amber-700/30 dark:bg-amber-900/20 dark:hover:bg-amber-800/30",
    metallic:
        "bg-slate-300/30 hover:bg-slate-200/40 dark:bg-slate-500/30 dark:hover:bg-slate-400/40",
    neon: "bg-black/40 hover:bg-black/50 border border-fuchsia-500/50 hover:border-fuchsia-400/60 dark:border-fuchsia-600/50 dark:hover:border-fuchsia-500/60",
    chalk:
        "bg-slate-200/50 hover:bg-slate-100/60 dark:bg-slate-800/50 dark:hover:bg-slate-700/60",
    paper:
        "bg-stone-100/40 hover:bg-stone-50/50 dark:bg-stone-900/40 dark:hover:bg-stone-800/50",
    canvas:
        "bg-neutral-200/40 hover:bg-neutral-100/50 dark:bg-neutral-800/40 dark:hover:bg-neutral-700/50",
    frost:
        "bg-blue-100/20 hover:bg-blue-50/30 dark:bg-blue-900/20 dark:hover:bg-blue-800/30 backdrop-blur-lg",
    sunset:
        "bg-orange-500/10 hover:bg-orange-500/20 dark:bg-orange-600/10 dark:hover:bg-orange-600/20",
    ocean:
        "bg-cyan-500/10 hover:bg-cyan-500/20 dark:bg-cyan-600/10 dark:hover:bg-cyan-600/20",
    forest:
        "bg-green-700/10 hover:bg-green-600/20 dark:bg-green-800/10 dark:hover:bg-green-700/20",
    desert:
        "bg-yellow-600/10 hover:bg-yellow-500/20 dark:bg-yellow-700/10 dark:hover:bg-yellow-600/20",
    cosmic:
        "bg-violet-800/20 hover:bg-violet-700/30 dark:bg-violet-900/20 dark:hover:bg-violet-800/30 backdrop-blur-lg",
    cyber:
        "bg-teal-500/10 hover:bg-teal-400/20 dark:bg-teal-600/10 dark:hover:bg-teal-500/20 backdrop-blur-lg",
};

const tooltipVariantStyles: Record<DockVariant, string> = {
    modern:
        "bg-zinc-900/90 border border-zinc-800/50 shadow-lg shadow-zinc-950/20 backdrop-blur-xs",
    glass:
        "bg-white/20 border border-white/30 shadow-xl shadow-white/10 backdrop-blur-xl",
    wooden:
        "bg-linear-to-t from-amber-950/90 to-amber-900/80 border border-amber-800/50 shadow-lg shadow-amber-950/30",
    metallic:
        "bg-linear-to-t from-slate-300/90 to-slate-200/80 border border-slate-200/50 shadow-lg shadow-slate-950/20 backdrop-blur-xs",
    neon: "bg-black/80 border-2 border-fuchsia-500/50 shadow-lg shadow-fuchsia-500/20 backdrop-blur-xs animate-pulse",
    chalk:
        "bg-slate-50 border-2 border-dashed border-slate-300/50 shadow-xs backdrop-blur-xs",
    paper:
        "bg-linear-to-t from-stone-100/95 to-white/90 border border-stone-200/50 shadow-lg backdrop-blur-xs",
    canvas:
        "bg-linear-to-t from-neutral-100/95 to-neutral-50/90 border-2 border-neutral-200/50 shadow-lg backdrop-blur-xs",
    frost:
        "bg-linear-to-t from-blue-100/30 to-blue-50/20 border border-blue-200/50 shadow-lg shadow-blue-500/20 backdrop-blur-xl",
    sunset:
        "bg-linear-to-r from-orange-500/90 via-pink-500/90 to-purple-500/90 border border-orange-500/30 shadow-lg shadow-orange-500/20 backdrop-blur-xs",
    ocean:
        "bg-linear-to-r from-cyan-600/90 to-blue-600/90 border border-cyan-500/30 shadow-lg shadow-cyan-500/20 backdrop-blur-xs",
    forest:
        "bg-linear-to-t from-green-900/90 to-emerald-800/90 border border-green-700/30 shadow-lg shadow-green-900/20 backdrop-blur-xs",
    desert:
        "bg-linear-to-t from-yellow-800/90 to-orange-700/90 border border-yellow-700/30 shadow-lg shadow-yellow-800/20 backdrop-blur-xs",
    cosmic:
        "bg-linear-to-r from-violet-900/90 via-purple-800/90 to-fuchsia-900/90 border border-violet-500/30 shadow-lg shadow-violet-500/20 backdrop-blur-xs",
    cyber:
        "bg-linear-to-r from-teal-500/90 via-cyan-500/90 to-blue-500/90 border border-teal-400/30 shadow-lg shadow-teal-500/20 backdrop-blur-xs",
};

const tooltipTextStyles: Record<DockVariant, string> = {
    modern: "text-white font-medium",
    glass: "text-white font-medium",
    wooden: "text-amber-50 font-medium",
    metallic: "text-slate-900 font-medium",
    neon: "text-fuchsia-300 font-bold tracking-wide",
    chalk: "text-slate-900 font-medium",
    paper: "text-stone-900 font-medium",
    canvas: "text-neutral-900 font-medium",
    frost: "text-white font-medium",
    sunset: "text-white font-medium",
    ocean: "text-white font-medium",
    forest: "text-emerald-50 font-medium",
    desert: "text-orange-50 font-medium",
    cosmic: "text-violet-100 font-medium tracking-wide",
    cyber: "text-white font-medium",
};

export interface SmartDockItemProps {
    icon: React.ReactNode;
    label?: string;
    onClick?: () => void;
}

export interface SmartDockProps extends MotionDivProps {
    items: SmartDockItemProps[];
    variant?: DockVariant;
    hoverStyle?: HoverStyle;
}

function SmartDockItem({
    mouseLeft,
    icon,
    label,
    onClick,
    variant = "modern",
    hoverConfig,
}: SmartDockItemProps & {
    mouseLeft: MotionValue;
    variant: DockVariant;
    hoverConfig: (typeof hoverPresets)[HoverStyle];
}) {
    const ref = React.useRef<HTMLButtonElement>(null);

    const distance = useTransform(() => {
        const bounds = ref.current
            ? { x: ref.current.offsetLeft, width: ref.current.offsetWidth }
            : { x: 0, width: 0 };

        return mouseLeft.get() - bounds.x - bounds.width / 2;
    });

    const scale = useTransform(
        distance,
        [-hoverConfig.distance, 0, hoverConfig.distance],
        [1, hoverConfig.scale, 1],
    );

    const x = useTransform(() => {
        const d = distance.get();
        if (d === -Infinity) {
            return 0;
        } else if (d < -hoverConfig.distance || d > hoverConfig.distance) {
            return Math.sign(d) * -1 * hoverConfig.nudge;
        } else {
            return (-d / hoverConfig.distance) * hoverConfig.nudge * scale.get();
        }
    });

    const scaleSpring = useSpring(scale, hoverConfig.spring);
    const xSpring = useSpring(x, hoverConfig.spring);
    const y = useMotionValue(0);

    return (
        <Tooltip.Provider delayDuration={0}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <motion.button
                        ref={ref}
                        style={{ x: xSpring, scale: scaleSpring, y }}
                        onClick={() => {
                            animate(y, [0, -10, 0], {
                                repeat: 2,
                                ease: [
                                    [0, 0, 0.2, 1],
                                    [0.8, 0, 1, 1],
                                ],
                                duration: 0.7,
                            });
                            onClick?.();
                        }}
                        className={cn(
                            "block aspect-square w-12 origin-bottom rounded-xl shadow-sm backdrop-blur-xs transition-colors",
                            itemVariantStyles[variant],
                        )}
                    >
                        <div className="flex size-full items-center justify-center">
                            {icon}
                        </div>
                    </motion.button>
                </Tooltip.Trigger>
                {label && (
                    <Tooltip.Portal>
                        <Tooltip.Content
                            sideOffset={10}
                            className={cn(
                                "z-50 rounded-lg px-3.5 py-2 text-sm transition-all",
                                "animate-in fade-in-0 zoom-in-95",
                                "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                                "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                                tooltipVariantStyles[variant],
                                tooltipTextStyles[variant],
                            )}
                        >
                            {label}
                        </Tooltip.Content>
                    </Tooltip.Portal>
                )}
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}

const SmartDock = React.forwardRef<HTMLDivElement, SmartDockProps>(
    (
        { className, items, variant = "modern", hoverStyle = "default", ...props },
        ref,
    ) => {
        const mouseLeft = useMotionValue(-Infinity);
        const mouseRight = useMotionValue(-Infinity);
        const hoverConfig = hoverPresets[hoverStyle];
        const left = useTransform(mouseLeft, [0, 40], [0, -40]);
        const right = useTransform(mouseRight, [0, 40], [0, -40]);
        const leftSpring = useSpring(left, hoverConfig.spring);
        const rightSpring = useSpring(right, hoverConfig.spring);

        return (
            <>
                <motion.div
                    ref={ref}
                    onMouseMove={(e) => {
                        const { left, right } = e.currentTarget.getBoundingClientRect();
                        const offsetLeft = e.clientX - left;
                        const offsetRight = right - e.clientX;
                        mouseLeft.set(offsetLeft);
                        mouseRight.set(offsetRight);
                    }}
                    onMouseLeave={() => {
                        mouseLeft.set(-Infinity);
                        mouseRight.set(-Infinity);
                    }}
                    className={cn(
                        "relative mx-auto hidden h-20 items-end gap-3 px-4 pb-3 sm:flex",
                        className,
                    )}
                    {...props}
                >
                    <motion.div
                        className={cn(
                            "absolute inset-y-0 -z-10 rounded-2xl",
                            variantStyles[variant],
                        )}
                        style={{ left: leftSpring, right: rightSpring }}
                    />

                    {items.map((item, i) => (
                        <SmartDockItem
                            key={i}
                            mouseLeft={mouseLeft}
                            variant={variant}
                            hoverConfig={hoverConfig}
                            {...item}
                        />
                    ))}
                </motion.div>

                <div className="sm:hidden">
                    <div
                        className={cn(
                            "mx-auto flex h-20 max-w-full items-end gap-4 overflow-x-scroll rounded-2xl px-4 pb-3",
                            variantStyles[variant],
                        )}
                    >
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "flex aspect-square w-12 shrink-0 items-center justify-center rounded-xl",
                                    itemVariantStyles[variant],
                                )}
                            >
                                {item.icon}
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    },
);

SmartDock.displayName = "Dock";

export { SmartDock };
