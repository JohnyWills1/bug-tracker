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
import { useForm } from "react-hook-form";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	createProject?: (title: string) => void;
}

interface FormData {
	title: string;
}

const CreateProjectModal = ({ isOpen, onClose, createProject }: Props) => {
	const { register, handleSubmit } = useForm();

	const onSubmit = ({ title }: FormData) => {
		if (createProject !== undefined) {
			createProject(title);
			onClose();
		}
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalHeader>New Project</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Input placeholder='Project Title' name='title' ref={register({ required: true })} />
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' mr={3} onClick={onClose}>
								Close
							</Button>
							<Button colorScheme='green' type='submit'>
								Create Project
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreateProjectModal;
