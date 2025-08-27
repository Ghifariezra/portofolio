import { easeIn, easeOut } from "motion/react";

export function useLogo() {
    const logoName = "Ghifari Ezra Ramadhan";

    // Motion Config
    const containerMotion = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const nameMotion = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: easeOut
            }
        },
        exit: {
            opacity: 0,
            y: 10,
            transition: {
                duration: 0.2,
                ease: easeIn
            }
        },
    };

    const imageMotion = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                ease: easeOut
            }
        },
        exit: {
            opacity: 0,
            x: 10,
            transition: {
                duration: 0.2,
                ease: easeIn
            }
        },
    };

    return { containerMotion, nameMotion, logoName, imageMotion };
}