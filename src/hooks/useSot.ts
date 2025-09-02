import { useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

export function useSot() {
    const [onScroll, setOnScroll] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 100) setOnScroll(true);
        else setOnScroll(false);
    });

    return { onScroll };
}