import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Input,
	ModalFooter,
	Button,
} from "@chakra-ui/react";
import React from "react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const CreateProjectModal = ({ isOpen, onClose }: Props) => {
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<form>
						<ModalHeader>New Project</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Input placeholder='Project Title' />
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' mr={3} onClick={onClose}>
								Close
							</Button>
							<Button colorScheme='green'>Create Project</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreateProjectModal;
