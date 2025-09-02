import "./globals.css";
import { libertinusSerif } from "@/utilities/layout/fonts";
import { metaNotFound } from "@/utilities/layout/metadata";
import Image from "next/image";
import Link from "next/link";

export const metadata = metaNotFound;

export default function GlobalNotFound() {
	return (
		<html lang="en">
			<body
				className={`${libertinusSerif.variable} antialiased font-headline tracking-tight min-h-screen flex flex-col items-center justify-center px-8`}>
					{/* Image with fun animation */}
					<div className="aspect-square relative">
						<Image
							src="https://cdn1.iconfinder.com/data/icons/programming-92/512/Error_404.png"
							width={300}
							height={300}
							priority
							alt="404 Not Found"
							className="bg-cover w-full h-full drop-shadow-lg"
						/>
					</div>

					{/* Title */}
					<h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mt-6">
						Oops! Lost in Space 🚀
					</h1>

					{/* Subtitle */}
					<p className="text-lg text-gray-700 mt-3 text-center max-w-md">
						The page you’re looking for doesn’t exist. But don’t
						worry, let’s get you back home!
					</p>

					{/* Button back home */}
					<div className="mt-6">
						<Link
							href="/"
							className="px-6 py-3 rounded-full bg-purple-600 text-white font-semibold shadow-md hover:shadow-xl hover:bg-purple-700 transition">
							🏡 Go Back Home
						</Link>
					</div>
			</body>
		</html>
	);
}
