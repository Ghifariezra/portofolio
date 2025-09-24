"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useCertificates } from "@/hooks/useCertificates";
import {
	EmptySkeleton,
	ErrorSkeleton,
	LoadingSkeleton,
} from "@/app/_components/common/skeleton/certificates";
import { memo } from "react";

function Certificates() {
	const { data, isLoading, isError, currentIndex } = useCertificates();

	if (isLoading) return LoadingSkeleton();
	if (isError) return ErrorSkeleton();
	if (!data || !data.assets?.certificates?.length) return EmptySkeleton();

	const certificates = data.assets.certificates;

	return (
		<section
			id="certificates"
			className="relative flex flex-col justify-center gap-6 p-8">
			<h1 className="text-2xl font-semibold">Certificates</h1>
			<div className="flex gap-4 w-full h-full">
				{/* Slide lainnya */}
				{data.assets.certificates.map((certificate, index) => (
					<div
						key={index}
						className="hidden relative sm:block aspect-video w-full rounded-md overflow-hidden border">
						<Image
							src={certificate.url}
							alt={certificate.name || `Certificate ${index + 1}`}
							fill
							priority
							quality={100}
							placeholder="blur"
							blurDataURL={certificate.blurData}
							className="object-cover"
							unoptimized
						/>
					</div>
				))}

				{/* Slide aktif */}
				<motion.div className="relative sm:hidden aspect-video w-full rounded-md overflow-hidden border">
					<Image
						src={certificates[currentIndex].url}
						alt={
							certificates[currentIndex].name ||
							`Certificate ${currentIndex + 1}`
						}
						fill
						priority
						quality={100}
						placeholder="blur"
						blurDataURL={certificates[currentIndex].blurData}
						className="object-cover"
						unoptimized
					/>
				</motion.div>
			</div>
		</section>
	);
}

export default memo(Certificates);