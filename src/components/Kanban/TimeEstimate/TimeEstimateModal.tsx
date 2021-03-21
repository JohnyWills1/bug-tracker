import { TimeIcon } from "@chakra-ui/icons";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	Flex,
	Progress,
	Text,
	FormControl,
	FormLabel,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	time: any;
	estTime: any;
	changeEstTime: (newTime: any) => void;
	changeTime: (newTime: any) => void;
}

const TimeEstimateModal = ({ isOpen, onClose, time, estTime, changeTime, changeEstTime }: Props) => {
	const handleDone = () => {
		onClose();
	};

	const handleTimeSpent = (e: any) => {
		changeTime(e);
	};

	const handleEstTime = (e: any) => {
		changeEstTime(e);
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Time Tracking</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
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
						<Flex justify='center' align='center' w='100%' p='20px 5px'>
							<Flex>
								<FormControl id='timeSpent'>
									<FormLabel>Time Spent (hours)</FormLabel>
									<NumberInput defaultValue={time} w='90%' onChange={(e: any) => handleTimeSpent(e)}>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</FormControl>
							</Flex>
							<Flex>
								<FormControl id='timeRemaining'>
									<FormLabel>Time Remaining (hours)</FormLabel>
									<NumberInput defaultValue={estTime} w='90%' onChange={(e: any) => handleEstTime(e)}>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</FormControl>
							</Flex>
						</Flex>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={handleDone}>
							Done
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default TimeEstimateModal;
