export type ProfileResponse = {
    assets: {
        profile: Array<{ url: string }>;
    };
};
export type SkillsResponse = {
    assets: {
        skills: Array<{
            name: string,
            url: string
        }>;
    };
};

export type SocialsResponse = {
    assets: {
        "social-media": Array<{
            name: string,
            url: string
        }>;
    };
};

export type ProjectResponse = {
    projects: Array<{
        uuid: string;
        title: string;
        category: string;
        description: string;
        slug: string;
        partner_team: string[];
        partner_social_media: string[];
        image: string;
        demo: string;
        status: "individual" | "collaboration" | "default";
        created_at: string;
        updated_at: string;
    }>;
};


export type Profile = ProfileResponse["assets"]["profile"][0]["url"] | null;
export type Skills = SkillsResponse["assets"]["skills"];
export type Projects = ProjectResponse["projects"];
export type Socials = SocialsResponse["assets"]["social-media"];
export type csrfToken = string | null;