import React from "react";
import { Text, Flex, Avatar, Stack, Link, Button, Textarea } from "@chakra-ui/react";
import { useAuth } from "../../../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import IssueComment from "./IssueComment";

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
	const [editingComment, setEditComment] = React.useState(false);

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

	const handleCommentEdit = (comment: any) => {
		console.log("Edit this comment", comment);
		setEditComment(true);
	};

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
						<IssueComment
							key={comment.id}
							comment={comment}
							getDate={getDate}
							handleCommentDelete={handleCommentDelete}
							handleCommentEdit={handleCommentEdit}
						/>
					);
				})}
		</>
	);
};

export default IssueComments;
