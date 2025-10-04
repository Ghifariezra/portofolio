import { Summary } from "@/app/_components/common/cards/summary";
import { ProjectForm } from "@/app/_components/common/form/project";
// import { BlogForm } from "@/app/_components/common/form/blog";

export default function Dashboard() {
	return (
		<div className="flex flex-col gap-8 min-h-screen pt-28 pb-6 px-6">
			<div className="flex flex-col gap-4">
				<h1 className="text-2xl font-bold">Summary</h1>
				<Summary />
			</div>
			<div className="flex flex-col gap-4">
				<h2 className="text-2xl font-bold">Post</h2>
				<ProjectForm />
			</div>
		</div>
	);
}
