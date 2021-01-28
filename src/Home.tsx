import React from "react";
import { Flex, Box, Text, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface Props {}

const Home = (props: Props) => {
	const MotionBox = motion.custom(Box);

	return (
		<>
			<Flex align='center' justify='center' px={5} py={6} flexDirection='column' h='90vh'>
				<Stack w='90%' h='90%' spacing='-10px' isInline>
					<MotionBox
						rounded='xl'
						shadow='md'
						w='20%'
						h='80%'
						bgGradient='linear(to-r, #f77f00,#fcbf49)'
						whileHover={{ scale: 1.05, y: -20 }}>
						<Flex justify='center' align='center' h='100%'>
							<Text w='fit-content'>This is the main App screen!</Text>
						</Flex>
					</MotionBox>
					<MotionBox
						rounded='xl'
						shadow='md'
						w='20%'
						h='80%'
						bgGradient='linear(to-r, #f77f00,#fcbf49)'
						whileHover={{ scale: 1.05, y: -20 }}>
						<Flex justify='center' align='center' h='100%'>
							<Text w='fit-content'>This is the main App screen!</Text>
						</Flex>
					</MotionBox>
					<MotionBox
						rounded='xl'
						shadow='md'
						w='20%'
						h='80%'
						bgGradient='linear(to-r, #f77f00,#fcbf49)'
						whileHover={{ scale: 1.05, y: -20 }}>
						<Flex justify='center' align='center' h='100%'>
							<Text w='fit-content'>This is the main App screen!</Text>
						</Flex>
					</MotionBox>
				</Stack>
			</Flex>
		</>
	);
};

export default Home;
