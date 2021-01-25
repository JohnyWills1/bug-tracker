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
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";

interface Props {}

interface formData {
	emailRequired: string;
	passwordRequired: string;
}

const SignIn = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { register, handleSubmit, errors } = useForm();

	const { logIn } = useContext(AuthContext);

	const onSubmit = (data: formData) => {
		logIn(data.emailRequired, data.passwordRequired);
	};

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
								<Text>e-mail: </Text>
								<Input name='emailRequired' placeholder='e-mail' ref={register({ required: true })} />
								{errors.emailRequired && <span>This field is required</span>}

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
