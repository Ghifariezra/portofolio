"use client";
import { memo } from "react";

export default function Footer() {
	return (
		<footer className="flex items-center w-full p-6 border-glassess justify-between">
			<span className="text-sm max-w-sm">
				Building responsive and scalable web applications.
			</span>
			<p className="text-sm font-semibold max-w-sm">
				© 2025 Ghifari Ezra Ramadhan
			</p>
		</footer>
	);
}

export const FooterMemo = memo(Footer);