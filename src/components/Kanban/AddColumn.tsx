import React, { useState } from "react";
import { Flex, Button, Stack, IconButton, Box, Input } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

interface Props {
	addColumn: (column: string) => void;
}

interface FormData {
	content: string;
}

const AddColumn = ({ addColumn }: Props) => {
	const [isEditing, setEditing] = useState(false);

	const { register, handleSubmit } = useForm();

	const onSubmit = ({ content }: FormData) => {
		setEditing(!isEditing);
		addColumn(content);
	};

	const handleUserKeyPress = (e: any) => {
		if (e.key === "Enter" && !e.shiftKey) {
			handleSubmit(onSubmit)();
		}
	};

	return (
		<Flex align='center' flexDirection='column'>
			{isEditing ? (
				<form onSubmit={handleSubmit(onSubmit)} style={{ width: "250px" }}>
					<Box rounded='md' bg='#F4F5F7' p={2}>
						<Input
							placeholder='Enter column title...'
							bgColor='white'
							border='none'
							name='content'
							onKeyPress={handleUserKeyPress}
							ref={register({ required: true })}
						/>
						<Stack align='center' mt={2} isInline>
							<Button size='sm' colorScheme='green' type='submit'>
								Add Column
							</Button>
							<IconButton
								size='sm'
								aria-label='close add Column textbox'
								icon={<CloseIcon />}
								onClick={() => {
									setEditing(!isEditing);
								}}
							/>
						</Stack>
					</Box>
				</form>
			) : (
				<Box
					rounded='lg'
					bg='#F4F5F7'
					w='250px'
					h='55px'
					_hover={{ bg: "#EBECF0", cursor: "pointer" }}
					onClick={() => setEditing(!isEditing)}
					p={2}>
					<Flex align='center' justify='center' w='100%' h='100%' flexDirection='column'>
						Add another column
					</Flex>
				</Box>
			)}
		</Flex>
	);
};

export default AddColumn;
