import { TimeIcon } from "@chakra-ui/icons";
import { Box, Flex, NumberInput, NumberInputField, Progress, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import TimeEstimateModal from "./TimeEstimateModal";

interface Props {
	time: any;
	changeTime: (newTime: any, issueId: any) => void;
	id: any;
}

const TimeEstimate = ({ time, changeTime, id }: Props) => {
	const [estTime, setEstTime] = React.useState(time * 2);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleEstChange = (e: any) => {
		setEstTime(e);
	};

	const handleChangeTime = (newTime: any) => {
		changeTime(newTime, id);
	};

	return (
		<>
			<Text textTransform='uppercase' opacity={0.7} fontWeight='700' mt='24px' mb='5px'>
				Time Estimate (Hours)
			</Text>
			<NumberInput defaultValue={estTime} onChange={handleEstChange}>
				<NumberInputField />
			</NumberInput>

			<Text textTransform='uppercase' opacity={0.7} fontWeight='700' mt='24px' mb='5px'>
				Time Tracking
			</Text>
			<Box
				_hover={{ backgroundColor: "#E2E8F0", cursor: "pointer" }}
				onClick={onOpen}
				borderRadius='4px'
				bg='white'
				p='6px 10px'>
				<Flex w='100%' align='center'>
					<TimeIcon color='#5F6C84' w={5} h={5} mr='15px' />
					<Flex flexDirection='column' w='100%'>
						<Progress w='100%' value={time} max={estTime} borderRadius='4px' />
						<Flex w='100%' justify='space-between'>
							<Text mt='5px' fontSize='14.5px'>
								{time}h logged
							</Text>
							<Text mt='5px' fontSize='14.5px'>
								{estTime}h estimated
							</Text>
						</Flex>
					</Flex>
				</Flex>
			</Box>

			<TimeEstimateModal
				isOpen={isOpen}
				onClose={onClose}
				time={time}
				estTime={estTime}
				changeEstTime={setEstTime}
				changeTime={handleChangeTime}
			/>
		</>
	);
};

export default TimeEstimate;
