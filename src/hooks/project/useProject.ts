import {
    useEffect,
    useMemo,
    useState,
    useCallback,
    useRef
} from "react";
import ProjectQueries from "@/hooks/query/useProjectQuery";
import { easeIn, easeOut } from "motion/react";
import { Projects } from "@/types/response/assets";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaFormProject } from "@/utilities/schema/form/project";
import { toast } from "sonner";
import type { FormSchemaProject } from "@/types/form/project";

export function useProject() {
    const titleSection = "Projects";
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [defaultStatus, setDefaultStatus] = useState("Default");
    const [defaultCategory, setDefaultCategory] = useState("Default");
    const [openStatus, setOpenStatus] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const dropDownData = useCallback((check: string): string[] => {
        if (check === "status") return ["Default", "Individual", "Collaboration"];
        if (check === "category") return ["Default", "Web", "Data", "Telegram", "GUI"];
        return [];
    }, []);
    const dropDownStatusRef = useRef<HTMLDivElement>(null);
    const dropDownCategoryRef = useRef<HTMLDivElement>(null);

    const projectQueries = useMemo(() => new ProjectQueries(), []);
    const { data, isLoading: isProjectLoading } = projectQueries.useProjectQuery();

    const projects: Projects = useMemo(() => {
        if (!data) return [];

        let filtered = data.projects.sort((a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

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

    const handlePreview = useCallback(() => {
        setShowPreview(!showPreview);
    }, [showPreview]);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, field: {
        onChange: (file: File | null) => void
    }) => {
        const file = e.target.files?.[0];
        if (file) {
            field.onChange(file);

            setPreviewUrl(
                URL.createObjectURL(file)
            );
        } else {
            field.onChange(null);
            setPreviewUrl(null);
        }
    }, [setPreviewUrl]);

    const handleReset = useCallback((form: {
        reset: () => void
    }) => {
        form.reset();
        setPreviewUrl(null);

        // Kosongkan input file manual
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [setPreviewUrl]);

    // 1. Define your form.
    const form = useForm<FormSchemaProject>({
        resolver: zodResolver(schemaFormProject),
        mode: "onChange",
        defaultValues: {
            title: "",
            description: "",
            slug: "",
            partner_team: [],
            partner_social_media: [],
            demo: "",
            video_url: "",
            status: "default",
            category: "default",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "partner_team",
    });

    const {
        fields: socialFields,
        append: appendSocial,
        remove: removeSocial,
    } = useFieldArray({
        control: form.control,
        name: "partner_social_media",
    });

    const { mutate, isLoading } = projectQueries.usePostProject();

    // 2. Define a submit handler.
    const onSubmit = useCallback(async (values: FormSchemaProject) => {
        console.log(values);

        const res = await mutate(values);

        if (!res) {
            console.error("Gagal mengirim data (mungkin 401 Unauthorized)");
            return;
        }

        if (res.status === 200) {
            if (isLoading) return;
            toast.success("Project berhasil ditambahkan 🎉");
            handleReset(form);
        }
    }, [form, handleReset, mutate, isLoading]);

    const { mutate: mutateDelete, isLoading: isLoadingDelete } = projectQueries.useDeleteProject();
    const handleDelete = useCallback(async (id: string, user_id: string) => {
        const deleteData = {
            id,
            user_id
        };
        // console.log(deleteData);

        const res = await mutateDelete(deleteData);

        if (!res) {
            console.error("Gagal mengirim data (mungkin 401 Unauthorized)");
            return;
        }

        if (res.status === 200) {
            if (isLoadingDelete) return;
            toast.success("Project berhasil dihapus 🎉");
        }

    }, [mutateDelete, isLoadingDelete]);

    return {
        titleSection,
        containerMotion,
        childMotion,
        projects,
        isProjectLoading,
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
        dropDownCategoryRef,
        previewUrl,
        setPreviewUrl,
        showPreview,
        handlePreview,
        handleFileChange,
        handleReset,
        fileInputRef,
        form,
        fields,
        append,
        remove,
        socialFields,
        appendSocial,
        removeSocial,
        onSubmit,
        isLoading,
        handleDelete,
    };
}