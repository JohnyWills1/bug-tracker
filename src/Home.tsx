import React from "react";
import { Flex } from "@chakra-ui/react";

interface Props {}

const Home = (props: Props) => {
	return (
		<>
			<Flex align='center' px={5} py={6} flexDirection='column' h='90vh'>
				This is the main App screen!
			</Flex>
		</>
	);
};

export default Home;
