import AdminService from "@/services/api/auth";
import ProjectService from "@/services/api/projects";
import { Query, Mutation } from "@/utilities/tanstack/Query";
import type { FormSchemaProject, DeleteProject } from "@/types/form/project";

export default class ProjectQueries extends ProjectService {
    private adminService = new AdminService();

    useProjectQuery() {
        return Query("projects", () => this.getProjects());
    }

    useProjectBySlugQuery({ slug }: { slug: string }) {
        return Query("project-by-slug", () => this.getProjectBySlug(slug), slug);
    }

    usePostProject() {
        return Mutation(["projects", "project-by-slug"], (data: FormSchemaProject) => this.adminService.PostProject(data));
    }

    useDeleteProject() {
        return Mutation(["projects", "project-by-slug"], ({ id, user_id }: DeleteProject) => this.adminService.DeleteProject(id, user_id));
    }
}