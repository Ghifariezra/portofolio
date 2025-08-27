import { geistMono } from "@/utilities/layout/fonts";
import { metaData } from "@/utilities/layout/metadata";
import { ThemeProvider } from "@/app/components/providers/theme-provider";
import Header from "@/app/components/templates/header";
import type { ChildrenProps } from "@/types/props/children";
import QueryProvider from "@/app/components/providers/query-provider";
import "./globals.css";

export const metadata = metaData;

export default function RootLayout({ children }: Readonly<ChildrenProps>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistMono.variable} antialiased font-main`}>
				<QueryProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem={false}>
						<Header />
						{children}
					</ThemeProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
