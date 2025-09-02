import { useState, useCallback, useMemo } from "react";
import { easeInOut } from "motion/react";
import { useSkillsQuery, useSocialQuery } from "@/hooks/query/useAssetsQuery";
import { toast } from "sonner"

export const useAbout = () => {
    const available = "Available for project";
    const location = "Jakarta, Indonesia";

    const [change, setChange] = useState(false);
    const [loadDownload, setLoadDownload] = useState(false);

    const { data: skillsData, isLoading: isSkillsLoading } = useSkillsQuery();
    const { data: socialsData, isLoading: isSocialLoading } = useSocialQuery();

    const skills = useMemo(() => skillsData?.assets?.skills ?? [], [skillsData]);
    const socials = useMemo(() => socialsData?.assets?.["social-media"] ?? [], [socialsData]);

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

    return {
        available,
        location,
        containerTitleMotion,
        changeProfile,
        change,
        isSkillsLoading,
        skills,
        isSocialLoading,
        socials,
        handleDownload,
        loadDownload,
    };
};