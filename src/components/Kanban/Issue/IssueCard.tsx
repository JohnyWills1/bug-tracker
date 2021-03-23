import React from "react";
import { Avatar, AvatarGroup, Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import IssueModal from "./IssueModal";
import PriorityIcon from "../Priority/PriorityIcon";

interface Props {
	issue: {
		id: string;
		title: string;
		description?: string;
		priority: string;
		comments?: [
			{
				id: string;
				content: string;
				datePosted: any;
				userId: string;
				userName: string;
			}
		];
		type: string;
		assignees: [string];
		reporter: string;
		timeEstimate: number;
		dateCreated: string;
		dateUpdated: string;
	};
	index: any;
	columnId: any;
	columns: any;
	users: [string];
	changeColumn: (issueId: any, oldColumnId: any, newColumnId: any) => void;
}

const IssueCard = ({ issue, index, columnId, columns, users, changeColumn }: Props) => {
	// * ChakraUI
	// Modal hooks
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Draggable draggableId={issue.id} index={index}>
			{(provided, snapshot) => {
				return (
					<>
						<Box w='100%' h='100%' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
							<Box
								rounded='lg'
								w='100%'
								h='100%'
								minH='100px'
								mb={3}
								p='10px'
								onClick={() => {
									onOpen();
								}}
								userSelect='none'
								transform={snapshot.isDragging && !snapshot.isDropAnimating ? ` rotate(5deg)` : `none`}
								shadow={snapshot.isDragging ? `5px 10px 30px 0px rgba(9, 30, 66, 0.15)` : `md`}
								backgroundColor='white'
								_hover={{ backgroundColor: "#EBECF0", cursor: "pointer" }}>
								<Flex flexDirection='column' w='100%' h='80px' justify='space-between'>
									<Text>{issue.title}</Text>
									<Flex justify='space-between' align='center'>
										<PriorityIcon priority={issue.priority} />
										{issue.assignees && (
											<AvatarGroup size='xs' fontSize='calc(1.5rem / 2.5);' max={3}>
												{issue.assignees.map((user: any) => {
													return <Avatar key={user} name={user} />;
												})}
											</AvatarGroup>
										)}
									</Flex>
								</Flex>
							</Box>
						</Box>

						<IssueModal
							columns={columns}
							isOpen={isOpen}
							onClose={onClose}
							issue={issue}
							columnId={columnId}
							users={users}
							changeColumn={changeColumn}
						/>
					</>
				);
			}}
		</Draggable>
	);
};

export default IssueCard;
