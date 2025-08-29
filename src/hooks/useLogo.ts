import { useState, useEffect } from "react";
import { easeIn, easeOut } from "motion/react";
import { useProfileMutation } from "@/hooks/mutations/useAssetsMutation";
import { toBase64 } from "@/utilities/base64/base64";
import type { Profile } from "@/types/response/assets";

export function useLogo() {
    const logoName = "Ghifari Ezra Ramadhan";
    const { mutate, isLoading: isProfileLoading } = useProfileMutation();
    const [logo, setLogo] = useState<Profile | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [blurDataLogo, setBlurDataURL] = useState<string | null>(null);

    useEffect(() => {
        mutate(undefined, {
            onSuccess: (res) => {
                setLogo(res.assets.profile[0].url);
                setProfile(res.assets.profile[1].url);

                // generate blur data URL
                const logoBase64 = toBase64(res.assets.profile[0].url);
                logoBase64.then((base64) => setBlurDataURL(base64));
            },
            onError: (error) => {
                console.log(error);
            },
        });
    }, [mutate]);

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

    return {
        containerMotion,
        nameMotion,
        logoName,
        imageMotion,
        logo,
        profile,
        blurDataLogo,
        isProfileLoading
    };
}