import { useState, useCallback, useEffect } from "react";
import { easeInOut } from "motion/react";
import { useSkillsMutation, useSocialMutation } from "@/hooks/mutations/useAssetsMutation";
import type { Skills, Socials } from "@/types/response/assets";
import { toBase64 } from "@/utilities/base64/base64";

export const useAbout = () => {
    const available = "Available for project";
    const location = "Jakarta, Indonesia";
    const { mutate: mutateSkills, isLoading: isSkillsLoading } = useSkillsMutation();
    const { mutate: mutateSocial, isLoading: isSocialLoading } = useSocialMutation();
    const [change, setChange] = useState(false);
    const [skills, setSkills] = useState<Skills>([]);
    const [socials, setSocial] = useState<Socials>([]);
    const [blurDataSkills, setBlurDataSkills] = useState<string[]>([]);
    const [blurDataSocial, setBlurDataSocial] = useState<string[]>([]);

    useEffect(() => {
        mutateSkills(undefined, {
            onSuccess: (res) => {
                setSkills(res.assets.skills);
            },
            onError: (error) => {
                console.log(error);
            },
        });
        mutateSocial(undefined, {
            onSuccess: (res) => {
                setSocial(res.assets["social-media"]);
            },
            onError: (error) => {
                console.log(error);
            },
        });
    }, [mutateSkills, mutateSocial]);

    useEffect(() => {
        if (skills.length > 0 && socials.length > 0) {
            const skillsPromises = skills.map((item) => toBase64(item.url));
            const socialsPromises = socials.map((item) => toBase64(item.url));

            Promise.all(skillsPromises).then((data) => setBlurDataSkills(data));
            Promise.all(socialsPromises).then((data) => setBlurDataSocial(data));
        }
    }, [skills, socials]);

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
            y: 50,
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
        hidden: { y: 60, opacity: 0 },
        inView: {
            y: 0, opacity: 1, transition: {
                duration: 0.7,
                ease: easeInOut,
            }
        },
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
            transition: { duration: 0.5, ease: easeInOut },
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
        hidden: { opacity: 0, y: 20 },
        inView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeInOut } },
        hover: { scale: 1.1, rotate: 10, transition: { duration: 0.3 } }
    };


    const socialMotion = {
        hidden: { opacity: 0, y: 20 },
        inView: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hover: { scale: 1.2, rotate: 10, transition: { duration: 0.3 } }
    };


    const changeProfile = useCallback(() => {
        setChange(!change);
    }, [change, setChange]);

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
        socialMotion
    };
};