import { SpeedInsights } from "@vercel/speed-insights/next";
import { libertinusSerif } from "@/utilities/layout/fonts";
import { metaHome } from "@/utilities/layout/metadata";
import { ThemeProvider } from "@/app/_components/providers/theme-provider";
import Layout from "@/app/_components/layout/layout";
import QueryProvider from "@/app/_components/providers/query-provider";
import type { ChildrenProps } from "@/types/props/children";
import "./globals.css";

export const metadata = async () => metaHome();

export default function RootLayout({ children }: Readonly<ChildrenProps>) {
	return (
		<html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
			<body
				className={`${libertinusSerif.variable} antialiased font-headline tracking-tight`}>
				<QueryProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem={false}>
						<Layout>{children}</Layout>
					</ThemeProvider>
				</QueryProvider>
				<SpeedInsights />
			</body>
		</html>
	);
}
