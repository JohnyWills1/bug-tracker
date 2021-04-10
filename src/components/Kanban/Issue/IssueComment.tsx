import { Flex, Avatar, Stack, Link, Text, Input, Button } from "@chakra-ui/react";
import React from "react";

interface Props {
	comment: any;
	getDate: (mSeconds: any) => string;
	handleCommentEdit: (comment: any) => void;
	handleCommentDelete: (comment: any) => void;
}

const IssueComment = ({ comment, getDate, handleCommentDelete, handleCommentEdit }: Props) => {
	const [editingComment, setEditingComment] = React.useState(false);

	const localCommentEdit = () => {
		setEditingComment(true);
		handleCommentEdit(comment);
	};

	return (
		<Flex mt='25px' key={comment.id}>
			<Avatar size='sm' name={comment.userName} />

			<Flex pl='25px' justify='flex-start' flexDirection='column' w='100%'>
				<Stack spacing={2} isInline>
					<Text p='0 12px 10px 0' fontWeight='600'>
						{comment.userName}
					</Text>
					<Text>{getDate(comment.datePosted)}</Text>
				</Stack>

				{editingComment ? (
					<>
						<Input placeholder={comment.content} />
						<Stack pt='10px' isInline>
							<Button size='sm' colorScheme='blue' onClick={() => console.log("save edit")}>
								Save
							</Button>
							<Button
								size='sm'
								onClick={() => {
									setEditingComment(false);
									console.log("cancelled edit");
								}}>
								Cancel
							</Button>
						</Stack>
					</>
				) : (
					<Text w='100%' pb='10px'>
						{comment.content}
					</Text>
				)}

				{!editingComment && (
					<Stack w='fit-content' isInline>
						<Link opacity={0.6} textAlign='left' onClick={() => localCommentEdit()}>
							Edit
						</Link>
						<Link opacity={0.6} textAlign='left' onClick={() => handleCommentDelete(comment.id)}>
							Delete
						</Link>
					</Stack>
				)}
			</Flex>
		</Flex>
	);
};

export default IssueComment;
