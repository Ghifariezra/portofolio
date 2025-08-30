"use client";
import type { ChildrenProps } from "@/types/props/children";
import styled from "styled-components";

const Pattern = ({ children }: Readonly<ChildrenProps>) => {
	return <StyledWrapper>{children}</StyledWrapper>;
};

const StyledWrapper = styled.section`
	position: relative;
	width: 100%;
	min-height: 100vh;
	background-color: #111111;
	background-image: linear-gradient(
		32deg,
		rgba(8, 8, 8, 0.74) 30px,
		transparent
	);
	background-size: 60px 60px;
	background-position: -5px -5px;
	display: flex;
	flex-direction: column;
`;

export default Pattern;
