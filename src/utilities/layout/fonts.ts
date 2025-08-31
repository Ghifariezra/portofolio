import { Libertinus_Serif } from "next/font/google";

const libertinusSerif = Libertinus_Serif({
    variable: "--font-libertinus-serif",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

export { libertinusSerif };