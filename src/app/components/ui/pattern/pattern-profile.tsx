import type { ChildrenProps } from "@/types/props/children";
import React from "react";
import styled from "styled-components";

const Pattern = ({ children }: ChildrenProps) => {
	return (
		<StyledWrapper>
			<div className="molten-ember">
				<span className="orbit-overlay" />
				<svg className="texture-filter">
					<filter id="ember-texture">
						<feTurbulence
							result="noise"
							numOctaves={3}
							baseFrequency="0.06"
							type="fractalNoise"
						/>
						<feGaussianBlur
							result="blur"
							stdDeviation="2.5"
							in="noise"
						/>
						<feMorphology
							operator="dilate"
							radius={1}
							in="blur"
							result="morphed"
						/>
						<feSpecularLighting
							result="specular"
							lightingColor="#ff6600"
							specularExponent={20}
							specularConstant="1.1"
							surfaceScale={4}
							in="morphed">
							<feDistantLight elevation={40} azimuth={270} />
						</feSpecularLighting>
						<feComposite
							result="lit"
							operator="over"
							in2="SourceGraphic"
							in="specular"
						/>
						<feBlend mode="multiply" in2="lit" in="SourceGraphic" />
					</filter>
				</svg>
				{children}
			</div>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	.molten-ember {
		width: 100%;
		height: 100%;
		background: radial-gradient(
			ellipse at bottom,
			rgba(60, 20, 0, 0.4) 0%,
			rgb(30, 10, 0) 60%,
			rgba(0, 0, 0, 1) 100%
		);
		filter: url(#ember-texture);
		position: relative;
	}
`;

export default Pattern;
