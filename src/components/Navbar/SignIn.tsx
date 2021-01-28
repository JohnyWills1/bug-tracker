import {
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
	useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

interface formData {
	emailRequired: string;
	passwordRequired: string;
}

const SignIn = ({ isOpen, onClose }: Props) => {
	// * ChakraUI
	// Toast hook
	const toast = useToast();

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
				toast({
					position: "top-right",
					title: "Logged In",
					description: "Welcome back friend!",
					status: "success",
					duration: 1000,
					isClosable: true,
				});
			});
			onClose();
			history.push("/dashboard");
		} catch (error) {
			setIsSubmitting(false);
			toast({
				position: "top-right",
				title: error.code.replace("/", " "),
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<>
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
