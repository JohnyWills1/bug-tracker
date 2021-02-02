import React, { useState } from "react";
import { Flex, Button, Textarea, Stack, IconButton } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

interface Props {
	addIssue: (issue: any, columnId: any) => void;
	columnId: string;
}

interface FormData {
	content?: string;
}

const AddCard = ({ addIssue, columnId }: Props) => {
	const [isEditing, setEditing] = useState(false);

	const { register, handleSubmit } = useForm();

	const onSubmit = (data: FormData) => {
		setEditing(!isEditing);
		addIssue(data.content, columnId);
	};

	return (
		<Flex align='center' flexDirection='column' w='100%' px={2} pb={2}>
			{isEditing ? (
				<form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
					<Textarea
						placeholder='Enter a title for this card'
						bgColor='white'
						border='none'
						name='content'
						ref={register({ required: true })}
					/>
					<Stack align='center' mt={2} isInline>
						<Button size='sm' colorScheme='green' type='submit'>
							Add Card
						</Button>
						<IconButton
							size='sm'
							aria-label='close add card textbox'
							icon={<CloseIcon />}
							onClick={() => {
								setEditing(!isEditing);
							}}
						/>
					</Stack>
				</form>
			) : (
				<Button
					variant='outline'
					onClick={() => setEditing(!isEditing)}
					colorScheme='gray'
					size='sm'
					leftIcon={<AddIcon />}>
					Add a card
				</Button>
			)}
		</Flex>
	);
};

export default AddCard;
