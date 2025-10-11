"use client";

import Image from "next/image";
import {
	Form,
} from "@/app/_components/ui/form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/app/_components/ui/card";
import { FieldInput } from "@/app/_components/common/form/field/input";
import { ScanEye } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Markdown } from "@/app/_components/common/markdown/markdown";
import { useHomeContext } from "@/app/_components/providers/home-provider";

export function BlogForm({
	preview,
}: {
	preview: boolean;
}) {
	const { blogsData } = useHomeContext();
	const {
		form,
		handlePreview,
		previewUrl,
		fileInputRef,
		handleFileChange,
		showPreview,
		onSubmit,
	} = blogsData;

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full h-full">
					{/* Image */}
					<FieldInput
						form={form}
						name="image"
						label="Image"
						placeholder="Image"
						type="file"
						required={true}
						handlePreview={handlePreview}
						hidePreview={true}
						showPreview={showPreview}
						fileInputRef={fileInputRef}
						handleFileChange={handleFileChange}
					/>

					{/* Preview */}
					{showPreview && (
						<div className="aspect-auto w-full border-dashed border-2 rounded-2xl flex items-center justify-center overflow-hidden">
							{previewUrl ? (
								<div className="relative w-full h-full">
									<Image
										src={previewUrl}
										alt="Preview"
										width={500}
										height={500}
										className="w-full h-full object-cover"
									/>
								</div>
							) : (
								<div className="relative flex flex-col items-center justify-center gap-4">
									<ScanEye size={128} strokeWidth={2} />
									<p className="font-semibold">Image Preview</p>
								</div>
							)}
						</div>
					)}

					<FieldInput
						form={form}
						name="title"
						label="Title"
						placeholder="Example"
						required={true}
					/>

					<FieldInput
						form={form}
						name="description"
						label="Description"
						placeholder="Description of the blog"
						type="textarea"
						required={true}
					/>

					{/* Slug */}
					<FieldInput
						form={form}
						name="slug"
						label="Slug"
						placeholder="example"
						required={true}
					/>

					<FieldInput
						form={form}
						name="language"
						label="Language"
						placeholder="python"
						required={true}
					/>

					<FieldInput
						form={form}
						name="content"
						label="Content (Markdown)"
						placeholder="# Content"
						type="textarea"
						required={true}
					/>

					<div className="flex justify-end">
						<Button
							type="submit"
							disabled={!form.formState.isValid}
							className="cursor-pointer"
						>
							Submit
						</Button>
					</div>
				</form>
			</Form>

			{preview && (
				<div className="flex max-w-2xl w-full">
					<Card className="w-full">
						<CardHeader>
							<CardTitle>
								{form.watch("title") || "Blog Title"}
							</CardTitle>
							<CardDescription>
								<CardDescription>
									{form.watch("description") || "Blog Description"}
								</CardDescription>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Markdown
								content={form.watch("content") || "Blog Content"}
							/>
						</CardContent>
						{/* <CardFooter>
							<p>Card Footer</p>
						</CardFooter> */}
					</Card>
				</div>
			)}
		</>
	);
}
