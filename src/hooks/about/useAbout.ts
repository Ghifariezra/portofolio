import { easeInOut } from "motion/react";

export const useAbout = () => {

    const containerMotion = {
        hidden: {},
        inView: {
            transition: {
                staggerChildren: 0.15, // lebih natural
            },
        },
    };

    const imageContainerMotion = {
        hidden: {
            y: 80,
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: easeInOut,
            }
        },
        inView: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1,
                staggerChildren: 0.2,
            },
        }
    }

    const imageMotion = {
        hidden: { y: 80, opacity: 0 },
        inView: { y: 0, opacity: 1, transition: { duration: 0.7, ease: easeInOut } },
    };


    const containerTitleMotion = {
        hidden: {},
        inView: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const childMotion = {
        hidden: { opacity: 0, y: 50 },
        inView: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: easeInOut }
        },
    };



    return { imageMotion, containerTitleMotion, childMotion, imageContainerMotion, containerMotion };
};