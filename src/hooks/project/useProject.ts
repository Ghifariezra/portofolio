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

    const [defaultStatus, setDefaultStatus] = useState("Default");
    const [defaultCategory, setDefaultCategory] = useState("Default");
    const [openStatus, setOpenStatus] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const dropDownData = useCallback((check: string): string[] => {
        if (check === "status") return ["Default", "Individual", "Collaboration"];
        if (check === "category") return ["Default", "Web", "Data"];
        return [];
    }, []);
    const dropDownStatusRef = useRef<HTMLDivElement>(null);
    const dropDownCategoryRef = useRef<HTMLDivElement>(null);


    const { data, isLoading: isProjectLoading } = useProjectQuery();

    const projects: Projects = useMemo(() => {
        if (!data) return [];

        let filtered = data.projects;

        if (defaultStatus.toLowerCase() !== "default") {
            filtered = filtered.filter(
                (item) => item.status.toLowerCase() === defaultStatus.toLowerCase()
            );
        }

        if (defaultCategory.toLowerCase() !== "default") {
            filtered = filtered.filter(
                (item) => item.category.toLowerCase() === defaultCategory.toLowerCase()
            );
        }

        return filtered;
    }, [data, defaultStatus, defaultCategory]);


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

    const handleDropdownStatus = useCallback(() => {
        setOpenStatus(!openStatus);
    }, [openStatus]);
    const handleDropdownCategory = useCallback(() => {
        setOpenCategory(!openCategory);
    }, [openCategory]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                dropDownStatusRef.current &&
                !dropDownStatusRef.current.contains(e.target as Node)
            ) {
                setOpenStatus(false);
            }
            if (
                dropDownCategoryRef.current &&
                !dropDownCategoryRef.current.contains(e.target as Node)
            ) {
                setOpenCategory(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);


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
        openStatus,
        openCategory,
        handleDropdownStatus,
        handleDropdownCategory,
        defaultStatus,
        defaultCategory,
        setDefaultStatus,
        setDefaultCategory,
        dropDownData,
        dropDownStatusRef,
        dropDownCategoryRef
    };
}