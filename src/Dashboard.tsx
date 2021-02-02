import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import ProjectsList from "./components/Projects/ProjectsList";

interface Props {}

const Dashboard = (props: Props) => {
	return (
		<Flex align='center' px={5} py={6} flexDirection='column' minH='90vh' h='auto'>
			<Heading bgClip='text' textAlign='center' w='50%' bgGradient='linear(to-r, #660708,#ba181b,#e5383b)' mb={6}>
				Dashboard
			</Heading>

			<ProjectsList />
		</Flex>
	);
};

export default Dashboard;
