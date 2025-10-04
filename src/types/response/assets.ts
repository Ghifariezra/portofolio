export type AssetItem = {
    url: string;
    blurData: string;
    name?: string;
};

type ProjectItem = {
    user_id: string;
    uuid: string;
    title: string;
    category: string;
    description: string;
    slug: string;
    partner_team: string[];
    partner_social_media: string[];
    image: string;
    imageUrl: string;
    blurData: string;
    demo: string;
    status: "individual" | "collaboration" | "default";
    created_at: string;
    updated_at: string;
}

type AssetResponse<K extends string> = {
    assets: {
        [key in K]: Array<AssetItem>;
    };
};

type DefaultProjectResponse<K extends string> = {
    [key in K]: Array<ProjectItem>;
};

export type ProfileResponse = AssetResponse<"profile">;
export type SkillsResponse = AssetResponse<"skills">;
export type SocialsResponse = AssetResponse<"social-media">;
export type CertificatesResponse = AssetResponse<"certificates">;

export type ProjectResponse = DefaultProjectResponse<"projects">;
export type Projects = ProjectResponse["projects"];
export type ProjectBySlugResponse = ProjectResponse["projects"][0];

export type csrfToken = string | null;