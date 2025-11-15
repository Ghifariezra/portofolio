import { useMemo } from "react";
import { easeIn, easeOut } from "motion/react";
import AssetsQueries from "@/hooks/query/useAssetsQuery";

export function useLogo() {
    const logoName = "Ghifari Ezra Ramadhan";
    const assetsQueries = useMemo(() => new AssetsQueries(), []);
    const { data, isLoading: isProfileLoading } = assetsQueries.useProfileQuery();

    const logo = useMemo(()=> {
        return {
            url: data?.assets.profile?.[0]?.url,
            blurDataUrl: data?.assets.profile?.[0]?.blurData 
        };
    }, [data]);

    const profile = useMemo(() => {
        return {
            url: data?.assets.profile?.[1]?.url,
            blurDataUrl: data?.assets.profile?.[1]?.blurData
        }
    }, [data]);

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
        isProfileLoading
    };
}