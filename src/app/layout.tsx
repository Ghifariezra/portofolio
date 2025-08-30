import { libertinusSerif } from "@/utilities/layout/fonts";
import { metaData } from "@/utilities/layout/metadata";
import { ThemeProvider } from "@/app/_components/providers/theme-provider";
import type { ChildrenProps } from "@/types/props/children";
import Layout from "@/app/_components/layout/layout";
import QueryProvider from "@/app/_components/providers/query-provider";
import "./globals.css";

export const metadata = metaData;

export default function RootLayout({ children }: Readonly<ChildrenProps>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${libertinusSerif.variable} antialiased  font-headline`}>
				<QueryProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem={false}>
						<Layout>{children}</Layout>
					</ThemeProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
