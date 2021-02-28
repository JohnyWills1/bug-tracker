import { Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface Props {
	children?: React.ReactNode;
}

const Loading = ({ children }: Props) => {
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(false);
	}, []);

	return (
		<>
			{isLoading ? (
				<Flex justify='center' align='center' h='90vh'>
					<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
				</Flex>
			) : (
				<>{children}</>
			)}
		</>
	);
};

export default Loading;
