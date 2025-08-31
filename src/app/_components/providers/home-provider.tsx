import { createContext, useContext } from "react";
import { useAbout } from "@/hooks/about/useAbout";
import { useLogo } from "@/hooks/useLogo";
import { useProject } from "@/hooks/project/useProject";
import type { ChildrenProps } from "@/types/props/children";

type HomeContextType = ReturnType<typeof useAbout> & {
	logoData: ReturnType<typeof useLogo>;
	projectData: ReturnType<typeof useProject>;
};

const HomeContext = createContext<HomeContextType>({} as HomeContextType);

export function HomeProvider({ children }: Readonly<ChildrenProps>) {
	const aboutData = useAbout();
	const logoData = useLogo();
	const projectData = useProject();

	const value = {
		...aboutData,
		logoData,
		projectData,
	};

	return (
		<HomeContext.Provider value={value}>{children}</HomeContext.Provider>
	);
}

export const useHomeContext = () => useContext(HomeContext);
