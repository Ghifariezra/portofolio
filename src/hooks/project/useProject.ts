import { useEffect, useMemo, useState } from "react";
import { useProjectQuery } from "@/hooks/query/useAssetsQuery";
import { easeIn, easeOut } from "motion/react";
import { toBase64 } from "@/utilities/base64/base64";
import { Projects } from "@/types/response/assets";

export function useProject () {
    const titleSection = "Projects";
    
    const { data, isLoading: isProjectLoading } = useProjectQuery();

    const projects: Projects = useMemo(() => {
        return data?.assets.projects ?? [];
    }, [data]);

    const [blurDataProjects, setBlurDataProjects] = useState<string[]>([]);

    useEffect(() => {
        let mounted = true;

        if (projects.length > 0) {
            Promise.all(projects.map((item) => toBase64(item.url))).then((res) => {
                if (mounted) setBlurDataProjects(res);
            });
        }

        return () => { mounted = false; };
    }, [projects]);

    const containerMotion = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const childMotion = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: easeOut
            }
        },
        exit: {
            opacity: 0,
            y: 30,
            transition: {
                duration: 1,
                ease: easeIn
            }
        },
    };


    return { 
        titleSection, 
        containerMotion, 
        childMotion,
        projects,
        isProjectLoading,
        blurDataProjects
     };
}