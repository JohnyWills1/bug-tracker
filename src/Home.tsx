import React from "react";
import { Flex } from "@chakra-ui/react";
import Board from "./components/Kanban/Board";
interface Props {}

const Home = (props: Props) => {
	return (
		<>
			<Flex align='center' px={5} py={6} flexDirection='column' minH='90vh' h='auto'>
				<Board />
			</Flex>
		</>
	);
};

export default Home;
