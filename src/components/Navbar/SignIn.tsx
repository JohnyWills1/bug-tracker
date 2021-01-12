import {
	useDisclosure,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Input,
	Text,
	Stack,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {}

interface formData {
	username: string;
	password: string;
}

const SignIn = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { register, handleSubmit, watch, errors } = useForm();
	const onSubmit = (data: formData) => alert(JSON.stringify(data));

	return (
		<>
			<Button onClick={onOpen}>Sign In</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalContent>
						<ModalHeader>Sign In</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Stack>
								<Text>Username: </Text>
								<Input name='usernameRequired' placeholder='Username' ref={register({ required: true })} />
								{errors.usernameRequired && <span>This field is required</span>}

								<Text>Password: </Text>
								<Input
									name='passwordRequired'
									placeholder='Password'
									type='password'
									ref={register({ required: true })}
								/>
								{errors.passwordRequired && <span>This field is required</span>}
							</Stack>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' mr={3} onClick={onClose}>
								Close
							</Button>
							<Button colorScheme='green' type='submit'>
								Submit
							</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	);
};

export default SignIn;
