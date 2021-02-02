import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
interface Props {}

const Home = (props: Props) => {
	return (
		<>
			<Flex align='center' px={5} py={6} flexDirection='column' minH='90vh' h='auto'>
				<Heading bgClip='text' bgGradient='linear(to-r, #660708,#ba181b,#e5383b)'>
					Home
				</Heading>
			</Flex>
		</>
	);
};

export default Home;
