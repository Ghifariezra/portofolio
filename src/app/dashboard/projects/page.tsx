'use client'
import { useHomeContext } from "@/app/_components/providers/home-provider";

export default function ListProjects() {
    const { projectData } = useHomeContext();
    const { projects, isProjectLoading } = projectData;

    return (
        <div className="flex flex-col gap-8 min-h-screen pt-28 pb-6 px-6">
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Projects</h1>
                <ul>
                    {isProjectLoading ? (
                        <li>Loading...</li>
                    ) : !isProjectLoading && projects.length > 0 ? (
                        projects.map((project, index) => (
                            <li key={index}>{project.title}</li>
                        ))
                    ) : (
                        <li>No projects found</li>
                    )}
                </ul>
            </div>
        </div>
    );
}