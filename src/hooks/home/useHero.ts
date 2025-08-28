import { easeInOut, useScroll, useTransform } from "motion/react";

export const useHero = () => {
    const { scrollY } = useScroll();

    const containerMotion = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 1, delayChildren: 0.5, ease: easeInOut },
        },
    }

    const quoteMotion = {
        hidden: { opacity: 0, y: -100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: easeInOut },
        },
    }

    const quoteTransform = {
        opacity: useTransform(scrollY, [0, 500], [1, 0]),
        y: useTransform(scrollY, [0, 500], [0, -100]),
    }

    return { containerMotion, quoteMotion, quoteTransform };
};