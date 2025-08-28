import { Geist_Mono, Libertinus_Serif } from "next/font/google";

const libertinusSerif = Libertinus_Serif({
    variable: "--font-libertinus-serif",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export { geistMono, libertinusSerif };