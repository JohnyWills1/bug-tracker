import { Flex, Heading, Text, Stack } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "./contexts/AuthContext";

interface Props {}

const Dashboard = (props: Props) => {
	// React Context
	const { user } = useAuth();

	return (
		<Flex align='center' px={5} py={6} flexDirection='column' h='90vh'>
			<Heading>Private Dashboard</Heading>
			<Stack>
				<Text>{user.displayName}</Text>
				<Text>{user.email}</Text>
			</Stack>
		</Flex>
	);
};

export default Dashboard;
