'use client';

import { useState, useCallback } from "react";
import { ProjectForm } from "@/app/_components/common/form/project";
import { BlogForm } from "@/app/_components/common/form/blog";
import { Button } from "@/app/_components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export function FormDashboard() {
    const [preview, setPreview] = useState(false);
    const [postChange, setPostChange] = useState(false);

    const togglePreview = useCallback(() => {
        setPreview(!preview);
    }, [preview]);

    const handlePostChange = useCallback(() => {
        setPostChange(!postChange);
    }, [postChange]);

    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                    {postChange ? "Post Blog" : "Post Project"}
                </h2>
                <div className="flex gap-4">
                    <Button
                        onClick={handlePostChange}
                        variant="secondary"
                        className="w-fit font-semibold cursor-pointer"
                    >
                        {postChange ? "Form Project" : "Form Blog"}
                    </Button>
                    {postChange && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="font-semibold cursor-pointer"
                            onClick={togglePreview}
                        >
                            {preview ? (
                                <>
                                    <EyeOff className="size-4" />
                                    Hide
                                </>
                            ) : (
                                <>
                                    <Eye className="size-4" />
                                    Preview
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>
            {
                postChange ? (
                    <div className="flex flex-wrap sm:flex-nowrap gap-4">
                        <BlogForm preview={preview}/>
                    </div>
                ) : (
                    <ProjectForm />
                )
            }
        </>
    );
}
