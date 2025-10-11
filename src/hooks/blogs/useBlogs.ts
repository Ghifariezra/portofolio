import { useState, useCallback, useRef } from "react";
import {
    useBlogsQuery
} from "@/hooks/query/useBlogsQuery";
import { usePostBlog } from "@/hooks/mutation/blogs/useBlogsMutation";
import { easeIn, easeOut } from "motion/react";
import { schemaFormBlog } from "@/utilities/schema/form/blogs";
import type { FormSchemaBlog } from "@/types/form/blogs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export const useBlogs = () => {
    const [showPreview, setShowPreview] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // 1. Define your form.
    const form = useForm<FormSchemaBlog>({
        resolver: zodResolver(schemaFormBlog),
        defaultValues: {
            title: "",
            description: "",
            slug: "",
            language: "",
            content: "",
        },
        mode: "onChange",
    });

    const {
        data: blogs,
        isLoading: isLoadingBlogs,
    } = useBlogsQuery();

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

    const { mutate, isLoading } = usePostBlog();
    const onSubmit = useCallback(async (values: FormSchemaBlog) => {
        // console.log(values);

        const res = await mutate(values);

        if (!res) {
            console.error("Gagal mengirim data (mungkin 401 Unauthorized)");
            return;
        }

        if (res.status === 200) {
            if (isLoading) return;
            toast.success("Blog berhasil ditambahkan 🎉");
            handleReset(form);
        }
    }, [form, handleReset, mutate, isLoading]);

    return {
        blogs,
        isLoadingBlogs,
        containerMotion,
        childMotion,
        handlePreview,
        showPreview,
        handleReset,
        handleFileChange,
        previewUrl,
        fileInputRef,
        form,
        onSubmit
    };
};