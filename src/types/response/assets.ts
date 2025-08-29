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

export type Profile = ProfileResponse["assets"]["profile"][0]["url"];
export type Skills = SkillsResponse["assets"]["skills"];
export type Socials = SocialsResponse["assets"]["social-media"];