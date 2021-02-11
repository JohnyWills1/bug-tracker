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

	const { register, handleSubmit, setValue } = useForm();

	const onSubmit = (data: FormData) => {
		addIssue(data.content, columnId);
		setValue("content", "");
	};

	const handleUserKeyPress = (e: any) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(onSubmit)();
			e.target.value = "";
			e.target.focus();
		}
	};

	return (
		<Flex align='center' flexDirection='column' w='100%' mx={2} mb={2} onBlur={(e) => console.log("blur")}>
			{isEditing ? (
				<form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
					<Textarea
						autoFocus={true}
						placeholder='Enter a title for this card'
						bgColor='white'
						border='none'
						name='content'
						onKeyPress={handleUserKeyPress}
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
				<Button onClick={() => setEditing(!isEditing)} bg='white' size='sm' leftIcon={<AddIcon />}>
					Add a card
				</Button>
			)}
		</Flex>
	);
};

export default AddCard;
