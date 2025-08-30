"use client";

import { memo } from "react";
import { Menu } from "@/app/_components/common/menu/menu";
import ModeToggle from "@/app/_components/ui/toggle/toggle-mode";
import MenuToggle from "@/app/_components/ui/toggle/toggle-menu";
import Logo from "@/app/_components/ui/logo/logo";
import { useMenu } from "@/hooks/useMenu";
import { motion } from "motion/react";

function Navbar() {
	const {
		toggleMenu,
		menuOpen,
		toggleMotion,
		navbarMotion,
		navRef,
		scrolled,
	} = useMenu();

	return (
		<>
			<motion.nav
				ref={navRef}
				className={`flex flex-col md:flex-row gap-6 transition-all duration-500 ease-in-out ${
					scrolled
						? "py-4 px-6 glassess border-glassess"
						: `${
								menuOpen
									? "py-4 px-6 glassess border-glassess"
									: ""
						  }`
				}`}
				variants={navbarMotion}
				initial="closed"
				animate={menuOpen ? "open" : "closed"}>
				<div className="flex items-center justify-between w-full gap-6">
					<Logo />
					<ModeToggle />
					<Menu className="hidden md:flex" />
					<MenuToggle
						menuOpen={menuOpen}
						toggleMenu={toggleMenu}
						className="cursor-pointer md:hidden"
					/>
				</div>
				{menuOpen && (
					<>
						<motion.hr className="border-glassess" />
						<motion.div
							className="flex flex-col gap-4"
							variants={toggleMotion}
							initial="closed"
							animate="open"
							exit="closed">
							<Menu className="flex flex-col justify-center md:hidden" />
						</motion.div>
					</>
				)}
			</motion.nav>
		</>
	);
}

export default memo(Navbar);
