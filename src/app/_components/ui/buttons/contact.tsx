import { ChildrenProps } from "@/types/props/children";
import { Forward } from "lucide-react";
import styled from "styled-components";
import { useMenu } from "@/hooks/useMenu";
import { motion } from "motion/react";

const ContactButton = ({ children }: Readonly<ChildrenProps>) => {
	const { itemMotion } = useMenu();
	return (
		<StyledWrapper>
			<motion.li
				variants={itemMotion}
				whileTap="tap"
				transition={{ type: "spring", stiffness: 80, damping: 15 }}
				className="button">
				<Forward className="button__icon" />
				<span className="button__text">{children}</span>
			</motion.li>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	.button {
		line-height: 1;
		background-color: transparent;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.35em;
		padding: 0.75em 1em;
		padding-right: 1.25em;
		color: #fff;
		border: 1px solid transparent;
		font-weight: 700;
		border-radius: 2em;
		font-size: 1rem;
		transition: transform 0.3s;

		background: linear-gradient(
			90deg,
			rgba(77, 54, 208, 1) 0%,
			rgba(132, 116, 254, 1) 100%
		);
	}

	.button__icon {
		width: 1em;
		height: 1em;
	}
    
	.button:hover {
		border-color: #f4f5f2;
	}

	.button:active {
		transform: scale(0.98);
	}
`;

export default ContactButton;
