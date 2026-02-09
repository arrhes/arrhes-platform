import { css } from "@arrhes/ui/utilities/cn.js"


export function HeroIllustration() {
    return (
        <svg
            viewBox="0 0 200 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={css({
                width: "100%",
                height: "auto",
            })}
        >
            {/* Background card */}
            <rect x="20" y="20" width="160" height="120" rx="8" className={css({ fill: "transparent", stroke: "neutral/10" })} strokeWidth="1" />

            {/* Header bar */}
            <rect x="20" y="20" width="160" height="24" rx="8" className={css({ fill: "white", stroke: "neutral/10" })} strokeWidth="1" />
            <circle cx="36" cy="32" r="4" className={css({ fill: "primary" })} />
            <rect x="48" y="29" width="40" height="6" rx="2" className={css({ fill: "neutral/10" })} />

            {/* Chart bars */}
            <rect x="36" y="100" width="20" height="28" rx="2" className={css({ fill: "primary/20", stroke: "primary" })} strokeWidth="1" />
            <rect x="64" y="80" width="20" height="48" rx="2" className={css({ fill: "primary/40", stroke: "primary" })} strokeWidth="1" />
            <rect x="92" y="68" width="20" height="60" rx="2" className={css({ fill: "primary/60", stroke: "primary" })} strokeWidth="1" />
            <rect x="120" y="56" width="20" height="72" rx="2" className={css({ fill: "primary/80", stroke: "primary" })} strokeWidth="1" />
            <rect x="148" y="76" width="20" height="52" rx="2" className={css({ fill: "primary", stroke: "primary" })} strokeWidth="1" />

            {/* Trend line */}
            <path d="M46 86 L74 66 L102 54 L130 42 L158 58" className={css({ stroke: "primary" })} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            {/* Dots on trend line */}
            <circle cx="46" cy="86" r="3" className={css({ fill: "white", stroke: "primary" })} strokeWidth="2" />
            <circle cx="74" cy="66" r="3" className={css({ fill: "white", stroke: "primary" })} strokeWidth="2" />
            <circle cx="102" cy="54" r="3" className={css({ fill: "white", stroke: "primary" })} strokeWidth="2" />
            <circle cx="130" cy="42" r="3" className={css({ fill: "primary", stroke: "primary" })} strokeWidth="2" />
            <circle cx="158" cy="58" r="3" className={css({ fill: "white", stroke: "primary" })} strokeWidth="2" />
        </svg>
    )
}