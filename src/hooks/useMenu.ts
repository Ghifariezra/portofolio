import { easeInOut, useScroll, useMotionValueEvent } from "motion/react";
import { useState, useCallback, useRef, useEffect } from "react";

export const useMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Motion Config
    const navbarMotion = {
        closed: {
            borderRadius: "40px",
            transition: { duration: 0.4, ease: easeInOut },
        },
        open: {
            borderRadius: "40px",
            transition: { duration: 0.6, ease: easeInOut },
        },
    };

    const containerMotion = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 },
        },
    };

    const itemMotion = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3, ease: easeInOut },
        },
        exit: {
            opacity: 0,
            x: 10,
            transition: { duration: 0.2, ease: easeInOut },
        },
    };

    useMotionValueEvent(scrollY, "change", (y) => {
        if (y > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    })

    const toggleMotion = {
        closed: {
            opacity: 0,
            height: 0,
            transition: { duration: 0.3, ease: easeInOut },
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: { duration: 0.5, ease: easeInOut },
        },
    };

    // Hooks
    const toggleMenu = useCallback(() => {
        setMenuOpen((prev) => !prev);
    }, []);

    const handleClickOutside = useCallback((e: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(e.target as Node)) {
            setMenuOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [handleClickOutside]);

    return {
        navbarMotion,
        containerMotion,
        itemMotion,
        toggleMotion,
        menuOpen,
        toggleMenu,
        navRef,
        scrolled,
    };
};
