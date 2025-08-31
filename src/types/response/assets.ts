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
    assets: {
        projects: Array<{ 
            name: string,
            url: string
         }>;
    };
};

export type Profile = ProfileResponse["assets"]["profile"][0]["url"] | null;
export type Skills = SkillsResponse["assets"]["skills"];
export type Projects = ProjectResponse["assets"]["projects"];
export type Socials = SocialsResponse["assets"]["social-media"];
export type csrfToken = string | null;