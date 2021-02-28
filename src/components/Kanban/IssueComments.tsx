import React from "react";
import { Text, Flex, Avatar, Stack, Link, Button, Textarea } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";

interface Props {
	comments?: [
		{
			content: string;
			datePosted: string;
			user: string;
			id: string;
		}
	];
}

const IssueComments = ({ comments }: Props) => {
	const [showCommentButtons, setShowCommentButtons] = React.useState(false);
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
						<Textarea minH='50px' placeholder='Add a comment...' onFocus={() => setShowCommentButtons(true)} />
						{showCommentButtons && (
							<Stack pt='10px' isInline>
								<Button size='sm' colorScheme='blue'>
									Save
								</Button>
								<Button size='sm' onClick={() => setShowCommentButtons(false)}>
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
							<Avatar size='sm' name={comment.user} />

							<Flex pl='25px' justify='flex-start' flexDirection='column' w='100%'>
								<Stack spacing={2} isInline>
									<Text p='0 12px 10px 0' fontWeight='600'>
										{comment.user}
									</Text>
									<Text>{comment.datePosted}</Text>
								</Stack>

								<Text w='100%' pb='10px'>
									{comment.content}
								</Text>

								<Stack w='fit-content' isInline>
									<Link opacity={0.6} textAlign='left' onClick={() => console.log("edit clicked")}>
										Edit
									</Link>
									<Link opacity={0.6} textAlign='left' onClick={() => console.log("delete clicked")}>
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
