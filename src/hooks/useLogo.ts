import { useEffect, useState } from "react";
import { easeIn, easeOut } from "motion/react";
import { useProfileQuery } from "@/hooks/query/useAssetsQuery";
import { toBase64 } from "@/utilities/base64/base64";
import { Profile } from "@/types/response/assets";

export function useLogo() {
    const logoName = "Ghifari Ezra Ramadhan";
    const { data, isLoading: isProfileLoading } = useProfileQuery();

    const logo = data?.assets.profile?.[0]?.url ?? null;
    const profile = data?.assets.profile?.[1]?.url ?? null;

    // ⬇️ state untuk blur
    const [blurDataLogo, setBlurDataLogo] = useState<Profile>(null);

    useEffect(() => {
        if (!logo) return;
        toBase64(logo).then((res) => setBlurDataLogo(res));
    }, [logo]);

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