import { Flex, Heading, Text, Stack } from "@chakra-ui/react";
import React from "react";
import Board from "./components/Kanban/Board";
import { useAuth } from "./contexts/AuthContext";

interface Props {}

const Dashboard = (props: Props) => {
	// React Context
	const { user } = useAuth();

	return (
		<Flex align='center' px={5} py={6} flexDirection='column' minH='90vh' h='auto'>
			<Heading bgClip='text' bgGradient='linear(to-r, #660708,#ba181b,#e5383b)'>
				Private Dashboard
			</Heading>
			<Stack mb={5}>
				<Text>{user.displayName}</Text>
				<Text>{user.email}</Text>
			</Stack>
			<Board />
		</Flex>
	);
};

export default Dashboard;
