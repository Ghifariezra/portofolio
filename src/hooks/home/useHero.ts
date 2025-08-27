import { easeInOut } from "motion/react";

export const useHero = () => {
    const imageMotion = {
        hidden: { scale: 0.5, opacity: 0, y: 50, x: -50 },
        visible: {
            scale: 1,
            opacity: 1,
            y: 0,
            x: 0,
            transition: { duration: 0.6, ease: easeInOut },
        },
    }

    return { imageMotion };
};