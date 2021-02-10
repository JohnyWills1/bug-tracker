import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "./contexts/AuthContext";
interface Props {}

const Home = (props: Props) => {
	const { user } = useAuth();

	return (
		<>
			<Flex align='center' px={5} py={6} flexDirection='column' minH='90vh' h='auto'>
				<Heading bgClip='text' bgGradient='linear(to-r, #660708,#ba181b,#e5383b)'>
					Home
				</Heading>
				{user && <Text>Welcome back {user.displayName ? user.displayName : "Friend"}</Text>}
			</Flex>
		</>
	);
};

export default Home;
