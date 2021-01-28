import React, { useState } from "react";
import { Box, Button, Flex, Heading, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "./contexts/AuthContext";
import { useHistory } from "react-router-dom";

interface Props {}

interface formData {
	email: string;
	password: string;
	passwordConfRequired: string;
}

const UpdateProfile = (props: Props) => {
	// React Form Hooks
	const { register, handleSubmit, errors, setError } = useForm();

	// React Context
	const { updatePassword, updateEmail, user } = useAuth();

	// Hooks
	const [isSubmitting, setIsSubmitting] = useState(false);

	// React Router
	const history = useHistory();

	// ChakraUI Toast
	const toast = useToast();

	// Submit Reset Password Function, passed to the handle submit function
	const onSubmit = async (data: formData, e: any) => {
		e.preventDefault();

		if (data.password !== data.passwordConfRequired) {
			return setError("passwordConfRequired", {
				type: "manual",
				message: "Passwords do not match!",
			});
		}

		setIsSubmitting(true);

		const promises = [];

		if (data.email !== user.currentEmail) {
			promises.push(updateEmail(data.email));
		}

		if (data.password === data.passwordConfRequired && data.password.length >= 6) {
			promises.push(updatePassword(data.password));
		}

		Promise.all(promises)
			.then(() => {
				history.push("/");
				toast({
					position: "top-right",
					title: "Account Details Updated",
					description: "Your account details have been successfully updated!",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			})
			.catch((err) => {
				toast({
					position: "top-right",
					title: err.code.replace("/", " "),
					description: err.message,
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	};

	return (
		<Flex align='center' px={5} py={6} flexDirection='column' h='90vh'>
			<Box border='1px solid #EBEBEB' shadow='md' rounded='lg' p={5} m={5} w='400px' h='fit-content'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={4}>
						<Heading textAlign='center' bgClip='text' bgGradient='linear(to-r, #05668d,#00a896,#02c39a)'>
							Update Profile
						</Heading>

						<Text>e-mail: </Text>
						<Input
							name='email'
							placeholder='e-mail'
							defaultValue={user ? user.email : ""}
							ref={register({ required: false })}
						/>

						<Text>Password: </Text>
						<Input
							name='password'
							type='password'
							placeholder='Password - Leave empty to keep the same'
							ref={register({ required: false })}
						/>

						<Text>Confirm Password: </Text>
						<Input
							name='passwordConfRequired'
							placeholder='Confirm Password'
							type='password'
							ref={register({ required: false })}
						/>
						{errors.passwordConfRequired && <span className='red-error'>{errors.passwordConfRequired.messages}</span>}

						<Button colorScheme='green' type='submit' isLoading={isSubmitting}>
							Update
						</Button>
					</Stack>
				</form>
			</Box>
		</Flex>
	);
};

export default UpdateProfile;
