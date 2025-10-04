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
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { ScanEye, Eye, EyeOff } from "lucide-react";

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
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">
								Title
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Example"
									{...field}
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Description */}
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">
								Description
							</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Description of the project"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Slug */}
				<FormField
					control={form.control}
					name="slug"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">
								Slug
							</FormLabel>
							<FormControl>
								<Input
									placeholder="example"
									{...field}
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
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
				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<div className="flex justify-between">
								<FormLabel className="font-semibold">
									Image
								</FormLabel>
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
							</div>
							<FormControl>
								<Input
									ref={fileInputRef}
									type="file"
									accept="image/*"
									className="cursor-pointer"
									onChange={(e) => handleFileChange(e, field)}
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
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
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Demo */}
				<FormField
					control={form.control}
					name="demo"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="font-semibold">
								Demo
							</FormLabel>
							<FormControl>
								<Input
									placeholder="https://example.com"
									type="text"
									{...field}
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
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
