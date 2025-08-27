"use client";
import type { ChildrenProps } from "@/types/props/children";
import styled from "styled-components";

const Pattern = ({ children }: Readonly<ChildrenProps>) => {
	return (
		<StyledWrapper>
			<div className="container dark:mask-radial-from-0%">{children}</div>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	.container {
		width: 100%;
		height: 100%;
		background-color: #111111;
		background-image: linear-gradient(
			32deg,
			rgba(8, 8, 8, 0.74) 30px,
			transparent
		);
		background-size: 60px 60px;
		background-position: -5px -5px;
	}
`;

export default Pattern;
