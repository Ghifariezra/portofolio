"use client";

import Image from "next/image";
import { useHomeContext } from "@/app/_components/providers/home-provider";

import { Button } from "@/app/_components/ui/button";
import {
	Form,
	FormControl,
	// FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/app/_components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/app/_components/ui/select";
import { FieldInput } from "@/app/_components/common/form/field/input";
import { ScanEye } from "lucide-react";
import { Input } from "@/app/_components/ui/input";

export function ProjectForm() {
	const { projectData } = useHomeContext();
	const {
		previewUrl,
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
        isLoading
	} = projectData;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{/* Title */}
				<FieldInput
					form={form}
					name="title"
					label="Title"
					placeholder="Example"
					required={true}
				/>

				{/* Description */}
				<FieldInput
					form={form}
					name="description"
					label="Description"
					placeholder="Description of the project"
					type="textarea"
				/>
				
				{/* Slug */}
				<FieldInput
					form={form}
					name="slug"
					label="Slug"
					placeholder="example"
					required={true}
				/>

				{/* Partner Team & Social Media */}
				<div className="flex flex-wrap sm:flex-nowrap gap-4 w-full">
					<div className="w-full">
						<FormLabel className="font-semibold">
							Partner Team
						</FormLabel>
						{fields.map((item, index) => (
							<FormField
								key={item.id}
								control={form.control}
								name={`partner_team.${index}.name`}
								render={({ field }) => (
									<FormItem className="flex items-center gap-2 w-full mt-2">
										<FormControl>
											<Input
												placeholder="John Doe"
												{...field}
											/>
										</FormControl>
										<Button
											type="button"
											variant="destructive"
											onClick={() => remove(index)}
											className="cursor-pointer">
											Remove
										</Button>
									</FormItem>
								)}
							/>
						))}
						<Button
							type="button"
							variant="outline"
							onClick={() =>
								append({
									name: "",
								})
							}
							className="mt-2 w-full cursor-pointer">
							Add Partner
						</Button>
					</div>

					<div className="w-full">
						<FormLabel className="font-semibold">
							Partner Social Media
						</FormLabel>
						{socialFields.map((item, index) => (
							<FormField
								key={item.id}
								control={form.control}
								name={`partner_social_media.${index}.url`}
								render={({ field }) => (
									<FormItem className="flex items-center gap-2 w-full mt-2">
										<FormControl>
											<Input
												placeholder="https://twitter.com/johndoe"
												{...field}
											/>
										</FormControl>
										<Button
											type="button"
											variant="destructive"
											onClick={() => removeSocial(index)}
											className="cursor-pointer">
											Remove
										</Button>
									</FormItem>
								)}
							/>
						))}

						<Button
							type="button"
							variant="outline"
							onClick={() =>
								appendSocial({
									url: "",
								})
							}
							className="mt-2 w-full cursor-pointer">
							Add Social Media
						</Button>
					</div>
				</div>

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

				{/* Status & Category */}
				<div className="flex gap-4">
					{/* Status */}
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel className="font-semibold">
									Status
								</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										value={field.value}>
										<SelectTrigger className="w-full cursor-pointer">
											<SelectValue placeholder="Select a status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="default">
												Default
											</SelectItem>
											<SelectItem value="individual">
												Individual
											</SelectItem>
											<SelectItem value="collaboration">
												Collaboration
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Category */}
					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel className="font-semibold">
									Category
								</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										value={field.value}>
										<SelectTrigger className="w-full cursor-pointer">
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="default">
												Default
											</SelectItem>
											<SelectItem value="web">
												Web
											</SelectItem>
											<SelectItem value="data">
												Data
											</SelectItem>
											<SelectItem value="ui/ux">
												UI/UX
											</SelectItem>
											<SelectItem value="telegram">
												Telegram
											</SelectItem>
											<SelectItem value="gui">
												GUI
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Demo */}
				<FieldInput
					form={form}
					name="demo"
					label="Demo"
					placeholder="https://example.com"
					required={true}
				/>
				
				<div className="flex gap-4 justify-end mt-8">
					<div className="relative max-w-3xs w-full">
						<Button
							type="button"
							onClick={() => handleReset(form)}
							className="cursor-pointer font-bold bg-red-500 hover:bg-red-600 text-white w-full">
							Reset
						</Button>
					</div>
					<div className="relative max-w-3xs w-full">
						<Button
							type="submit"
							disabled={
								!form.formState.isValid ||
								form.formState.isSubmitting ||
								isLoading
							}
							className="cursor-pointer font-bold bg-blue-500 hover:bg-blue-600 text-white w-full">
							{isLoading ? "Loading..." : "Submit"}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
