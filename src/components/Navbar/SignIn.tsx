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
	Link,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

interface Props {}

interface formData {
	emailRequired: string;
	passwordRequired: string;
}

const SignIn = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { register, handleSubmit, errors } = useForm();

	const { logIn } = useAuth();

	// React Router
	const history = useHistory();

	// Hooks
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = async (data: formData, e: any) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			await logIn(data.emailRequired, data.passwordRequired).then((resp: any) => {
				setIsSubmitting(false);
			});
			history.push("/dashboard");
		} catch (error) {
			console.log(error);
			setIsSubmitting(false);
		}
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
								<Input
									name='emailRequired'
									placeholder='e-mail'
									defaultValue='test@gmail.com'
									ref={register({ required: true })}
								/>
								{errors.emailRequired && <span>This field is required</span>}

								<Text>Password: </Text>
								<Input
									name='passwordRequired'
									placeholder='Password'
									type='password'
									defaultValue='test123'
									ref={register({ required: true })}
								/>
								{errors.passwordRequired && <span>This field is required</span>}

								<Link
									onClick={(e) => {
										history.push("/forgot-password");
										onClose();
									}}>
									Forgot Your Password?
								</Link>
							</Stack>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' mr={3} onClick={onClose}>
								Close
							</Button>
							<Button colorScheme='green' type='submit' isLoading={isSubmitting}>
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
