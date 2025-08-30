import { useState, useCallback, useEffect, useMemo } from "react";
import { easeInOut } from "motion/react";
import { useSkillsQuery, useSocialQuery } from "@/hooks/query/useAssetsQuery";
import { toBase64 } from "@/utilities/base64/base64";
import { Skills, Socials } from "@/types/response/assets";
import { toast } from "sonner"

export const useAbout = () => {
    const available = "Available for project";
    const location = "Jakarta, Indonesia";

    const [change, setChange] = useState(false);
    const [loadDownload, setLoadDownload] = useState(false);

    const { data: skillsData, isLoading: isSkillsLoading } = useSkillsQuery();
    const { data: socialsData, isLoading: isSocialLoading } = useSocialQuery();

    const skills: Skills = useMemo(() => skillsData?.assets?.skills ?? [], [skillsData]);
    const socials: Socials = useMemo(() => socialsData?.assets?.["social-media"] ?? [], [socialsData]);

    const [blurDataSkills, setBlurDataSkills] = useState<string[]>([]);
    const [blurDataSocial, setBlurDataSocial] = useState<string[]>([]);

    useEffect(() => {
        let mounted = true;
        if (skills.length > 0) {
            Promise.all(skills.map((item) => toBase64(item.url))).then((res) => {
                if (mounted) setBlurDataSkills(res);
            });
        }
        return () => { mounted = false; };
    }, [skills]);

    useEffect(() => {
        let mounted = true;
        if (socials.length > 0) {
            Promise.all(socials.map((item) => toBase64(item.url))).then((res) => {
                if (mounted) setBlurDataSocial(res);
            });
        }
        return () => { mounted = false; };
    }, [socials]);


    const changeProfile = useCallback(() => {
        setChange((prev) => !prev);
    }, []);

    const handleDownload = useCallback((cv: string) => {
        setLoadDownload((prev) => !prev);

        const link = document.createElement("a");
        link.href = cv;
        link.download = "My_CV.pdf";
        link.click();
        link.remove();

        setTimeout(() => {
            setLoadDownload((prev) => !prev);
            toast.success("CV berhasil dibuka 🎉");
        }, 3000);
    }, []);

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
            y: 30,
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
        hidden: { y: -60, opacity: 0 },
        inView: {
            y: 0, opacity: 1, transition: {
                duration: 0.7,
                ease: easeInOut,
            }
        },
    };


    const containerTitleMotion = {
        hidden: {
            y: -30,
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
    };

    const childMotion = {
        hidden: { y: -50, opacity: 0 },
        inView: {
            y: 0, opacity: 1, transition: {
                duration: 0.7,
                ease: easeInOut,
            }
        },
    };

    const replaceMotion = {
        initial: { opacity: 1, rotate: -90 },
        hover: {
            scale: 0.95,
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: easeInOut },
        },
        tap: {
            scale: 0.90,
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: easeInOut }
        }
    }

    const skillsMotion = {
        hidden: { opacity: 0, y: -20 },
        inView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeInOut } },
        hover: { scale: 1.1, rotate: 10, transition: { duration: 0.3 } }
    };


    const socialMotion = {
        hidden: { opacity: 0, y: -20 },
        inView: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hover: { scale: 1.2, rotate: 10, transition: { duration: 0.3 } }
    };

    const downloadContainerMotion = {
        hidden: { opacity: 0, y: -30 },
        inView: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: easeInOut,
                staggerChildren: 0.2,
            },
        },
    };


    return {
        available,
        location,
        imageMotion,
        containerTitleMotion,
        childMotion, imageContainerMotion,
        containerMotion,
        replaceMotion,
        changeProfile,
        change,
        isSkillsLoading,
        blurDataSkills,
        skills,
        skillsMotion,
        isSocialLoading,
        blurDataSocial,
        socials,
        socialMotion,
        handleDownload,
        loadDownload,
        downloadContainerMotion
    };
};