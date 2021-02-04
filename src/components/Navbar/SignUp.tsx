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
	Stack,
	Text,
	useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Errors.css";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

interface SignInProps {
	passwordRequired: string;
	passwordConfRequired: string;
	usernameRequired: string;
	emailRequired: string;
}

const SignUp = ({ isOpen, onClose }: Props) => {
	// * ChakraUI
	// ChakraUI Toast
	const toast = useToast();

	// React Hook Forms
	const { register, handleSubmit, errors, setError, clearErrors } = useForm();
	// Auth Context
	const { signUp } = useAuth();
	// Hooks
	const [isSubmitting, setIsSubmitting] = useState(false);
	// React Router
	const history = useHistory();

	const onSubmit = async (data: SignInProps) => {
		setIsSubmitting(true);

		if (data.passwordRequired === data.passwordConfRequired) {
			try {
				await signUp(data.emailRequired, data.passwordRequired)
					.then((resp: any) => {
						setIsSubmitting(false);
						toast({
							position: "top-right",
							title: "Account Created",
							description: "Your account has been created successfully!",
							status: "success",
							duration: 5000,
							isClosable: true,
						});
					})
					.finally(() => {
						history.push("/projects");
					});
			} catch (error) {
				toast({
					position: "top-right",
					title: error.code.replace("/", " "),
					description: error.message,
					status: "error",
					duration: 5000,
					isClosable: true,
				});
				setIsSubmitting(false);
			}
		} else {
			setError("passwordConfRequired", {
				type: "manual",
				message: "Passwords do not match!",
			});
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalContent>
						<ModalHeader>Sign Up</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Stack>
								<Text>Username: </Text>
								<Input
									name='usernameRequired'
									placeholder='Username'
									ref={register({ required: { value: true, message: "This field is required" } })}
									onChange={() => clearErrors("usernameRequired")}
								/>
								{errors.usernameRequired && <span className='red-error'>{errors.usernameRequired.message}</span>}

								<Text>e-mail: </Text>
								<Input
									name='emailRequired'
									placeholder='Username'
									ref={register({ required: { value: true, message: "This field is required" } })}
									onChange={() => clearErrors("emailRequired")}
								/>
								{errors.emailRequired && <span className='red-error'>{errors.emailRequired.message}</span>}

								<Text>Password: </Text>
								<Input
									name='passwordRequired'
									placeholder='Password'
									type='password'
									ref={register({ required: { value: true, message: "This field is required" } })}
									onChange={() => clearErrors("passwordRequired")}
								/>
								{errors.passwordRequired && <span className='red-error'>{errors.passwordRequired.message}</span>}

								<Text>Confirm Password: </Text>
								<Input
									name='passwordConfRequired'
									placeholder='Confirm Password'
									type='password'
									ref={register({ required: { value: true, message: "This field is required" } })}
									onChange={() => clearErrors("passwordConfRequired")}
								/>
								{errors.passwordConfRequired && (
									<span className='red-error'>{errors.passwordConfRequired.message}</span>
								)}
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

export default SignUp;
