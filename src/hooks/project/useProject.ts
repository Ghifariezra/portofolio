import { motion } from "motion/react";


export function useProject () {
    const titleSection = "Projects";

    const containerMotion = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    return { titleSection, containerMotion };
}