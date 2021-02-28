import styled from "styled-components";

export const NavLeft = styled.aside`
	z-index: 100;
	position: fixed;
	top: 0;
	left: 0;
	overflow-x: hidden;
	height: 100vh;
	width: 55px;
	background: rgb(7, 71, 166);
	transition: all 0.1s;
	&:hover {
		width: 200px;
		box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.6);
	}
	color: #deebff;
`;

export const Icon = styled.div`
	visibility: visible;
	${NavLeft}:hover & {
		opacity: 0;
		visibility: hidden;
	}
	color: white;
`;

export const ItemText = styled.div`
	visibility: hidden;
	opacity: 0;
	text-transform: uppercase;
	transition: all 0.05s;
	transition-property: visibility, opacity;
	${NavLeft}:hover & {
		visibility: visible;
		opacity: 1;
	}
	padding: 10px;
	&:hover {
		background: rgba(255, 255, 255, 0.1);
	}
`;
