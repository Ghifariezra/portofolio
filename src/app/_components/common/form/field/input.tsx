import { FieldValues, UseFormReturn, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { Eye, EyeOff } from "lucide-react";

export function FieldInput<T extends FieldValues>({
    form,
    name,
    label,
    placeholder,
    type = "text",
    required = false,
    handlePreview,
    hidePreview = false,
    showPreview,
    fileInputRef,
    handleFileChange
}: {
    form: UseFormReturn<T>;
    name: Path<T>;
    label: string;
    placeholder: string;
    type?: string;
    required?: boolean;
    handlePreview?: () => void;
    hidePreview?: boolean;
    showPreview?: boolean;
    fileInputRef?: React.RefObject<HTMLInputElement | null>;
    handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>, field: { onChange: (file: File | null) => void }) => void

}) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {
                        type === "file" ? (
                            <div className="flex justify-between">
                                <FormLabel className="font-semibold">
                                    {label}
                                </FormLabel>
                                {hidePreview && (
                                    <div
                                        className="flex gap-2 items-center cursor-pointer hover:underline"
                                        onClick={handlePreview}>
                                        {showPreview ? (
                                            <>
                                                <EyeOff size={16} />
                                                <p className="text-sm">
                                                    Hide preview
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <Eye size={16} />
                                                <p className="text-sm">
                                                    Show preview
                                                </p>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <FormLabel className="font-semibold">
                                {label}
                            </FormLabel>
                        )
                    }
                    <FormControl>
                        {
                            type === "textarea" ? (
                                <Textarea
                                    placeholder={placeholder}
                                    {...field}
                                    required={required}
                                />
                            ) : type === "file" ? (
                                <Input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="cursor-pointer"
                                    onChange={(e) => handleFileChange?.(e, field)}
                                    required
                                />
                            ) : (
                                <Input
                                    type={type}
                                    placeholder={placeholder}
                                    {...field}
                                    required={required}
                                />
                            )
                        }
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}