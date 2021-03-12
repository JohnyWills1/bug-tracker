import React, { useState } from "react";
import { Box, Button, Flex, Heading, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "./contexts/AuthContext";

interface Props {}

interface formData {
	emailRequired: string;
}

const ForgotPassword = (props: Props) => {
	// React Form Hooks
	const { register, handleSubmit, errors } = useForm();

	// React Context
	const { forgotPassword, user } = useAuth();

	// Hooks
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Chakra Toast
	const toast = useToast();

	// Submit Reset Password Function, passed to the handle submit function
	const onSubmit = async (data: formData, e: any) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			await forgotPassword(data.emailRequired).then((resp: any) => {
				setIsSubmitting(false);
				toast({
					position: "top-right",
					title: "Password reset e-mail has been sent",
					description: "Check your inbox and sign in again when you are ready!",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
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
	};

	return (
		<Flex align='center' px={5} py={6} flexDirection='column' h='90vh'>
			<Box border='1px solid #EBEBEB' shadow='md' rounded='lg' p={5} m={5} w='400px' h='fit-content'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={4}>
						<Heading textAlign='center' bgClip='text' bgGradient='linear(to-r, #7209b7,#4cc9f0)'>
							Password Reset
						</Heading>
						<Text>Account e-mail: </Text>
						<Input
							name='emailRequired'
							placeholder='e-mail'
							defaultValue={user ? user.email : ""}
							ref={register({ required: true })}
						/>
						{errors.emailRequired && <span>This field is required</span>}

						<Button colorScheme='green' type='submit' isLoading={isSubmitting}>
							Reset Password
						</Button>
					</Stack>
				</form>
			</Box>
		</Flex>
	);
};

export default ForgotPassword;
