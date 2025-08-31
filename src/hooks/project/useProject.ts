import {
    useEffect,
    useMemo,
    useState,
    useCallback,
    useRef
} from "react";
import { useProjectQuery } from "@/hooks/query/useAssetsQuery";
import { easeIn, easeOut } from "motion/react";
import { toBase64 } from "@/utilities/base64/base64";
import { Projects } from "@/types/response/assets";

export function useProject() {
    const titleSection = "Projects";

    const [open, setOpen] = useState(false);
    const [defaultOpen, setDefaultOpen] = useState("Default");
    const [dropDownData] = useState<string[]>([
        "Default",
        "Individual",
        "Collaboration",
    ]);
    const dropDownRef = useRef<HTMLDivElement>(null);

    const { data, isLoading: isProjectLoading } = useProjectQuery();

    const projects: Projects = useMemo(() => {
        if (!data) return [];

        const status = defaultOpen.toLowerCase();

        if (status === "default") return data.projects;

        return data.projects.filter((item) => item.status.toLowerCase() === status);
    }, [data, defaultOpen]);

    const [blurDataProjects, setBlurDataProjects] = useState<string[]>([]);

    useEffect(() => {
        let mounted = true;

        if (projects.length > 0) {
            Promise.all(projects.map((item) => toBase64(item.image))).then((res) => {
                if (mounted) setBlurDataProjects(res);
            });
        }

        return () => { mounted = false; };
    }, [projects]);

    const handleDropdown = useCallback(() => {
        setOpen(!open);
    }, [open]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []); // cukup kosong


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
        blurDataProjects,
        open,
        handleDropdown,
        defaultOpen,
        setDefaultOpen,
        dropDownRef,
        dropDownData
    };
}