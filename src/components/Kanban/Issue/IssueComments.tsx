import React from "react";
import { Text, Flex, Avatar, Stack, Link, Button, Textarea } from "@chakra-ui/react";
import { useAuth } from "../../../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";

interface Props {
	comments?: [
		{
			content: string;
			datePosted: any;
			userName: string;
			userId: string;
			id: string;
		}
	];
	addComment: (comment: any, id: any) => void;
	deleteComment: (commentId: any, issueId: any) => void;
	editComment: (comment: any, issueId: any) => void;
	id: any;
}

const IssueComments = ({ comments, addComment, id, deleteComment, editComment }: Props) => {
	const [showCommentButtons, setShowCommentButtons] = React.useState(false);
	const [comment, setComment] = React.useState("");

	const handleComment = (comment: any) => {
		const newComment = {
			id: uuidv4(),
			content: comment,
			datePosted: Date.now(),
			userName: user.displayName,
			userId: user.uid,
		};

		addComment(newComment, id);
		setComment("");
	};

	// const handleCommentEdit = (comment: any) => {
	//     comment
	// }

	const handleCommentDelete = (commentId: any) => {
		deleteComment(commentId, id);
	};

	const getDate = (mSeconds: any) => {
		const date = new Date(mSeconds);
		return date.toDateString();
	};

	// Auth Context
	const { user } = useAuth();

	return (
		<>
			<Text fontWeight='700' pt='40px' fontSize='18px'>
				Comments
			</Text>
			<form style={{ marginTop: "15px" }}>
				<Flex>
					<Avatar size='sm' name={user.displayName ? user.displayName : user.email} mr='25px' />
					<Flex flexDirection='column' w='100%'>
						<Textarea
							minH='50px'
							value={comment}
							placeholder='Add a comment...'
							onChange={(e) => setComment(e.target.value)}
							onFocus={() => setShowCommentButtons(true)}
						/>
						{showCommentButtons && (
							<Stack pt='10px' isInline>
								<Button size='sm' colorScheme='blue' onClick={() => handleComment(comment)}>
									Save
								</Button>
								<Button
									size='sm'
									onClick={() => {
										setShowCommentButtons(false);
										setComment("");
									}}>
									Cancel
								</Button>
							</Stack>
						)}
					</Flex>
				</Flex>
			</form>
			{comments &&
				comments.map((comment: any) => {
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

								<Text w='100%' pb='10px'>
									{comment.content}
								</Text>

								<Stack w='fit-content' isInline>
									<Link opacity={0.6} textAlign='left' onClick={() => console.log(comment.id)}>
										Edit
									</Link>
									<Link opacity={0.6} textAlign='left' onClick={() => handleCommentDelete(comment.id)}>
										Delete
									</Link>
								</Stack>
							</Flex>
						</Flex>
					);
				})}
		</>
	);
};

export default IssueComments;
