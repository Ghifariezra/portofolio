"use client";
import { motion } from "motion/react";
import { useHomeContext } from "@/app/_components/providers/home-provider";
import { Button } from "@/app/_components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export function StatusProject({ check }: { check: string }) {
	const { projectData } = useHomeContext();
    const {
		openStatus,
		openCategory,
		handleDropdownStatus,
		handleDropdownCategory,
		defaultStatus,
		defaultCategory,
		setDefaultStatus,
		setDefaultCategory,
		dropDownStatusRef,
        dropDownCategoryRef,
		dropDownData,
	} = projectData;

	const titleSection = check === "status" ? "Status Project" : "Category Project";
	const open = check === "status" ? openStatus : openCategory;
	const handleDropdown = check === "status" ? handleDropdownStatus : handleDropdownCategory;
	const defaultOpen = check === "status" ? defaultStatus : defaultCategory;
	const setDefaultOpen = check === "status" ? setDefaultStatus : setDefaultCategory;
	const dropDownRef = check === "status" ? dropDownStatusRef : dropDownCategoryRef;

    return (
		<motion.div
			ref={dropDownRef}
			className="flex-1 flex flex-col gap-2 group relative">
			<motion.p className="text-base font-semibold">
				{titleSection}
			</motion.p>

			<Button
				variant="outline"
				onClick={handleDropdown}
				className="flex items-center gap-2 w-full justify-between cursor-pointer !font-semibold">
				<motion.span>{defaultOpen}</motion.span>
				{open ? <ChevronUp /> : <ChevronDown />}
			</Button>

			{open && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					className="absolute top-full left-0 mt-2 w-full bg-background border-glassess rounded-lg shadow-md z-10 overflow-hidden !text-left">
					{
						dropDownData(check).map((item, index) => (
							<Button
								key={index}
								variant={"outline"}
								onClick={() => setDefaultOpen(item)}
								className={`w-full justify-start px-4 py-2 ${
									defaultOpen === item &&
									"bg-gray-200/30 dark:bg-slate-200/10"
								} hover:bg-gray-200/30 hover:dark:bg-slate-200/10 cursor-pointer rounded-none border-none`}>
								{item}
							</Button>
						))}
				</motion.div>
			)}
		</motion.div>
	);
}
