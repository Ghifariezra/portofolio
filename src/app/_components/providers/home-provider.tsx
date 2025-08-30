import { createContext, useContext } from "react";
import { useAbout } from "@/hooks/about/useAbout";
import { useLogo } from "@/hooks/useLogo";
import type { ChildrenProps } from "@/types/props/children";

type HomeContextType = ReturnType<typeof useAbout> & {
	logoData: ReturnType<typeof useLogo>;
};

const HomeContext = createContext<HomeContextType>({} as HomeContextType);

export function HomeProvider({ children }: Readonly<ChildrenProps>) {
	const aboutData = useAbout();
	const logoData = useLogo();

	const value = {
		...aboutData,
		logoData,
	};

	return (
		<HomeContext.Provider value={value}>{children}</HomeContext.Provider>
	);
}

export const useHomeContext = () => useContext(HomeContext);
