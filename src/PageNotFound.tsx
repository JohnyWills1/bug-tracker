import React from "react";
import { Flex, Heading } from "@chakra-ui/react";

interface Props {}

const PageNotFound = (props: Props) => {
	return (
		<Flex justify='center' align='center' minH='90vh' h='fit-content' flexDirection='column'>
			<Heading>404</Heading>
			<Heading>Page Not Found</Heading>
		</Flex>
	);
};

export default PageNotFound;
